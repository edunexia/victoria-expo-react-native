import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  Dimensions,
  StatusBar,
  Platform,
  TextInput
} from 'react-native';
import { QuizAnswer, QuizResults } from '../types/quiz';
import { QuestionBlock } from '../types/question';
import QuestionItem from '../components/QuestionItem';

const { width } = Dimensions.get('window');

const isSmallScreen = width < 375;
const isMediumScreen = width >= 375 && width < 414;

interface Props {
  questionBlock: QuestionBlock;
  onSubmit: (results: QuizResults) => void;
  isSubmitting?: boolean;
}

interface UserInfo {
  name: string;
  email: string;
}

const Quiz: React.FC<Props> = ({ questionBlock, onSubmit, isSubmitting = false }) => {
  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', email: '' });

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    const unansweredQuestions = questionBlock.questions.filter(
      question => answers[question.id] === undefined
    );

    if (unansweredQuestions.length > 0) {
      Alert.alert(
        'Quiz Incomplete',
        'Please answer all questions before submitting.',
        [{ text: 'OK', style: 'default' }],
        { cancelable: false }
      );
      return;
    }

    if (!userInfo.name.trim() || !userInfo.email.trim()) {
      Alert.alert(
        'Information Required',
        'Please enter both your name and email address.',
        [{ text: 'OK', style: 'default' }],
        { cancelable: false }
      );
      return;
    }

    const quizAnswers: QuizAnswer[] = Object.entries(answers).map(([questionId, value]) => ({
      questionId: parseInt(questionId),
      value
    }));

    const results: QuizResults & { userInfo: UserInfo } = {
      blockId: questionBlock.id,
      answers: quizAnswers,
      completedAt: new Date().toISOString(),
      userInfo: {
        name: userInfo.name.trim(),
        email: userInfo.email.trim()
      }
    };

    onSubmit(results);
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questionBlock.questions.length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;
  const isComplete = answeredCount === totalQuestions;
  const canSubmit = isComplete && !isSubmitting;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{questionBlock.title}</Text>
          <Text style={styles.description}>{questionBlock.description}</Text>
          
          <View style={styles.progressSection}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>
                {answeredCount} of {totalQuestions} questions completed
              </Text>
              <Text style={styles.progressPercentage}>
                {Math.round(progressPercentage)}%
              </Text>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressPercentage}%` }
                ]} 
              />
            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.questionsContainer}>
          {questionBlock.questions.map((question, index) => (
            <View key={question.id} style={styles.questionWrapper}>
              <View style={styles.questionHeader}>
                <View style={styles.questionNumber}>
                  <Text style={styles.questionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.questionCount}>
                  Question {index + 1} of {totalQuestions}
                </Text>
              </View>
              
              <QuestionItem
                question={question}
                selectedValue={answers[question.id] ?? null}
                onValueChange={handleAnswerChange}
                disabled={isSubmitting}
              />
            </View>
          ))}

          <View style={styles.userInfoSection}>
            <Text style={styles.userInfoTitle}>Please enter your information to see your results</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.textInput}
                value={userInfo.name}
                onChangeText={(text) => setUserInfo(prev => ({ ...prev, name: text }))}
                placeholder="Enter your name"
                placeholderTextColor="#a0aec0"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={userInfo.email}
                onChangeText={(text) => setUserInfo(prev => ({ ...prev, email: text }))}
                placeholder="Enter your email address"
                placeholderTextColor="#a0aec0"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={styles.emailDisclaimer}>
                By providing your email address, you'll be signed up to receive periodic emails and financial education from our platform, which you can unsubscribe from at any time.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.submitSection}>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              canSubmit && userInfo.name.trim() && userInfo.email.trim() ? styles.submitButtonEnabled : styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!canSubmit || !userInfo.name.trim() || !userInfo.email.trim()}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <View style={styles.submitButtonContent}>
                <ActivityIndicator size="small" color="#ffffff" />
                <Text style={styles.submitButtonTextEnabled}>
                  Submitting...
                </Text>
              </View>
            ) : (
              <Text style={[
                styles.submitButtonText,
                canSubmit && userInfo.name.trim() && userInfo.email.trim() ? styles.submitButtonTextEnabled : styles.submitButtonTextDisabled
              ]}>
                Submit Quiz
              </Text>
            )}
          </TouchableOpacity>
          
          {(!isComplete || !userInfo.name.trim() || !userInfo.email.trim()) && (
            <Text style={styles.submitHint}>
              {!isComplete ? "Answer all questions and enter your information to enable submission" : "Please enter your name and email to submit"}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  
  headerContainer: {
    backgroundColor: '#1a365d',
    paddingTop: Platform.OS === 'ios' ? 50 : 75,
    paddingBottom: isSmallScreen ? 20 : 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerContent: {
    paddingHorizontal: isSmallScreen ? 16 : 24,
  },
  title: {
    fontSize: isSmallScreen ? 20 : isMediumScreen ? 24 : 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: isSmallScreen ? 24 : isMediumScreen ? 28 : 32,
  },
  description: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#cbd5e0',
    textAlign: 'center',
    lineHeight: isSmallScreen ? 20 : 24,
    marginBottom: isSmallScreen ? 16 : 20,
    paddingHorizontal: isSmallScreen ? 0 : 16,
  },
  
  progressSection: {
    marginTop: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#e2e8f0',
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#4fd1c7',
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#2d3748',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4fd1c7',
    borderRadius: 3,
  },
  
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  
  questionsContainer: {
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingTop: isSmallScreen ? 16 : 20,
  },
  questionWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: isSmallScreen ? 16 : 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingTop: isSmallScreen ? 16 : 20,
    paddingBottom: 8,
  },
  questionNumber: {
    width: isSmallScreen ? 24 : 28,
    height: isSmallScreen ? 24 : 28,
    borderRadius: isSmallScreen ? 12 : 14,
    backgroundColor: '#e6fffa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  questionNumberText: {
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '700',
    color: '#319795',
  },
  questionCount: {
    fontSize: isSmallScreen ? 11 : 12,
    color: '#718096',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  submitSection: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  submitContainer: {
    paddingHorizontal: isSmallScreen ? 16 : 24,
    paddingVertical: isSmallScreen ? 16 : 20,
    paddingBottom: Platform.OS === 'ios' ? (isSmallScreen ? 24 : 28) : (isSmallScreen ? 16 : 20),
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: isSmallScreen ? 14 : 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: isSmallScreen ? 48 : 52,
  },
  submitButtonEnabled: {
    backgroundColor: '#3182ce',
    ...Platform.select({
      ios: {
        shadowColor: '#3182ce',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  submitButtonDisabled: {
    backgroundColor: '#e2e8f0',
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  submitButtonText: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  submitButtonTextEnabled: {
    color: '#ffffff',
  },
  submitButtonTextDisabled: {
    color: '#a0aec0',
  },
  submitHint: {
    fontSize: isSmallScreen ? 12 : 13,
    color: '#718096',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },

  userInfoSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: isSmallScreen ? 16 : 20,
    marginTop: isSmallScreen ? 20 : 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  userInfoTitle: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#2d3748',
    minHeight: 44,
  },
  emailDisclaimer: {
    fontSize: 11,
    color: '#718096',
    marginTop: 6,
    lineHeight: 14,
  },
});

export default Quiz;
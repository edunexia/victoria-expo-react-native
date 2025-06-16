import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { QuestionBlock } from '../types/question';
import { QuizResults as QuizResultsType } from '../types/quiz';

const { width } = Dimensions.get('window');

const isSmallScreen = width < 375;
const isMediumScreen = width >= 375 && width < 414;

interface Props {
  results: QuizResultsType & { userInfo?: { name: string; email: string } };
  questionBlock: QuestionBlock;
  onRestart: () => void;
}

const QuizResults: React.FC<Props> = ({ results, questionBlock, onRestart }) => {
  const [showJsonDetails, setShowJsonDetails] = useState(false);

  const getQuestionText = (questionId: number) => {
    return questionBlock.questions.find(q => q.id === questionId)?.text || '';
  };

  const getAnswerLabel = (value: number) => {
    const labels = {
      0: 'Not at all like me',
      1: 'A little like me',
      2: 'A lot like me',
      3: 'Exactly like me'
    };
    return labels[value as keyof typeof labels];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.successIcon}>
            <Text style={styles.successEmoji}>🎉</Text>
          </View>
          <Text style={styles.title}>Quiz Completed!</Text>
          <Text style={styles.subtitle}>Thank you for your responses</Text>
          <Text style={styles.completedAt}>
            {formatDate(results.completedAt)}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {results.userInfo && (
          <View style={styles.userInfoContainer}>
            <Text style={styles.sectionTitle}>Participant Information</Text>
            <View style={styles.userInfoCard}>
              <View style={styles.userInfoRow}>
                <Text style={styles.userInfoLabel}>Name:</Text>
                <Text style={styles.userInfoValue}>{results.userInfo.name}</Text>
              </View>
              <View style={styles.userInfoRow}>
                <Text style={styles.userInfoLabel}>Email:</Text>
                <Text style={styles.userInfoValue}>{results.userInfo.email}</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.resultsContainer}>
          <Text style={styles.sectionTitle}>Your Responses</Text>

          {results.answers.map((answer, index) => (
            <View key={answer.questionId} style={styles.answerCard}>
              <View style={styles.answerHeader}>
                <View style={styles.questionBadge}>
                  <Text style={styles.questionBadgeText}>Q{index + 1}</Text>
                </View>
                <View style={styles.answerScore}>
                  <View style={[
                    styles.scoreCircle,
                    {
                      backgroundColor: "#1a365d"
                    }
                  ]}>
                    <Text style={styles.scoreText}>{answer.value}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.questionText}>
                {getQuestionText(answer.questionId)}
              </Text>

              <View style={styles.answerDetails}>
                <View style={[
                  styles.answerBar,
                  {
                    backgroundColor: "#e5e7eb"
                  }
                ]}>
                  <View style={[
                    {
                      width: `${(answer.value / 3) * 100}%`,
                      backgroundColor: "#e5e7eb"
                    }
                  ]} />
                </View>
                <Text style={[
                  styles.answerLabel,
                  {
                    color: "#6b7280"
                  }
                ]}>
                  {answer.value} - {getAnswerLabel(answer.value)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.apiSection}>
          <TouchableOpacity
            style={styles.apiHeader}
            onPress={() => setShowJsonDetails(!showJsonDetails)}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionTitle}>Developer Data</Text>
            <View style={styles.expandButton}>
              <Text style={styles.expandButtonText}>
                {showJsonDetails ? '−' : '+'}
              </Text>
            </View>
          </TouchableOpacity>

          {showJsonDetails && (
            <View style={styles.jsonContainer}>
              <Text style={styles.jsonLabel}>Results JSON:</Text>
              <ScrollView
                style={styles.jsonScrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={styles.jsonText}>
                  {JSON.stringify(results, null, 2)}
                </Text>
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.actionSection}>
        <TouchableOpacity
          style={styles.restartButton}
          onPress={onRestart}
          activeOpacity={0.8}
        >
          <Text style={styles.restartButtonText}>Take Quiz Again</Text>
        </TouchableOpacity>
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
    backgroundColor: '#319795',
    paddingTop: Platform.OS === 'ios' ? 50 : 75,
    paddingBottom: isSmallScreen ? 24 : 28,
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
    alignItems: 'center',
    paddingHorizontal: isSmallScreen ? 20 : 28,
  },
  successIcon: {
    width: isSmallScreen ? 60 : 70,
    height: isSmallScreen ? 60 : 70,
    borderRadius: isSmallScreen ? 30 : 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successEmoji: {
    fontSize: isSmallScreen ? 24 : 28,
  },
  title: {
    fontSize: isSmallScreen ? 22 : isMediumScreen ? 26 : 30,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#dcfce7',
    marginBottom: 12,
    textAlign: 'center',
  },
  completedAt: {
    fontSize: isSmallScreen ? 12 : 13,
    color: '#bbf7d0',
    fontWeight: '500',
  },

  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // User Information Styles
  userInfoContainer: {
    paddingTop: 20,
    paddingHorizontal: isSmallScreen ? 16 : 20,
  },
  userInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: isSmallScreen ? 16 : 20,
    marginBottom: isSmallScreen ? 12 : 16,
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
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  userInfoLabel: {
    fontSize: isSmallScreen ? 14 : 15,
    fontWeight: '600',
    color: '#64748b',
  },
  userInfoValue: {
    fontSize: isSmallScreen ? 14 : 15,
    color: '#1e293b',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },

  statsContainer: {
    margin: isSmallScreen ? 16 : 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: isSmallScreen ? 16 : 20,
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: isSmallScreen ? 20 : 24,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: isSmallScreen ? 11 : 12,
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  resultsContainer: {
    paddingTop: 20,
    paddingHorizontal: isSmallScreen ? 16 : 20,
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  answerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: isSmallScreen ? 16 : 20,
    marginBottom: isSmallScreen ? 12 : 16,
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
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  questionBadgeText: {
    fontSize: isSmallScreen ? 11 : 12,
    fontWeight: '600',
    color: '#64748b',
  },
  answerScore: {
    alignItems: 'center',
  },
  scoreCircle: {
    width: isSmallScreen ? 32 : 36,
    height: isSmallScreen ? 32 : 36,
    borderRadius: isSmallScreen ? 16 : 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  questionText: {
    fontSize: isSmallScreen ? 15 : 16,
    color: '#334155',
    lineHeight: isSmallScreen ? 20 : 22,
    marginBottom: 12,
    fontWeight: '500',
  },
  answerDetails: {
    marginTop: 8,
  },
  answerBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  answerBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  answerLabel: {
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '600',
  },

  apiSection: {
    margin: isSmallScreen ? 16 : 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
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
  apiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isSmallScreen ? 16 : 20,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  expandButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  jsonContainer: {
    padding: isSmallScreen ? 16 : 20,
  },
  jsonLabel: {
    fontSize: isSmallScreen ? 12 : 13,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  jsonScrollView: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  jsonText: {
    fontSize: isSmallScreen ? 10 : 11,
    color: '#475569',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    lineHeight: isSmallScreen ? 14 : 16,
    padding: 12,
  },

  actionSection: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingHorizontal: isSmallScreen ? 16 : 24,
    paddingVertical: isSmallScreen ? 16 : 20,
    paddingBottom: Platform.OS === 'ios' ? (isSmallScreen ? 24 : 28) : (isSmallScreen ? 16 : 20),
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
  restartButton: {
    backgroundColor: '#3182ce',
    borderRadius: 12,
    paddingVertical: isSmallScreen ? 14 : 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: isSmallScreen ? 48 : 52,
    ...Platform.select({
      ios: {
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  restartButtonText: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
});

export default QuizResults;
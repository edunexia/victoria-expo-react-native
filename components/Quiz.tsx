import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { QuestionBlock, QuizAnswer, QuizResults } from '../types';
import QuestionItem from './QuestionItem';

interface Props {
  questionBlock: QuestionBlock;
  onSubmit: (results: QuizResults) => void;
  isSubmitting?: boolean;
}

const Quiz: React.FC<Props> = ({ questionBlock, onSubmit, isSubmitting = false }) => {
  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});

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
        'Incomplete Quiz',
        'Please answer all questions before submitting.',
        [{ text: 'OK' }]
      );
      return;
    }

    const quizAnswers: QuizAnswer[] = Object.entries(answers).map(([questionId, value]) => ({
      questionId: parseInt(questionId),
      value
    }));

    const results: QuizResults = {
      blockId: questionBlock.id,
      answers: quizAnswers,
      completedAt: new Date().toISOString()
    };

    onSubmit(results);
  };

  const isComplete = questionBlock.questions.every(question => 
    answers[question.id] !== undefined
  );

  const canSubmit = isComplete && !isSubmitting;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>{questionBlock.title}</Text>
        <Text style={styles.description}>{questionBlock.description}</Text>
      </View>

      <View style={styles.questionsContainer}>
        {questionBlock.questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            selectedValue={answers[question.id] ?? null}
            onValueChange={handleAnswerChange}
            disabled={isSubmitting}
          />
        ))}
      </View>

      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            canSubmit ? styles.submitButtonEnabled : styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          {isSubmitting ? (
            <View style={styles.submitButtonContent}>
              <ActivityIndicator size="small" color="#ffffff" />
              <Text style={[styles.submitButtonText, styles.submitButtonTextEnabled]}>
                Submitting...
              </Text>
            </View>
          ) : (
            <Text style={[
              styles.submitButtonText,
              canSubmit ? styles.submitButtonTextEnabled : styles.submitButtonTextDisabled
            ]}>
              Submit Quiz
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 24,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
    textAlign: 'center',
  },
  questionsContainer: {
    padding: 20,
  },
  submitContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonEnabled: {
    backgroundColor: '#0d6efd',
  },
  submitButtonDisabled: {
    backgroundColor: '#e9ecef',
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  submitButtonTextEnabled: {
    color: '#ffffff',
  },
  submitButtonTextDisabled: {
    color: '#6c757d',
  },
});

export default Quiz; 
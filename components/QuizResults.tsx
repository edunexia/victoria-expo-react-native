import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { QuizResults as QuizResultsType, QuestionBlock } from '../types';

interface Props {
  results: QuizResultsType;
  questionBlock: QuestionBlock;
  onRestart: () => void;
}

const QuizResults: React.FC<Props> = ({ results, questionBlock, onRestart }) => {
  const getAnswerLabel = (value: number) => {
    const labels = {
      0: 'Not at all like me',
      1: 'A little like me',
      2: 'A lot like me',
      3: 'Exactly like me'
    };
    return labels[value as keyof typeof labels];
  };

  const getQuestionText = (questionId: number) => {
    return questionBlock.questions.find(q => q.id === questionId)?.text || '';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Quiz Completed! 🎉</Text>
        <Text style={styles.subtitle}>Thank you for completing the quiz</Text>
        <Text style={styles.completedAt}>
          Completed on: {new Date(results.completedAt).toLocaleString()}
        </Text>
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.sectionTitle}>Your Responses</Text>
        
        {results.answers.map((answer, index) => (
          <View key={answer.questionId} style={styles.answerItem}>
            <Text style={styles.questionNumber}>Question {index + 1}</Text>
            <Text style={styles.questionText}>
              {getQuestionText(answer.questionId)}
            </Text>
            <View style={styles.answerContainer}>
              <Text style={styles.answerValue}>{answer.value}</Text>
              <Text style={styles.answerLabel}>{getAnswerLabel(answer.value)}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.apiSection}>
        <Text style={styles.sectionTitle}>Ready for API</Text>
        <View style={styles.jsonContainer}>
          <Text style={styles.jsonLabel}>Results JSON:</Text>
          <Text style={styles.jsonText}>{JSON.stringify(results, null, 2)}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
          <Text style={styles.restartButtonText}>Take Quiz Again</Text>
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
    backgroundColor: '#d4edda',
    borderBottomWidth: 1,
    borderBottomColor: '#c3e6cb',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#155724',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#155724',
    marginBottom: 8,
  },
  completedAt: {
    fontSize: 14,
    color: '#6c757d',
  },
  resultsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  answerItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  questionNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6c757d',
    marginBottom: 4,
  },
  questionText: {
    fontSize: 16,
    color: '#343a40',
    marginBottom: 8,
    lineHeight: 22,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d6efd',
    marginRight: 8,
    minWidth: 24,
  },
  answerLabel: {
    fontSize: 14,
    color: '#6c757d',
    flex: 1,
  },
  apiSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  jsonContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  jsonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6c757d',
    marginBottom: 8,
  },
  jsonText: {
    fontSize: 12,
    color: '#495057',
    fontFamily: 'monospace',
    lineHeight: 16,
  },
  actionsContainer: {
    padding: 20,
  },
  restartButton: {
    backgroundColor: '#0d6efd',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restartButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default QuizResults; 
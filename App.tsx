import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native';
import { sampleQuizData } from './data';
import { QuizResults as QuizResultsType } from './src/types/quiz';
import QuizResults from './src/screens/QuizResults';
import Quiz from './src/screens/Quiz';

export default function App() {
  const [quizResults, setQuizResults] = useState<QuizResultsType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuizSubmit = async (results: QuizResultsType) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the results to your API
      console.log('Quiz results ready for API:', results);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Replace with actual API call
      // const response = await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(results),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to submit quiz results');
      // }
      
      setQuizResults(results);
      
      // Show success message
      Alert.alert(
        'Success!',
        'Your quiz has been completed successfully.',
        [{ text: 'OK' }]
      );
      
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      Alert.alert(
        'Error',
        'Failed to submit quiz. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setQuizResults(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {quizResults ? (
        <QuizResults
          results={quizResults}
          questionBlock={sampleQuizData}
          onRestart={handleRestart}
        />
      ) : (
        <Quiz
          questionBlock={sampleQuizData}
          onSubmit={handleQuizSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

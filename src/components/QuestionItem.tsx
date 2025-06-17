//The class defines the styles, buttons and options concerning the question items.

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Question } from '../types/question';

interface Props {
  question: Question;
  selectedValue: number | null;
  onValueChange: (questionId: number, value: number) => void;
  disabled?: boolean;
}

const QuestionItem: React.FC<Props> = ({ question, selectedValue, onValueChange, disabled = false }) => {
  const renderRadioButtons = () => {
    const options = [
      { value: 0, label: 'Not at all like me' },
      { value: 1, label: 'A little like me' },
      { value: 2, label: 'A lot like me' },
      { value: 3, label: 'Exactly like me' }
    ];

    return options.map((option) => (
      <TouchableOpacity
        key={option.value}
        style={[
          styles.radioOption,
          disabled && styles.radioOptionDisabled
        ]}
        onPress={() => !disabled && onValueChange(question.id, option.value)}
        disabled={disabled}
      >
        <View style={[
          styles.radioCircle,
          selectedValue === option.value && styles.radioCircleSelected,
          disabled && styles.radioCircleDisabled
        ]}>
          {selectedValue === option.value && <View style={[
            styles.radioInner,
            disabled && styles.radioInnerDisabled
          ]} />}
        </View>
        <View style={styles.radioLabelContainer}>
          <Text style={[
            styles.radioValue,
            disabled && styles.radioValueDisabled
          ]}>{option.value}</Text>
          <Text style={[
            styles.radioLabel,
            disabled && styles.radioLabelDisabled
          ]}>{option.label}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={[
      styles.container,
      disabled && styles.containerDisabled
    ]}>
      <Text style={[
        styles.questionText,
        disabled && styles.questionTextDisabled
      ]}>{question.text}</Text>
      <View style={styles.optionsContainer}>
        {renderRadioButtons()}
      </View>
    </View>
  );
};

//styling for question panel
const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  containerDisabled: {
    opacity: 0.6,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 16,
    lineHeight: 24,
  },
  questionTextDisabled: {
    color: '#6c757d',
  },
  optionsContainer: {
    gap: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioOptionDisabled: {
    opacity: 0.7,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6c757d',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: '#0d6efd',
  },
  radioCircleDisabled: {
    borderColor: '#adb5bd',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0d6efd',
  },
  radioInnerDisabled: {
    backgroundColor: '#adb5bd',
  },
  radioLabelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d6efd',
    marginRight: 8,
    minWidth: 20,
  },
  radioValueDisabled: {
    color: '#adb5bd',
  },
  radioLabel: {
    fontSize: 14,
    color: '#6c757d',
    flex: 1,
  },
  radioLabelDisabled: {
    color: '#adb5bd',
  },
});

export default QuestionItem; 
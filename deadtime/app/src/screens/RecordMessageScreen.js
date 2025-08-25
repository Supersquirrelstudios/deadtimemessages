import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

/**
 * RecordMessageScreen allows users to choose the type of message they want
 * to create (video, audio, or text). In a full application, this would
 * launch device recording functionality.
 */
export default function RecordMessageScreen() {
  const navigation = useNavigation();
  const [type, setType] = useState('Video');

  const handleNext = () => {
    navigation.navigate('Recipients', { messageType: type });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Record a Message</Text>
      <Text style={styles.subheader}>Select message type:</Text>
      <View style={styles.optionsRow}>
        {['Video', 'Audio', 'Text'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              type === option && styles.optionButtonActive,
            ]}
            onPress={() => setType(option)}
          >
            <Text
              style={
                type === option ? styles.optionTextActive : styles.optionText
              }
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a2540',
    marginTop: 20,
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionButton: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: '#e5c07b',
    borderColor: '#e5c07b',
  },
  optionText: {
    color: '#0a2540',
    fontWeight: '600',
  },
  optionTextActive: {
    color: '#0a2540',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#0a2540',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 40,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
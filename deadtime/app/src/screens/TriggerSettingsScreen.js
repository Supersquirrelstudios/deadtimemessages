import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

/**
 * TriggerSettingsScreen lets users configure when their messages will be
 * delivered based on inactivity (in days). A full implementation might
 * support additional triggers such as verified death certificates.
 */
export default function TriggerSettingsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { messageType, recipients } = route.params || {};
  const [days, setDays] = useState('30');

  const save = () => {
    // In a full app we would call the API to create the message
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Trigger Settings</Text>
      <Text style={styles.label}>Send after days of inactivity:</Text>
      <TextInput
        style={styles.input}
        value={days}
        onChangeText={setDays}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.saveButton} onPress={save}>
        <Text style={styles.saveButtonText}>Save Message</Text>
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#0a2540',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
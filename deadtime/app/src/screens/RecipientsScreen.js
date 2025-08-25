import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

/**
 * RecipientsScreen collects the names and emails/phone numbers of the people
 * who will receive the recorded message. It displays a list of added
 * recipients and allows the user to proceed to trigger settings.
 */
export default function RecipientsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { messageType } = route.params || {};

  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipients, setRecipients] = useState([]);

  const addRecipient = () => {
    if (recipientName && recipientEmail) {
      setRecipients([
        ...recipients,
        { name: recipientName.trim(), email: recipientEmail.trim() },
      ]);
      setRecipientName('');
      setRecipientEmail('');
    }
  };

  const next = () => {
    navigation.navigate('TriggerSettings', { messageType, recipients });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Recipients</Text>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          value={recipientName}
          onChangeText={setRecipientName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email or Phone"
          value={recipientEmail}
          onChangeText={setRecipientEmail}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addRecipient}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recipients}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => (
          <View style={styles.recipientItem}>
            <Text style={styles.recipientText}>
              {item.name} – {item.email}
            </Text>
          </View>
        )}
        style={{ flex: 1, width: '100%' }}
      />
      <TouchableOpacity
        style={[styles.nextButton, { opacity: recipients.length ? 1 : 0.5 }]}
        onPress={next}
        disabled={recipients.length === 0}
      >
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
    marginBottom: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#e5c07b',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#0a2540',
    fontWeight: 'bold',
  },
  recipientItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  recipientText: {
    color: '#0a2540',
  },
  nextButton: {
    backgroundColor: '#0a2540',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
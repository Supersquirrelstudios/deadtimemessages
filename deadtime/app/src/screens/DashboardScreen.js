import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

/**
 * DashboardScreen lists existing messages and provides a button to create a new one.
 * In a full implementation this screen would fetch data from the backend API.
 */
export default function DashboardScreen() {
  const navigation = useNavigation();

  // Dummy message data. Replace with API data in production.
  const messages = [
    { id: '1', title: 'Message to Mom', type: 'Video', status: 'Scheduled' },
    { id: '2', title: 'Message to Partner', type: 'Audio', status: 'Draft' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageTitle}>{item.title}</Text>
      <Text style={styles.messageMeta}>
        {item.type} · {item.status}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Messages</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('RecordMessage')}
      >
        <Text style={styles.addButtonText}>+ New Message</Text>
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
    marginBottom: 10,
  },
  messageItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  messageTitle: {
    fontSize: 18,
    color: '#0a2540',
    fontWeight: '600',
  },
  messageMeta: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#e5c07b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 20,
  },
  addButtonText: {
    color: '#0a2540',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
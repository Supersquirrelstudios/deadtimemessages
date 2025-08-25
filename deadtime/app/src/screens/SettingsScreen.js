import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * SettingsScreen displays account and support options. In a full implementation
 * this would include subscription management and user preferences.
 */
export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Account</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Manage Subscription</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Support</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a2540',
    marginTop: 20,
  },
  section: {
    marginTop: 30,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a2540',
    marginBottom: 10,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#0a2540',
  },
});
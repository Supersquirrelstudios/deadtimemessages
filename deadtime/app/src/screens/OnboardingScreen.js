import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

/**
 * OnboardingScreen introduces the user to the DeadTime app.
 * It displays the logo, tagline and a button to get started.
 */
export default function OnboardingScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>DeadTime</Text>
      <Text style={styles.subtitle}>Your voice, your legacy.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2540',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    color: '#e5c07b',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#e5c07b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    color: '#0a2540',
    fontWeight: 'bold',
  },
});
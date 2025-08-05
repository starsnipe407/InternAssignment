import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../utils/api';

const SubmissionScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a startup name');
      return false;
    }
    if (!formData.tagline.trim()) {
      Alert.alert('Error', 'Please enter a tagline');
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return false;
    }
    if (formData.description.trim().length < 20) {
      Alert.alert('Error', 'Description should be at least 20 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await api.submitIdea({
        name: formData.name.trim(),
        tagline: formData.tagline.trim(),
        description: formData.description.trim(),
      });

      Alert.alert(
        'Success!',
        'Your startup idea has been submitted successfully!',
        [
          {
            text: 'View Ideas',
            onPress: () => {
              setFormData({ name: '', tagline: '', description: '' });
              navigation.navigate('Ideas');
            },
          },
          {
            text: 'Submit Another',
            onPress: () => setFormData({ name: '', tagline: '', description: '' }),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Submit Your Startup Idea</Text>
          <Text style={styles.subtitle}>
            Share your innovative idea and get it evaluated by our AI and the community!
          </Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Startup Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., EcoDelivery"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                maxLength={50}
              />
              <Text style={styles.charCount}>{formData.name.length}/50</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tagline *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Sustainable delivery for a greener future"
                value={formData.tagline}
                onChangeText={(value) => handleInputChange('tagline', value)}
                maxLength={100}
              />
              <Text style={styles.charCount}>{formData.tagline.length}/100</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your startup idea in detail. What problem does it solve? How does it work? What makes it unique?"
                value={formData.description}
                onChangeText={(value) => handleInputChange('description', value)}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                maxLength={500}
              />
              <Text style={styles.charCount}>{formData.description.length}/500</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                isSubmitting && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <View style={styles.submitButtonContent}>
                <Text style={styles.submitButtonText}>
                  {isSubmitting ? 'Submitting...' : 'Submit Idea'}
                </Text>
                {!isSubmitting && (
                  <Ionicons name="rocket" size={18} color="#fff" style={styles.rocketIcon} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#999',
    shadowOpacity: 0,
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rocketIcon: {
    marginLeft: 8,
  },
});

export default SubmissionScreen;
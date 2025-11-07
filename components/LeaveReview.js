import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';

// Import MaterialIcons - handle both ES6 and CommonJS
let MaterialIcons;
try {
  const MaterialIconModule = require('react-native-vector-icons/MaterialIcons');
  MaterialIcons = MaterialIconModule.default || MaterialIconModule;
  if (typeof MaterialIcons !== 'function') {
    MaterialIcons = ({ name, size, color, style }) => (
      <Text style={[{ fontSize: size || 20, color: color || '#000' }, style]}>?</Text>
    );
  }
} catch (error) {
  console.error('Error importing MaterialIcons:', error);
  MaterialIcons = ({ name, size, color, style }) => (
    <Text style={[{ fontSize: size || 20, color: color || '#000' }, style]}>?</Text>
  );
}

const LeaveReview = ({ navigation }) => {
  const [overallRating, setOverallRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [professionalismRating, setProfessionalismRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleOverallRating = (rating) => {
    setOverallRating(rating);
  };

  const handleCommunicationRating = (rating) => {
    setCommunicationRating(rating);
  };

  const handleQualityRating = (rating) => {
    setQualityRating(rating);
  };

  const handleProfessionalismRating = (rating) => {
    setProfessionalismRating(rating);
  };

  const handleSubmitReview = () => {
    if (overallRating === 0) {
      alert('Please select an overall rating');
      return;
    }
    
    // Handle review submission
    console.log('Review submitted:', {
      overallRating,
      communicationRating,
      qualityRating,
      professionalismRating,
      reviewText
    });
    
    alert('Review submitted successfully!');
    // Navigate back after submission
    navigation?.goBack();
  };

  const StarRating = ({ rating, onRatingChange, size = 24 }) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onRatingChange(star)}
            style={styles.starButton}
          >
            <MaterialIcons
              name={star <= rating ? 'star' : 'star-border'}
              size={size}
              color={star <= rating ? '#fbbf24' : '#d1d5db'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation?.navigate('AppNavigator', { initialTab: 'Orders' })}
          >
            <MaterialIcons name="arrow-back" size={24} color="#2d3748" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Leave a Review</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileImageText}>AD</Text>
            </View>
          </View>
          <Text style={styles.profileName}>Alex Doe</Text>
          <Text style={styles.campaignText}>Your review is for the 'EcoWear Summer Line' campaign.</Text>
        </View>

        {/* Overall Experience Rating */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingTitle}>How was your experience?</Text>
          <StarRating 
            rating={overallRating} 
            onRatingChange={handleOverallRating}
            size={32}
          />
        </View>

        {/* Detailed Rating */}
        <View style={styles.detailedRatingSection}>
          <Text style={styles.detailedRatingTitle}>Detailed Rating</Text>
          
          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Communication</Text>
            <StarRating 
              rating={communicationRating} 
              onRatingChange={handleCommunicationRating}
              size={20}
            />
          </View>
          
          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Quality of Work</Text>
            <StarRating 
              rating={qualityRating} 
              onRatingChange={handleQualityRating}
              size={20}
            />
          </View>
          
          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Professionalism</Text>
            <StarRating 
              rating={professionalismRating} 
              onRatingChange={handleProfessionalismRating}
              size={20}
            />
          </View>
        </View>

        {/* Share Experience */}
        <View style={styles.experienceSection}>
          <Text style={styles.experienceTitle}>Share your experience</Text>
          <TextInput
            style={styles.experienceInput}
            placeholder="Tell us more about your experience..."
            placeholderTextColor="#9ca3af"
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  headerSpacer: {
    width: 32,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#464FE5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  campaignText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  ratingCard: {
    backgroundColor: '#f9fafb',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  starContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  detailedRatingSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  detailedRatingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  experienceSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  experienceInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#374151',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#464FE5',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default LeaveReview;

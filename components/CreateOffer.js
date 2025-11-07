import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';

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

const CreateOffer = ({ navigation }) => {
  const [selectedServiceType, setSelectedServiceType] = useState('Creator');
  const [selectedPlatform, setSelectedPlatform] = useState('Instagram');
  const [selectedCategory, setSelectedCategory] = useState('User Generated Content (UGC)');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const serviceCategories = [
    'User Generated Content (UGC)',
    'Product Photography',
    'Video Production',
    'Social Media Management',
    'Content Strategy',
    'Brand Collaboration'
  ];

  const handleCategoryPress = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const handleMediaUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'video/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedMedia(file.name);
        Alert.alert('Success', `File "${file.name}" uploaded successfully!`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation?.navigate('CampaignDetails')}
          >
            <MaterialIcons name="arrow-back" size={24} color="#2d3748" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create an Offer</Text>
          <View style={styles.notificationButton} />
        </View>

        {/* Offer Title Section */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Offer Title</Text>
          <View style={styles.prefixInputContainer}>
            <View style={styles.prefixButton}>
              <Text style={styles.prefixText}>I will</Text>
            </View>
            <TextInput
              style={styles.prefixTextInput}
              placeholder="e.g. High-Quality Instagram Post"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Service Type Section */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Service Type</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, selectedServiceType === 'Creator' && styles.toggleButtonSelected]}
              onPress={() => setSelectedServiceType('Creator')}
            >
              <Text style={[styles.toggleButtonText, selectedServiceType === 'Creator' && styles.toggleButtonTextSelected]}>
                Creator
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, selectedServiceType === 'Influencer' && styles.toggleButtonSelected]}
              onPress={() => setSelectedServiceType('Influencer')}
            >
              <Text style={[styles.toggleButtonText, selectedServiceType === 'Influencer' && styles.toggleButtonTextSelected]}>
                Influencer
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Category Section */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Service Category</Text>
          <TouchableOpacity style={styles.dropdownContainer} onPress={handleCategoryPress}>
            <Text style={styles.dropdownText}>{selectedCategory}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#6b7280" />
          </TouchableOpacity>
          
          {showCategoryDropdown && (
            <View style={styles.dropdownOptions}>
              {serviceCategories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownOption}
                  onPress={() => selectCategory(category)}
                >
                  <Text style={styles.dropdownOptionText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Social Platform Section */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Social Platform</Text>
          <View style={styles.platformContainer}>
            <TouchableOpacity
              style={[styles.platformButton, selectedPlatform === 'Instagram' && styles.platformButtonSelected]}
              onPress={() => setSelectedPlatform('Instagram')}
            >
              <MaterialIcons name="camera-alt" size={20} color={selectedPlatform === 'Instagram' ? '#464FE5' : '#6b7280'} />
              <Text style={[styles.platformButtonText, selectedPlatform === 'Instagram' && styles.platformButtonTextSelected]}>
                Instagram
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.platformButton, selectedPlatform === 'TikTok' && styles.platformButtonSelected]}
              onPress={() => setSelectedPlatform('TikTok')}
            >
              <MaterialIcons name="music-note" size={20} color={selectedPlatform === 'TikTok' ? '#464FE5' : '#6b7280'} />
              <Text style={[styles.platformButtonText, selectedPlatform === 'TikTok' && styles.platformButtonTextSelected]}>
                TikTok
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.platformButton, selectedPlatform === 'YouTube' && styles.platformButtonSelected]}
              onPress={() => setSelectedPlatform('YouTube')}
            >
              <MaterialIcons name="play-circle-filled" size={20} color={selectedPlatform === 'YouTube' ? '#464FE5' : '#6b7280'} />
              <Text style={[styles.platformButtonText, selectedPlatform === 'YouTube' && styles.platformButtonTextSelected]}>
                YouTube
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Offer Duration Section */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Offer Duration</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 3 weeks"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Rate and Delivery Section */}
        <View style={styles.section}>
          <View style={styles.rowContainer}>
            <View style={styles.halfInputGroup}>
              <Text style={styles.inputLabel}>Rate ($)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="250"
                placeholderTextColor="#9ca3af"
                defaultValue="250"
              />
            </View>
            <View style={styles.halfInputGroup}>
              <Text style={styles.inputLabel}>Delivery (Days)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="7"
                placeholderTextColor="#9ca3af"
                defaultValue="7"
              />
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Description</Text>
          <View style={styles.prefixInputContainer}>
            <View style={styles.prefixButton}>
              <Text style={styles.prefixText}>I will</Text>
            </View>
            <TextInput
              style={[styles.prefixTextInput, styles.textArea]}
              placeholder="Describe what your offer includes, what the brand will get, etc."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Add Media Section */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Add Media (Optional)</Text>
          <TouchableOpacity style={styles.uploadArea} onPress={handleMediaUpload}>
            {selectedMedia ? (
              <View style={styles.uploadedMediaContainer}>
                <MaterialIcons name="check-circle" size={32} color="#22c55e" />
                <Text style={styles.uploadedText}>File uploaded successfully</Text>
                <Text style={styles.uploadedSubtext}>{selectedMedia}</Text>
              </View>
            ) : (
              <View>
                <MaterialIcons name="cloud-upload" size={32} color="#464FE5" />
                <Text style={styles.uploadText}>Click to upload or drag and drop</Text>
                <Text style={styles.uploadSubtext}>Images or Video (MAX. 800x400px)</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.createOfferButton}
            onPress={() => {
              // Handle create offer logic
              navigation?.navigate('Proposals');
            }}
          >
            <Text style={styles.createOfferButtonText}>Create Offer</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.saveDraftButton}
            onPress={() => navigation?.goBack()}
          >
            <Text style={styles.saveDraftText}>Save as Draft</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation?.navigate('AppNavigator', { initialTab: 'Home' })}
        >
          <MaterialIcons name="home" size={24} color="#64748b" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => {
            // Already on CreateOffer, do nothing or navigate to ExploreOffers
          }}
        >
          <MaterialIcons name="local-offer" size={24} color="#464FE5" />
          <Text style={[styles.navText, styles.navTextActive]}>Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation?.navigate('AppNavigator', { initialTab: 'Messages' })}
        >
          <MaterialIcons name="chat-bubble" size={24} color="#64748b" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation?.navigate('AppNavigator', { initialTab: 'Orders' })}
        >
          <MaterialIcons name="shopping-bag" size={24} color="#64748b" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation?.navigate('AppNavigator', { initialTab: 'Profile' })}
        >
          <MaterialIcons name="person" size={24} color="#64748b" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 100,
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
  notificationButton: {
    padding: 4,
  },
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  prefixInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  prefixButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  prefixText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  prefixTextInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleButtonSelected: {
    backgroundColor: '#464FE5',
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  toggleButtonTextSelected: {
    color: '#ffffff',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#374151',
  },
  dropdownOptions: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#374151',
  },
  platformContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  platformButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 6,
  },
  platformButtonSelected: {
    backgroundColor: '#ffffff',
    borderColor: '#464FE5',
  },
  platformButtonText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  platformButtonTextSelected: {
    color: '#464FE5',
  },
  textInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInputGroup: {
    flex: 1,
  },
  uploadArea: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 14,
    color: '#374151',
    marginTop: 8,
    fontWeight: '500',
  },
  uploadSubtext: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  uploadedMediaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedText: {
    fontSize: 14,
    color: '#22c55e',
    marginTop: 8,
    fontWeight: '500',
  },
  uploadedSubtext: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  actionButtonsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 100,
  },
  createOfferButton: {
    backgroundColor: '#464FE5',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  createOfferButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  saveDraftButton: {
    alignItems: 'center',
  },
  saveDraftText: {
    fontSize: 14,
    color: '#6b7280',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
  },
  navTextActive: {
    color: '#464FE5',
  },
});

export default CreateOffer;

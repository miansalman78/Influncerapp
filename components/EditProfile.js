import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Image, Alert } from 'react-native';

// Import MaterialIcons
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

const EditProfile = ({ navigation, route }) => {
  // Get user role from navigation params
  // Check multiple possible formats: 'Creator', 'creator', 'Brand', 'brand'
  let userRoleParam = route?.params?.role || navigation?.getParam?.('role');
  
  // If role not found in params, try to determine from navigation state
  if (!userRoleParam) {
    // Check if we can determine from navigation state or screen history
    // This is a fallback - ideally role should be passed as param
    userRoleParam = 'Creator'; // Default fallback
  }
  
  // Determine role - normalize to lowercase for comparison
  const roleLower = userRoleParam?.toLowerCase() || 'creator';
  const isCreator = roleLower === 'creator';
  const isBrand = roleLower === 'brand';
  
  // Debug log to help identify the issue
  console.log('EditProfile - Role detection:', { userRoleParam, roleLower, isCreator, isBrand });
  
  // Use the normalized role
  const userRole = isBrand ? 'Brand' : 'Creator';

  // Personal Details State
  const [fullName, setFullName] = useState('Olivia Smith');
  const [username, setUsername] = useState('@olivia_smith');
  const [email, setEmail] = useState('olivia.smith@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [location, setLocation] = useState('Los Angeles, CA');
  const [bio, setBio] = useState('Fashion & beauty content creator passionate about sustainable fashion and empowering women.');

  // Social Media State
  const [instagram, setInstagram] = useState('@olivia_smith');
  const [tiktok, setTiktok] = useState('@olivia.smith');
  const [youtube, setYoutube] = useState('youtube.com/@oliviasmith');
  const [twitter, setTwitter] = useState('@olivia_smith');
  const [facebook, setFacebook] = useState('facebook.com/oliviasmith');

  // Creator-specific State
  const [category, setCategory] = useState('Fashion & Beauty');
  const [engagementRate, setEngagementRate] = useState('8.5%');
  const [followerCount, setFollowerCount] = useState('1.2M');

  // Brand-specific State
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [campaignBudget, setCampaignBudget] = useState('');
  const [brandTagline, setBrandTagline] = useState('');

  // Payment Details (Creator only)
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('Olivia Smith');
  const [paystackEmail, setPaystackEmail] = useState('olivia.smith@example.com');

  // Profile Image
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMGltYWdlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000');

  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    social: true,
    roleSpecific: true,
    payment: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleImagePicker = () => {
    // TODO: Implement image picker
    Alert.alert('Image Picker', 'Select from Camera or Gallery', [
      { text: 'Camera', onPress: () => console.log('Open camera') },
      { text: 'Gallery', onPress: () => console.log('Open gallery') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSave = async () => {
    // Validate required fields
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter your username');
      return;
    }

    // Prepare profile data
    const profileData = {
      fullName,
      username,
      email,
      phone,
      location,
      bio,
      socialMedia: {
        instagram,
        tiktok,
        youtube,
        twitter,
        facebook,
      },
      ...(isCreator ? {
        category,
        engagementRate,
        followerCount,
        payment: {
          bankName,
          accountNumber,
          accountHolderName,
          paystackEmail,
        },
      } : {
        companyName,
        industry,
        website,
        campaignBudget,
        brandTagline,
      }),
    };

    try {
      // TODO: Call API to save profile
      // const response = await updateProfileAPI(profileData);
      console.log('Saving profile:', profileData);
      
      Alert.alert('Success', 'Profile updated successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to Profile screen
            navigation?.navigate('CreatorProfile');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    }
  };

  const handleCancel = () => {
    navigation?.goBack();
  };

  const categories = ['Fashion & Beauty', 'Tech', 'Lifestyle', 'Fitness', 'Food', 'Travel', 'Gaming'];
  const industries = ['Fashion', 'Technology', 'Food & Beverage', 'Beauty', 'Fitness', 'Travel', 'Other'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Photo Section */}
        <View style={styles.profilePhotoSection}>
          <TouchableOpacity onPress={handleImagePicker} style={styles.imageContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <View style={styles.editImageOverlay}>
              <MaterialIcons name="camera-alt" size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={styles.imageHint}>Tap to change profile photo</Text>
        </View>

        {/* Personal Details Section */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection('personal')}
        >
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <MaterialIcons
            name={expandedSections.personal ? 'expand-less' : 'expand-more'}
            size={24}
            color="#6B7280"
          />
        </TouchableOpacity>
        {expandedSections.personal && (
          <View style={styles.sectionContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username / Brand Name *</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder={isCreator ? "Enter your username" : "Enter brand name"}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={email}
                onChangeText={setEmail}
                editable={true}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Enter your location"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={bio}
                onChangeText={setBio}
                placeholder="Tell us about yourself"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
        )}

        {/* Social Media Links Section */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection('social')}
        >
          <Text style={styles.sectionTitle}>Social Media Links</Text>
          <MaterialIcons
            name={expandedSections.social ? 'expand-less' : 'expand-more'}
            size={24}
            color="#6B7280"
          />
        </TouchableOpacity>
        {expandedSections.social && (
          <View style={styles.sectionContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Instagram</Text>
              <TextInput
                style={styles.input}
                value={instagram}
                onChangeText={setInstagram}
                placeholder="Enter your Instagram username"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>TikTok</Text>
              <TextInput
                style={styles.input}
                value={tiktok}
                onChangeText={setTiktok}
                placeholder="Enter your TikTok username"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>YouTube</Text>
              <TextInput
                style={styles.input}
                value={youtube}
                onChangeText={setYoutube}
                placeholder="Enter your YouTube channel URL"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>X (Twitter)</Text>
              <TextInput
                style={styles.input}
                value={twitter}
                onChangeText={setTwitter}
                placeholder="Enter your Twitter handle"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Facebook</Text>
              <TextInput
                style={styles.input}
                value={facebook}
                onChangeText={setFacebook}
                placeholder="Enter your Facebook page URL"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        )}

        {/* Role-Specific Section */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection('roleSpecific')}
        >
          <Text style={styles.sectionTitle}>
            {isCreator ? 'Creator Details' : 'Brand Details'}
          </Text>
          <MaterialIcons
            name={expandedSections.roleSpecific ? 'expand-less' : 'expand-more'}
            size={24}
            color="#6B7280"
          />
        </TouchableOpacity>
        {expandedSections.roleSpecific && (
          <View style={styles.sectionContent}>
            {isCreator ? (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Category</Text>
                  <View style={styles.pickerContainer}>
                    {categories.map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        style={[
                          styles.pickerOption,
                          category === cat && styles.pickerOptionSelected,
                        ]}
                        onPress={() => setCategory(cat)}
                      >
                        <Text
                          style={[
                            styles.pickerOptionText,
                            category === cat && styles.pickerOptionTextSelected,
                          ]}
                        >
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Average Engagement Rate</Text>
                  <TextInput
                    style={styles.input}
                    value={engagementRate}
                    onChangeText={setEngagementRate}
                    placeholder="e.g., 8.5%"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Follower Count</Text>
                  <TextInput
                    style={styles.input}
                    value={followerCount}
                    onChangeText={setFollowerCount}
                    placeholder="e.g., 1.2M"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </>
            ) : (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Company Name</Text>
                  <TextInput
                    style={styles.input}
                    value={companyName}
                    onChangeText={setCompanyName}
                    placeholder="Enter company name"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Industry</Text>
                  <View style={styles.pickerContainer}>
                    {industries.map((ind) => (
                      <TouchableOpacity
                        key={ind}
                        style={[
                          styles.pickerOption,
                          industry === ind && styles.pickerOptionSelected,
                        ]}
                        onPress={() => setIndustry(ind)}
                      >
                        <Text
                          style={[
                            styles.pickerOptionText,
                            industry === ind && styles.pickerOptionTextSelected,
                          ]}
                        >
                          {ind}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Website</Text>
                  <TextInput
                    style={styles.input}
                    value={website}
                    onChangeText={setWebsite}
                    placeholder="Enter website URL"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="url"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Average Campaign Budget</Text>
                  <TextInput
                    style={styles.input}
                    value={campaignBudget}
                    onChangeText={setCampaignBudget}
                    placeholder="e.g., $5,000 - $10,000"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Brand Tagline</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={brandTagline}
                    onChangeText={setBrandTagline}
                    placeholder="Enter your brand tagline"
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={2}
                  />
                </View>
              </>
            )}
          </View>
        )}

        {/* Payment Details Section (Creator only) */}
        {isCreator && (
          <>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection('payment')}
            >
              <Text style={styles.sectionTitle}>Payment Details</Text>
              <MaterialIcons
                name={expandedSections.payment ? 'expand-less' : 'expand-more'}
                size={24}
                color="#6B7280"
              />
            </TouchableOpacity>
            {expandedSections.payment && (
              <View style={styles.sectionContent}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Bank Name</Text>
                  <TextInput
                    style={styles.input}
                    value={bankName}
                    onChangeText={setBankName}
                    placeholder="Enter bank name"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Account Number</Text>
                  <TextInput
                    style={styles.input}
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                    placeholder="Enter account number"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    secureTextEntry
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Account Holder Name</Text>
                  <TextInput
                    style={styles.input}
                    value={accountHolderName}
                    onChangeText={setAccountHolderName}
                    placeholder="Enter account holder name"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Paystack Email</Text>
                  <TextInput
                    style={styles.input}
                    value={paystackEmail}
                    onChangeText={setPaystackEmail}
                    placeholder="Enter Paystack email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                  />
                </View>
              </View>
            )}
          </>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButtonLarge} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#464FE5',
  },
  scrollView: {
    flex: 1,
  },
  profilePhotoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editImageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#464FE5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  imageHint: {
    fontSize: 14,
    color: '#6B7280',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputDisabled: {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pickerOptionSelected: {
    backgroundColor: '#464FE5',
    borderColor: '#464FE5',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  pickerOptionTextSelected: {
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  saveButtonLarge: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#464FE5',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default EditProfile;


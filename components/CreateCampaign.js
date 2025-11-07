import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';

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

const CreateCampaign = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState('Brand Awareness');
  const [selectedCompensation, setSelectedCompensation] = useState('Paid');
  const [selectedPlatform, setSelectedPlatform] = useState('Instagram');
  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedFollowerRange, setSelectedFollowerRange] = useState('1k - 10k (Nano)');
  const [showFollowerDropdown, setShowFollowerDropdown] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState('Influencer Service');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  const followerRanges = [
    '1k - 10k (Nano)',
    '10k - 100k (Micro)',
    '100k - 1M (Macro)',
    '1M+ (Mega)',
    'Any Range'
  ];

  const serviceTypes = [
    'Influencer Service',
    'Content Creation',
    'Brand Partnership',
    'Product Review',
    'Social Media Management'
  ];

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    
    if (selectedDate) {
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });
      setSelectedDate(formattedDate);
    }
  };

  const handleFollowerRangePress = () => {
    setShowFollowerDropdown(!showFollowerDropdown);
  };

  const selectFollowerRange = (range) => {
    setSelectedFollowerRange(range);
    setShowFollowerDropdown(false);
  };

  const handleServiceTypePress = () => {
    setShowServiceDropdown(!showServiceDropdown);
  };

  const selectServiceType = (service) => {
    setSelectedServiceType(service);
    setShowServiceDropdown(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#2d3748" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Campaign</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Campaign Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Campaign Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Campaign Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Summer Fashion Launch"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Describe your campaign objectives and what you're promoting."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Main Goal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Main Goal</Text>
          <View style={styles.goalGrid}>
            <TouchableOpacity
              style={[styles.goalButton, selectedGoal === 'Brand Awareness' && styles.goalButtonSelected]}
              onPress={() => setSelectedGoal('Brand Awareness')}
            >
              <Text style={[styles.goalButtonText, selectedGoal === 'Brand Awareness' && styles.goalButtonTextSelected]}>
                Brand Awareness
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.goalButton, selectedGoal === 'Content Creation' && styles.goalButtonSelected]}
              onPress={() => setSelectedGoal('Content Creation')}
            >
              <Text style={[styles.goalButtonText, selectedGoal === 'Content Creation' && styles.goalButtonTextSelected]}>
                Content Creation
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.goalButton, selectedGoal === 'Sales' && styles.goalButtonSelected]}
              onPress={() => setSelectedGoal('Sales')}
            >
              <Text style={[styles.goalButtonText, selectedGoal === 'Sales' && styles.goalButtonTextSelected]}>
                Sales
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.goalButton, selectedGoal === 'Lead Generation' && styles.goalButtonSelected]}
              onPress={() => setSelectedGoal('Lead Generation')}
            >
              <Text style={[styles.goalButtonText, selectedGoal === 'Lead Generation' && styles.goalButtonTextSelected]}>
                Lead Generation
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Details & Requirements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Details & Requirements</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Service Type</Text>
            <TouchableOpacity style={styles.dropdownContainer} onPress={handleServiceTypePress}>
              <Text style={styles.dropdownText}>{selectedServiceType}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={20} color="#6b7280" />
            </TouchableOpacity>
            
            {showServiceDropdown && (
              <View style={styles.dropdownOptions}>
                {serviceTypes.map((service, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownOption}
                    onPress={() => selectServiceType(service)}
                  >
                    <Text style={styles.dropdownOptionText}>{service}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Campaign Duration</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., 3 weeks"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Post Visibility Duration</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., 30 days on page"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Application Deadline</Text>
            <TouchableOpacity style={styles.dateInputContainer} onPress={handleDatePress}>
              <Text style={styles.dateInput}>
                {selectedDate || 'mm/dd/yyyy'}
              </Text>
              <MaterialIcons name="event" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Budget & Compensation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget & Compensation</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Total Budget</Text>
            <View style={styles.budgetInputContainer}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.budgetInput}
                placeholder="5000"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Compensation Type</Text>
            <View style={styles.compensationContainer}>
              <TouchableOpacity
                style={[styles.compensationButton, selectedCompensation === 'Paid' && styles.compensationButtonSelected]}
                onPress={() => setSelectedCompensation('Paid')}
              >
                <Text style={[styles.compensationButtonText, selectedCompensation === 'Paid' && styles.compensationButtonTextSelected]}>
                  Paid
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.compensationButton, selectedCompensation === 'Free Product' && styles.compensationButtonSelected]}
                onPress={() => setSelectedCompensation('Free Product')}
              >
                <Text style={[styles.compensationButtonText, selectedCompensation === 'Free Product' && styles.compensationButtonTextSelected]}>
                  Free Product
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Creator Requirements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Creator Requirements</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Platforms</Text>
            <View style={styles.platformContainer}>
              <TouchableOpacity
                style={[styles.platformButton, selectedPlatform === 'Instagram' && styles.platformButtonSelected]}
                onPress={() => setSelectedPlatform('Instagram')}
              >
                <MaterialIcons name="camera-alt" size={20} color={selectedPlatform === 'Instagram' ? '#464FE5' : '#6b7280'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.platformButton, selectedPlatform === 'TikTok' && styles.platformButtonSelected]}
                onPress={() => setSelectedPlatform('TikTok')}
              >
                <MaterialIcons name="music-note" size={20} color={selectedPlatform === 'TikTok' ? '#464FE5' : '#6b7280'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.platformButton, selectedPlatform === 'YouTube' && styles.platformButtonSelected]}
                onPress={() => setSelectedPlatform('YouTube')}
              >
                <MaterialIcons name="play-circle-filled" size={20} color={selectedPlatform === 'YouTube' ? '#464FE5' : '#6b7280'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.platformButton, selectedPlatform === 'Facebook' && styles.platformButtonSelected]}
                onPress={() => setSelectedPlatform('Facebook')}
              >
                <MaterialIcons name="facebook" size={20} color={selectedPlatform === 'Facebook' ? '#464FE5' : '#6b7280'} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Follower Range</Text>
            <TouchableOpacity style={styles.dropdownContainer} onPress={handleFollowerRangePress}>
              <Text style={styles.dropdownText}>{selectedFollowerRange}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={20} color="#6b7280" />
            </TouchableOpacity>
            
            {showFollowerDropdown && (
              <View style={styles.dropdownOptions}>
                {followerRanges.map((range, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownOption}
                    onPress={() => selectFollowerRange(range)}
                  >
                    <Text style={styles.dropdownOptionText}>{range}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.postCampaignButton}>
            <Text style={styles.postCampaignButtonText}>Post Campaign</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveDraftButton}>
            <Text style={styles.saveDraftText}>Save as Draft</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="local-offer" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="chat-bubble" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="shopping-bag" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 120,
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
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
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
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    paddingVertical: 0,
  },
  budgetInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dollarSign: {
    fontSize: 16,
    color: '#374151',
    marginRight: 8,
  },
  budgetInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  goalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  goalButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  goalButtonSelected: {
    backgroundColor: '#464FE5',
    borderColor: '#464FE5',
  },
  goalButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  goalButtonTextSelected: {
    color: '#ffffff',
  },
  compensationContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  compensationButton: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  compensationButtonSelected: {
    backgroundColor: '#464FE5',
    borderColor: '#464FE5',
  },
  compensationButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  compensationButtonTextSelected: {
    color: '#ffffff',
  },
  platformContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  platformButton: {
    width: 48,
    height: 48,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  platformButtonSelected: {
    backgroundColor: '#ffffff',
    borderColor: '#464FE5',
  },
  actionButtonsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 100,
  },
  postCampaignButton: {
    backgroundColor: '#464FE5',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  postCampaignButtonText: {
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
    bottom: -20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 6,
    fontWeight: '500',
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
});

export default CreateCampaign;

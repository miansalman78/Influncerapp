import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

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

const Proposals = ({ navigation }) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Best Match');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    platform: 'All',
    priceRange: 'All',
    followers: 'All',
    rating: 'All'
  });

  const sortOptions = [
    'Best Match',
    'Price: Low to High',
    'Price: High to Low',
    'Followers: High to Low',
    'Rating: High to Low',
    'Newest First'
  ];

  const handleSortPress = () => {
    setShowSortDropdown(!showSortDropdown);
  };

  const selectSortOption = (option) => {
    setSelectedSort(option);
    setShowSortDropdown(false);
  };

  const filterOptions = {
    platform: ['All', 'Instagram', 'TikTok', 'YouTube', 'Twitter'],
    priceRange: ['All', 'Under $100', '$100 - $300', '$300 - $500', 'Over $500'],
    followers: ['All', 'Under 10k', '10k - 100k', '100k - 1M', 'Over 1M'],
    rating: ['All', '4.5+ Stars', '4.0+ Stars', '3.5+ Stars', 'New Creators']
  };

  const handleFilterPress = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const selectFilterOption = (category, option) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: option
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      platform: 'All',
      priceRange: 'All',
      followers: 'All',
      rating: 'All'
    });
  };

  const proposals = [
    {
      id: 1,
      name: 'Jessie Alvarado',
      username: '@jessie_looks',
      avatar: '👩',
      proposal: 'Hi! I specialize in sustainable fashion content and can create a vibrant TikTok video and 3 Instagram stories showcasing your new line. My audience...',
      compensation: '$350',
      compensationType: 'Fixed Price',
      platform: 'TikTok',
      followers: '1.2M Followers',
      engagement: '6.2% Eng. Rate',
      rating: '4.9 (121)',
      platformIcon: 'music-note'
    },
    {
      id: 2,
      name: 'Mike Norman',
      username: '@mikenorman',
      avatar: '👨',
      proposal: 'Excited for this! I can produce a high-quality YouTube short and a carousel post on Instagram. My focus is on cinematic storytelling...',
      compensation: '$480',
      compensationType: 'Fixed Price',
      platform: 'YouTube',
      followers: '850k Followers',
      engagement: '5.1% Eng. Rate',
      rating: '5.0 (88)',
      platformIcon: 'play-circle-filled'
    },
    {
      id: 3,
      name: 'Lora Norman',
      username: '@lorastyle',
      avatar: '👩',
      proposal: 'I\'m a micro-influencer building my portfolio and would love to collaborate in exchange for the full summer line. I will post 2 stories...',
      compensation: 'Free Product',
      compensationType: 'In-kind',
      platform: 'Instagram',
      followers: '15k Followers',
      engagement: '8.9% Eng. Rate',
      rating: 'New Creator',
      platformIcon: 'camera-alt',
      isFreeProduct: true
    },
    {
      id: 4,
      name: 'Alex Thompson',
      username: '@alexcreates',
      avatar: '👨',
      proposal: 'Professional photographer with 5+ years experience in fashion content. I can create stunning visuals for your summer collection...',
      compensation: '$320',
      compensationType: 'Fixed Price',
      platform: 'Instagram',
      followers: '45k Followers',
      engagement: '7.2% Eng. Rate',
      rating: '4.8 (67)',
      platformIcon: 'camera-alt'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      username: '@emmastyle',
      avatar: '👩',
      proposal: 'Fashion blogger specializing in sustainable fashion. I can create authentic content showcasing your eco-friendly summer line...',
      compensation: '$280',
      compensationType: 'Fixed Price',
      platform: 'TikTok',
      followers: '78k Followers',
      engagement: '9.1% Eng. Rate',
      rating: '4.7 (89)',
      platformIcon: 'music-note'
    }
  ];

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
          <Text style={styles.headerTitle}>Proposals</Text>
          <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
            <MaterialIcons name="tune" size={24} color="#2d3748" />
          </TouchableOpacity>
        </View>

        {/* Campaign Details Card */}
        <View style={styles.campaignCard}>
          <Text style={styles.campaignLabel}>CAMPAIGN</Text>
          <Text style={styles.campaignTitle}>EcoWear Summer Line</Text>
          <View style={styles.campaignDetails}>
            <MaterialIcons name="local-offer" size={16} color="#6b7280" />
            <Text style={styles.budgetText}>$200 - $500</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.statusTag}>
              <Text style={styles.statusText}>Accepting Bids</Text>
            </View>
          </View>
        </View>

        {/* Bids Received Section */}
        <View style={styles.bidsHeader}>
          <Text style={styles.bidsTitle}>Bids Received (6)</Text>
          <TouchableOpacity style={styles.sortContainer} onPress={handleSortPress}>
            <Text style={styles.sortText}>Sort by: {selectedSort}</Text>
            <MaterialIcons 
              name={showSortDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
              size={20} 
              color="#6b7280" 
            />
          </TouchableOpacity>
        </View>

        {/* Sort Dropdown */}
        {showSortDropdown && (
          <View style={styles.sortDropdown}>
            {sortOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.sortOption}
                onPress={() => selectSortOption(option)}
              >
                <Text style={[
                  styles.sortOptionText,
                  selectedSort === option && styles.sortOptionTextSelected
                ]}>
                  {option}
                </Text>
                {selectedSort === option && (
                  <MaterialIcons name="check" size={16} color="#464FE5" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Filter Dropdown */}
        {showFilterDropdown && (
          <View style={styles.filterDropdown}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filters</Text>
              <TouchableOpacity onPress={clearAllFilters}>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            </View>
            
            {/* Platform Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Platform</Text>
              <View style={styles.filterOptions}>
                {filterOptions.platform.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterOption,
                      selectedFilters.platform === option && styles.filterOptionSelected
                    ]}
                    onPress={() => selectFilterOption('platform', option)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      selectedFilters.platform === option && styles.filterOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Price Range</Text>
              <View style={styles.filterOptions}>
                {filterOptions.priceRange.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterOption,
                      selectedFilters.priceRange === option && styles.filterOptionSelected
                    ]}
                    onPress={() => selectFilterOption('priceRange', option)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      selectedFilters.priceRange === option && styles.filterOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Followers Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Followers</Text>
              <View style={styles.filterOptions}>
                {filterOptions.followers.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterOption,
                      selectedFilters.followers === option && styles.filterOptionSelected
                    ]}
                    onPress={() => selectFilterOption('followers', option)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      selectedFilters.followers === option && styles.filterOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Rating Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Rating</Text>
              <View style={styles.filterOptions}>
                {filterOptions.rating.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterOption,
                      selectedFilters.rating === option && styles.filterOptionSelected
                    ]}
                    onPress={() => selectFilterOption('rating', option)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      selectedFilters.rating === option && styles.filterOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Apply Filters Button */}
            <TouchableOpacity 
              style={styles.applyFiltersButton}
              onPress={() => setShowFilterDropdown(false)}
            >
              <Text style={styles.applyFiltersText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Proposals List */}
        <View style={styles.proposalsContainer}>
          {proposals.map((proposal) => (
            <View key={proposal.id} style={styles.proposalCard}>
              {/* Proposal Text */}
              <Text style={styles.proposalText}>{proposal.proposal}</Text>

              {/* Creator Profile and Compensation */}
              <View style={styles.profileSection}>
                <View style={styles.creatorInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{proposal.avatar}</Text>
                  </View>
                  <View style={styles.creatorDetails}>
                    <Text style={styles.creatorName}>{proposal.name}</Text>
                    <Text style={styles.creatorUsername}>{proposal.username}</Text>
                  </View>
                </View>
                <View style={styles.compensationContainer}>
                  {proposal.isFreeProduct ? (
                    <View style={styles.freeProductContainer}>
                      <MaterialIcons name="card-giftcard" size={16} color="#10b981" />
                      <Text style={styles.freeProductText}>Free Product</Text>
                    </View>
                  ) : (
                    <Text style={styles.compensationAmount}>{proposal.compensation}</Text>
                  )}
                  <Text style={styles.compensationType}>{proposal.compensationType}</Text>
                </View>
              </View>

              {/* Metrics Separator Line */}
              <View style={styles.metricsSeparator} />

              {/* Metrics */}
              <View style={styles.metricsContainer}>
                <View style={styles.metricItem}>
                  <View style={styles.metricIconContainer}>
                    <MaterialIcons name={proposal.platformIcon} size={16} color="#6b7280" />
                  </View>
                  <View style={styles.metricTextContainer}>
                    <Text style={styles.metricLabel}>Followers</Text>
                    <Text style={styles.metricText}>{proposal.followers}</Text>
                  </View>
                </View>
                <View style={styles.metricItem}>
                  <View style={styles.metricIconContainer}>
                    <MaterialIcons name="favorite" size={16} color="#6b7280" />
                  </View>
                  <View style={styles.metricTextContainer}>
                    <Text style={styles.metricLabel}>Eng. Rate</Text>
                    <Text style={styles.metricText}>{proposal.engagement}</Text>
                  </View>
                </View>
                <View style={styles.metricItem}>
                  <View style={styles.metricIconContainer}>
                    <MaterialIcons name="star" size={16} color="#6b7280" />
                  </View>
                  <View style={styles.metricTextContainer}>
                    <Text style={styles.metricLabel}>Rating</Text>
                    <Text style={styles.metricText}>{proposal.rating}</Text>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity 
                  style={styles.messageButton}
                  onPress={() => navigation?.navigate('Messages')}
                >
                  <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.hireButton}
                  onPress={() => {
                    // Handle hire creator - navigate to ActiveOrders
                    navigation?.navigate('AppNavigator', { initialTab: 'Orders' });
                  }}
                >
                  <Text style={styles.hireButtonText}>Hire Creator</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  filterButton: {
    padding: 4,
  },
  campaignCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  campaignLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  campaignTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 12,
  },
  campaignDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  budgetText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusTag: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  bidsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  bidsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 4,
  },
  sortDropdown: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#2d3748',
  },
  sortOptionTextSelected: {
    color: '#464FE5',
    fontWeight: '600',
  },
  filterDropdown: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  clearAllText: {
    fontSize: 14,
    color: '#464FE5',
    fontWeight: '600',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  filterOptionSelected: {
    backgroundColor: '#464FE5',
    borderColor: '#464FE5',
  },
  filterOptionText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: '#ffffff',
  },
  applyFiltersButton: {
    backgroundColor: '#464FE5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  applyFiltersText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  proposalsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  proposalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  proposalText: {
    fontSize: 14,
    color: '#2d3748',
    lineHeight: 20,
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
  },
  creatorDetails: {
    flex: 1,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 2,
  },
  creatorUsername: {
    fontSize: 14,
    color: '#6b7280',
  },
  compensationContainer: {
    alignItems: 'flex-end',
  },
  compensationAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 2,
  },
  compensationType: {
    fontSize: 12,
    color: '#6b7280',
  },
  freeProductContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  freeProductText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
    marginLeft: 4,
  },
  metricsSeparator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginHorizontal: 2,
  },
  metricIconContainer: {
    marginRight: 8,
    marginTop: 2,
  },
  metricTextContainer: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    color: '#9ca3af',
    marginBottom: 2,
    fontWeight: '500',
  },
  metricText: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#eff6ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dbeafe',
    alignItems: 'center',
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#464FE5',
  },
  hireButton: {
    flex: 1,
    backgroundColor: '#464FE5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  hireButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default Proposals;

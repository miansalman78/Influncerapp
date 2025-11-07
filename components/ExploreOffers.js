import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Image } from 'react-native';

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

const ExploreOffers = ({ navigation }) => {
  const [selectedServiceType, setSelectedServiceType] = useState('Creator');
  const [freeProductsOnly, setFreeProductsOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    platform: 'All',
    priceRange: 'All',
    location: 'All',
    audience: 'All'
  });

  const offers = [
    // Creator Services
    {
      id: 1,
      title: 'UGC Video for Makeup',
      creator: '@jessica_mua',
      avatar: '👩',
      location: 'CA, USA',
      audience: '250k',
      platform: 'Instagram',
      platformIcon: 'camera-alt',
      price: '$250',
      isFreeProduct: false,
      image: '💄',
      serviceType: 'Creator'
    },
    {
      id: 2,
      title: 'Tech Unboxing Video',
      creator: '@techsavvy',
      avatar: '👨',
      location: 'NY, USA',
      audience: '1.2M',
      platform: 'YouTube',
      platformIcon: 'play-circle-filled',
      price: '$400',
      isFreeProduct: false,
      image: '📱',
      serviceType: 'Creator'
    },
    {
      id: 3,
      title: 'Travel Blog Post',
      creator: '@wanderlust_anna',
      avatar: '👩',
      location: 'CO, USA',
      audience: '80k',
      platform: 'Blog',
      platformIcon: 'article',
      price: '$150',
      isFreeProduct: false,
      image: '🏔️',
      serviceType: 'Creator'
    },
    {
      id: 4,
      title: 'Skincare Product Promotion',
      creator: '@glowupgrace',
      avatar: '👩',
      location: 'FL, USA',
      audience: '515k',
      platform: 'TikTok',
      platformIcon: 'music-note',
      price: 'Free Product',
      isFreeProduct: true,
      image: '🧴',
      serviceType: 'Creator'
    },
    {
      id: 5,
      title: 'Fitness App Promo',
      creator: '@fit_mike',
      avatar: '👨',
      location: 'TX, USA',
      audience: '1.8M',
      platform: 'Instagram',
      platformIcon: 'camera-alt',
      price: '$300',
      isFreeProduct: false,
      image: '🏃‍♂️',
      serviceType: 'Creator'
    },
    {
      id: 6,
      title: 'Recipe Creation',
      creator: '@chefgordon',
      avatar: '👨',
      location: 'NV, USA',
      audience: '3.1M',
      platform: 'YouTube',
      platformIcon: 'play-circle-filled',
      price: '$500',
      isFreeProduct: false,
      image: '👨‍🍳',
      serviceType: 'Creator'
    },
    // Influencer Services
    {
      id: 7,
      title: 'Brand Partnership Campaign',
      creator: '@influencer_pro',
      avatar: '⭐',
      location: 'LA, USA',
      audience: '2.5M',
      platform: 'Instagram',
      platformIcon: 'camera-alt',
      price: '$800',
      isFreeProduct: false,
      image: '🎯',
      serviceType: 'Influencer'
    },
    {
      id: 8,
      title: 'Product Launch Promotion',
      creator: '@trendsetter',
      avatar: '🔥',
      location: 'NY, USA',
      audience: '1.5M',
      platform: 'TikTok',
      platformIcon: 'music-note',
      price: '$600',
      isFreeProduct: false,
      image: '🚀',
      serviceType: 'Influencer'
    },
    {
      id: 9,
      title: 'Sponsored Content Creation',
      creator: '@content_king',
      avatar: '👑',
      location: 'Miami, USA',
      audience: '950k',
      platform: 'YouTube',
      platformIcon: 'play-circle-filled',
      price: '$750',
      isFreeProduct: false,
      image: '📸',
      serviceType: 'Influencer'
    },
    {
      id: 10,
      title: 'Social Media Takeover',
      creator: '@social_star',
      avatar: '✨',
      location: 'Chicago, USA',
      audience: '1.1M',
      platform: 'Instagram',
      platformIcon: 'camera-alt',
      price: '$550',
      isFreeProduct: false,
      image: '📱',
      serviceType: 'Influencer'
    },
    {
      id: 11,
      title: 'Event Coverage & Promotion',
      creator: '@event_pro',
      avatar: '🎪',
      location: 'Vegas, USA',
      audience: '680k',
      platform: 'TikTok',
      platformIcon: 'music-note',
      price: '$450',
      isFreeProduct: false,
      image: '🎬',
      serviceType: 'Influencer'
    },
    {
      id: 12,
      title: 'Brand Ambassador Program',
      creator: '@ambassador_plus',
      avatar: '🌟',
      location: 'Seattle, USA',
      audience: '2.2M',
      platform: 'YouTube',
      platformIcon: 'play-circle-filled',
      price: '$1000',
      isFreeProduct: false,
      image: '💼',
      serviceType: 'Influencer'
    }
  ];

  const handleServiceTypePress = (type) => {
    setSelectedServiceType(type);
  };

  const handleFreeProductsToggle = () => {
    setFreeProductsOnly(!freeProductsOnly);
  };

  const handleFiltersPress = () => {
    setShowFilters(!showFilters);
  };

  const filterOptions = {
    platform: ['All', 'Instagram', 'YouTube', 'TikTok', 'Blog'],
    priceRange: ['All', 'Under $100', '$100 - $300', '$300 - $500', 'Over $500', 'Free Products'],
    location: ['All', 'CA, USA', 'NY, USA', 'CO, USA', 'FL, USA', 'TX, USA', 'NV, USA', 'LA, USA', 'Miami, USA', 'Chicago, USA', 'Vegas, USA', 'Seattle, USA'],
    audience: ['All', 'Under 100k', '100k - 500k', '500k - 1M', 'Over 1M']
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
      location: 'All',
      audience: 'All'
    });
    setFreeProductsOnly(false);
  };

  const filteredOffers = offers.filter(offer => {
    // Service type filter (Creator or Influencer)
    if (offer.serviceType !== selectedServiceType) return false;
    
    // Search filter
    if (searchText && !offer.title.toLowerCase().includes(searchText.toLowerCase()) && 
        !offer.creator.toLowerCase().includes(searchText.toLowerCase())) return false;
    
    // Free products filter
    if (freeProductsOnly && !offer.isFreeProduct) return false;
    
    // Platform filter
    if (selectedFilters.platform !== 'All' && offer.platform !== selectedFilters.platform) return false;
    
    // Price range filter
    if (selectedFilters.priceRange !== 'All') {
      if (selectedFilters.priceRange === 'Free Products' && !offer.isFreeProduct) return false;
      if (selectedFilters.priceRange === 'Under $100' && (offer.isFreeProduct || parseInt(offer.price.replace('$', '')) >= 100)) return false;
      if (selectedFilters.priceRange === '$100 - $300' && (offer.isFreeProduct || parseInt(offer.price.replace('$', '')) < 100 || parseInt(offer.price.replace('$', '')) > 300)) return false;
      if (selectedFilters.priceRange === '$300 - $500' && (offer.isFreeProduct || parseInt(offer.price.replace('$', '')) < 300 || parseInt(offer.price.replace('$', '')) > 500)) return false;
      if (selectedFilters.priceRange === 'Over $500' && (offer.isFreeProduct || parseInt(offer.price.replace('$', '')) <= 500)) return false;
    }
    
    // Location filter
    if (selectedFilters.location !== 'All' && offer.location !== selectedFilters.location) return false;
    
    // Audience filter
    if (selectedFilters.audience !== 'All') {
      const audienceNum = parseInt(offer.audience.replace(/[kM]/g, '')) * (offer.audience.includes('M') ? 1000 : 1);
      if (selectedFilters.audience === 'Under 100k' && audienceNum >= 100) return false;
      if (selectedFilters.audience === '100k - 500k' && (audienceNum < 100 || audienceNum > 500)) return false;
      if (selectedFilters.audience === '500k - 1M' && (audienceNum < 500 || audienceNum > 1000)) return false;
      if (selectedFilters.audience === 'Over 1M' && audienceNum <= 1000) return false;
    }
    
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation?.openDrawer?.()}
          >
            <MaterialIcons name="menu" size={24} color="#2d3748" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Explore Offers</Text>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation?.navigate('Notifications')}
          >
            <MaterialIcons name="notifications" size={24} color="#2d3748" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for services..."
              placeholderTextColor="#9ca3af"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Service Type Selection */}
        <View style={styles.serviceTypeContainer}>
          <TouchableOpacity
            style={[
              styles.serviceTypeButton,
              selectedServiceType === 'Creator' && styles.serviceTypeButtonSelected
            ]}
            onPress={() => handleServiceTypePress('Creator')}
          >
            <Text style={[
              styles.serviceTypeText,
              selectedServiceType === 'Creator' && styles.serviceTypeTextSelected
            ]}>
              Creator Services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.serviceTypeButton,
              selectedServiceType === 'Influencer' && styles.serviceTypeButtonSelected
            ]}
            onPress={() => handleServiceTypePress('Influencer')}
          >
            <Text style={[
              styles.serviceTypeText,
              selectedServiceType === 'Influencer' && styles.serviceTypeTextSelected
            ]}>
              Influencer Services
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Options */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={handleFreeProductsToggle}>
            <View style={[styles.checkbox, freeProductsOnly && styles.checkboxSelected]}>
              {freeProductsOnly && <MaterialIcons name="check" size={16} color="#ffffff" />}
            </View>
            <Text style={styles.checkboxText}>Free Products Only</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.allFiltersButton} onPress={handleFiltersPress}>
            <MaterialIcons name="tune" size={16} color="#6b7280" />
            <Text style={styles.allFiltersText}>All Filters</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Dropdown */}
        {showFilters && (
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

            {/* Location Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Location</Text>
              <View style={styles.filterOptions}>
                {filterOptions.location.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterOption,
                      selectedFilters.location === option && styles.filterOptionSelected
                    ]}
                    onPress={() => selectFilterOption('location', option)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      selectedFilters.location === option && styles.filterOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Audience Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Audience Size</Text>
              <View style={styles.filterOptions}>
                {filterOptions.audience.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterOption,
                      selectedFilters.audience === option && styles.filterOptionSelected
                    ]}
                    onPress={() => selectFilterOption('audience', option)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      selectedFilters.audience === option && styles.filterOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Apply Filters Button */}
            <TouchableOpacity style={styles.applyFiltersButton} onPress={() => setShowFilters(false)}>
              <Text style={styles.applyFiltersText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Offers Grid */}
        <View style={styles.offersGrid}>
          {filteredOffers.map((offer) => (
            <TouchableOpacity 
              key={offer.id} 
              style={styles.offerCard}
              onPress={() => navigation?.navigate('CampaignDetails', { campaign: offer })}
            >
              {/* Offer Image */}
              <View style={styles.offerImageContainer}>
                <Text style={styles.offerImage}>{offer.image}</Text>
              </View>

              {/* Offer Title */}
              <Text style={styles.offerTitle} numberOfLines={2}>{offer.title}</Text>

              {/* Creator Profile */}
              <View style={styles.creatorProfile}>
                <View style={styles.creatorAvatar}>
                  <Text style={styles.creatorAvatarText}>{offer.avatar}</Text>
                </View>
                <Text style={styles.creatorHandle}>{offer.creator}</Text>
              </View>

              {/* Location & Audience */}
              <View style={styles.locationAudience}>
                <View style={styles.locationItem}>
                  <MaterialIcons name="location-on" size={14} color="#6b7280" />
                  <Text style={styles.locationText}>{offer.location}</Text>
                </View>
                <View style={styles.audienceItem}>
                  <MaterialIcons name="people" size={14} color="#6b7280" />
                  <Text style={styles.audienceText}>{offer.audience}</Text>
                </View>
              </View>

              {/* Platform & Price */}
              <View style={styles.platformPrice}>
                <View style={styles.platformContainer}>
                  <MaterialIcons name={offer.platformIcon} size={16} color="#6b7280" />
                  <Text style={styles.platformText}>{offer.platform}</Text>
                </View>
                <View style={styles.priceContainer}>
                  {offer.isFreeProduct ? (
                    <Text style={styles.freeProductText}>Free Product</Text>
                  ) : (
                    <Text style={styles.priceText}>{offer.price}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2d3748',
    marginLeft: 12,
  },
  serviceTypeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  serviceTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  serviceTypeButtonSelected: {
    backgroundColor: '#464FE5',
  },
  serviceTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  serviceTypeTextSelected: {
    color: '#ffffff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: '#464FE5',
    borderColor: '#464FE5',
  },
  checkboxText: {
    fontSize: 14,
    color: '#2d3748',
    fontWeight: '500',
  },
  allFiltersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  allFiltersText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 6,
    fontWeight: '500',
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
  offersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  offerCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  offerImageContainer: {
    height: 120,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  offerImage: {
    fontSize: 48,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
    lineHeight: 18,
  },
  creatorProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  creatorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  creatorAvatarText: {
    fontSize: 12,
  },
  creatorHandle: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  locationAudience: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    fontSize: 10,
    color: '#6b7280',
    marginLeft: 4,
  },
  audienceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  audienceText: {
    fontSize: 10,
    color: '#6b7280',
    marginLeft: 4,
  },
  platformPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  platformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  platformText: {
    fontSize: 10,
    color: '#6b7280',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#464FE5',
  },
  freeProductText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10b981',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
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
  navTextActive: {
    color: '#464FE5',
  },
});

export default ExploreOffers;

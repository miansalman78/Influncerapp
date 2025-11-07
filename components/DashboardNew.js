import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, FlatList, Image } from 'react-native';
import Drawer from './Drawer';

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

const DashboardNew = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [bookmarkedInfluencers, setBookmarkedInfluencers] = useState(new Set());
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortBy, setSortBy] = useState('followers');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState('Brand'); // DashboardNew is for Brand role

  const categories = ['All', 'Fashion', 'Beauty', 'Lifestyle'];

  const featuredCreators = [
    {
      id: 1,
      name: 'Jessie Alvarado',
      category: 'Fashion & Beauty',
      followers: '1.2M',
      engagement: '8.5%',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      category: 'Lifestyle',
      followers: '850K',
      engagement: '7.2%',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      category: 'Beauty',
      followers: '654K',
      engagement: '7.2%',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Marcus Chen',
      category: 'Tech',
      followers: '1.1M',
      engagement: '9.8%',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Sofia Rodriguez',
      category: 'Fitness',
      followers: '423K',
      engagement: '11.2%',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const trendingInfluencers = [
    {
      id: 1,
      name: 'Emma Wilson',
      username: '@emma_wilson',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      tags: ['Beauty', 'Lifestyle', 'Influencer'],
      tagColors: ['#fce7f3', '#f3e8ff', '#dcfce7'],
      followers: '654K',
      engagement: '7.2%',
      rating: '4.9',
      socialStats: {
        instagram: '456K',
        tiktok: '198K',
        youtube: '89K'
      }
    },
    {
      id: 2,
      name: 'Marcus Chen',
      username: '@marcus_chen',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      tags: ['Tech', 'Gaming', 'Creator'],
      tagColors: ['#dbeafe', '#dcfce7', '#fef3c7'],
      followers: '1.1M',
      engagement: '9.8%',
      rating: '4.7',
      socialStats: {
        youtube: '789K',
        tiktok: '312K',
        twitch: '156K'
      }
    },
    {
      id: 3,
      name: 'Sofia Rodriguez',
      username: '@sofia_fitness',
      location: 'Miami, FL',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      tags: ['Fitness', 'Health', 'Influencer'],
      tagColors: ['#dcfce7', '#fef3c7', '#dcfce7'],
      followers: '423K',
      engagement: '11.2%',
      rating: '4.6',
      socialStats: {
        instagram: '298K',
        tiktok: '125K'
      }
    }
  ];

  const handleMenu = () => {
    setIsDrawerOpen(true);
  };

  // Enhanced navigation with drawer control
  const enhancedNavigation = {
    ...navigation,
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
  };

  const handleNotification = () => {
    // Navigate to notifications screen
    navigation?.navigate('Notifications');
  };

  const handleProfile = () => {
    navigation?.navigate('CreatorProfile');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    // You can add search logic here to filter influencers
    // const filteredInfluencers = trendingInfluencers.filter(influencer => 
    //   influencer.name.toLowerCase().includes(text.toLowerCase()) ||
    //   influencer.username.toLowerCase().includes(text.toLowerCase()) ||
    //   influencer.tags.some(tag => tag.toLowerCase().includes(text.toLowerCase()))
    // );
  };

  const handleViewAll = () => {
    // Navigate to ExploreOffers to see all creators/offers
    navigation?.navigate('ExploreOffers');
  };

  const handleFilter = () => {
    setShowFilterModal(true);
  };

  const handleSortBy = (sort) => {
    setSortBy(sort);
    setShowFilterModal(false);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
    setShowFilterModal(false);
  };

  const handleFilterLocation = (location) => {
    setFilterLocation(location);
    setShowFilterModal(false);
  };

  const handleClearFilters = () => {
    setSortBy('followers');
    setFilterCategory('All');
    setFilterLocation('All');
    setShowFilterModal(false);
  };

  const handleBookmark = (influencerId) => {
    const newBookmarks = new Set(bookmarkedInfluencers);
    if (newBookmarks.has(influencerId)) {
      newBookmarks.delete(influencerId);
      alert('Removed from bookmarks');
    } else {
      newBookmarks.add(influencerId);
      alert('Added to bookmarks');
    }
    setBookmarkedInfluencers(newBookmarks);
  };

  const handleViewProfile = (influencerId) => {
    // Navigate to creator profile
    navigation?.navigate('CreatorProfile', { influencerId });
  };

  const renderFeaturedCreator = ({ item }) => (
    <View style={styles.featuredCard}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.featuredContent}>
        <Text style={styles.featuredName}>{item.name}</Text>
        <Text style={styles.featuredCategory}>{item.category}</Text>
        <View style={styles.featuredStats}>
          <View style={styles.featuredStatItem}>
            <Text style={styles.featuredStatLabel}>Followers</Text>
            <Text style={styles.featuredStatValue}>{item.followers}</Text>
          </View>
          <View style={styles.featuredStatItem}>
            <Text style={styles.featuredStatLabel}>Engagement</Text>
            <Text style={styles.featuredStatValue}>{item.engagement}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => navigation?.navigate('CreatorProfile', { influencerId: item.id })}
        >
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTrendingInfluencer = ({ item }) => (
    <View style={styles.trendingCard}>
      <View style={styles.trendingHeader}>
        <View style={styles.trendingProfile}>
          <Image source={{ uri: item.image }} style={styles.trendingImage} />
          <View style={styles.trendingInfo}>
            <Text style={styles.trendingName}>{item.name}</Text>
            <Text style={styles.trendingUsername}>{item.username}</Text>
            <View style={styles.trendingLocation}>
              <MaterialIcons name="location-on" size={14} color="#6b7280" />
              <Text style={styles.trendingLocationText}>{item.location}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.bookmarkButton} 
          onPress={() => handleBookmark(item.id)}
        >
          <MaterialIcons 
            name={bookmarkedInfluencers.has(item.id) ? "bookmark" : "bookmark-border"} 
            size={20} 
            color="#6b7280" 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.trendingTags}>
        {item.tags.map((tag, index) => (
          <View key={index} style={[styles.trendingTag, { backgroundColor: item.tagColors[index] }]}>
            <Text style={styles.trendingTagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.trendingStats}>
        <View style={styles.trendingStatItem}>
          <Text style={styles.trendingStatValue}>{item.followers}</Text>
          <Text style={styles.trendingStatLabel}>Followers</Text>
        </View>
        <View style={styles.trendingStatItem}>
          <Text style={styles.trendingStatValue}>{item.engagement}</Text>
          <Text style={styles.trendingStatLabel}>Engagement</Text>
        </View>
        <View style={styles.trendingStatItem}>
          <Text style={styles.trendingStatValue}>{item.rating}</Text>
          <Text style={styles.trendingStatLabel}>Rating</Text>
        </View>
      </View>

      <View style={styles.socialStats}>
        {Object.entries(item.socialStats).map(([platform, count]) => (
          <View key={platform} style={styles.socialStatItem}>
            <MaterialIcons 
              name={platform === 'instagram' ? 'camera-alt' : platform === 'tiktok' ? 'music-note' : platform === 'youtube' ? 'play-circle-outline' : 'gamepad'} 
              size={16} 
              color="#6b7280" 
            />
            <Text style={styles.socialStatText}>{count}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.viewProfileButton} 
        onPress={() => handleViewProfile(item.id)}
      >
        <Text style={styles.viewProfileButtonText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={handleMenu}>
            <MaterialIcons name="menu" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton} onPress={handleNotification}>
              <MaterialIcons name="notifications" size={24} color="#374151" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton} onPress={handleProfile}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }} 
                style={styles.profileImage} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Find Influencers Section */}
        <View style={styles.findSection}>
          <Text style={styles.findTitle}>Find Influencers</Text>
          <Text style={styles.findSubtitle}>Discover creators for your brand</Text>
          
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search influencers, categories..."
              placeholderTextColor="#9ca3af"
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {/* Category Filters */}
        <View style={styles.filtersSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterChip,
                  selectedCategory === category && styles.filterChipSelected
                ]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedCategory === category && styles.filterChipTextSelected
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Creators */}
        <View style={styles.featuredSection}>
          <View style={styles.featuredHeader}>
            <Text style={styles.featuredTitle}>Featured Creators</Text>
            <TouchableOpacity onPress={handleViewAll}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredCreators}
            renderItem={renderFeaturedCreator}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Trending Now */}
        <View style={styles.trendingSection}>
          <View style={styles.trendingHeader}>
            <Text style={styles.trendingTitle}>Trending Now</Text>
            <TouchableOpacity onPress={handleFilter}>
              <MaterialIcons name="tune" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={trendingInfluencers}
            renderItem={renderTrendingInfluencer}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.trendingList}
          />
        </View>
      </ScrollView>

      {/* Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navigation={navigation}
        userRole={userRole}
        currentScreen="DashboardNew"
      />

      {/* Filter Modal */}
      {showFilterModal && (
        <View style={styles.filterModal}>
          <View style={styles.filterModalContent}>
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>Filter & Sort</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <MaterialIcons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Sort By</Text>
              <View style={styles.filterOptions}>
                {['followers', 'engagement', 'rating'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      sortBy === option && styles.filterOptionSelected
                    ]}
                    onPress={() => handleSortBy(option)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      sortBy === option && styles.filterOptionTextSelected
                    ]}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Category</Text>
              <View style={styles.filterOptions}>
                {['All', 'Fashion', 'Beauty', 'Lifestyle', 'Tech', 'Fitness'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      filterCategory === option && styles.filterOptionSelected
                    ]}
                    onPress={() => handleFilterCategory(option)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      filterCategory === option && styles.filterOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Location</Text>
              <View style={styles.filterOptions}>
                {['All', 'New York', 'San Francisco', 'Miami', 'Anywhere'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      filterLocation === option && styles.filterOptionSelected
                    ]}
                    onPress={() => handleFilterLocation(option)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      filterLocation === option && styles.filterOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterModalActions}>
              <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={() => setShowFilterModal(false)}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, styles.navItemActive]}
          onPress={() => navigation?.navigate('Dashboard')}
        >
          <MaterialIcons name="home" size={24} color="#464FE5" />
          <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation?.navigate('ExploreOffers')}
        >
          <MaterialIcons name="local-offer" size={24} color="#6b7280" />
          <Text style={styles.navText}>Offers</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation?.navigate('Messages')}
        >
          <MaterialIcons name="chat" size={24} color="#6b7280" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation?.navigate('ActiveOrders')}
        >
          <MaterialIcons name="shopping-bag" size={24} color="#6b7280" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation?.navigate('CreatorProfile')}
        >
          <MaterialIcons name="person" size={24} color="#6b7280" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    position: 'relative',
  },
  menuButton: {
    padding: 8,
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    position: 'absolute',
    right: 20,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#464FE5',
  },
  profileButton: {
    padding: 4,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  findSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  findTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  findSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  filtersSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  filtersScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: '#464FE5',
  },
  filterChipText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterChipTextSelected: {
    color: '#ffffff',
  },
  featuredSection: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  viewAllText: {
    fontSize: 14,
    color: '#464FE5',
    fontWeight: '600',
  },
  featuredList: {
    paddingRight: 16,
  },
  featuredCard: {
    width: 280,
    backgroundColor: '#464FE5',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  featuredContent: {
    flex: 1,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  featuredCategory: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 12,
  },
  featuredStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  featuredStatItem: {
    marginRight: 16,
  },
  featuredStatLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
    marginBottom: 2,
  },
  featuredStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  viewButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    fontSize: 14,
    color: '#464FE5',
    fontWeight: '600',
  },
  trendingSection: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  trendingList: {
    gap: 16,
  },
  trendingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  trendingProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  trendingImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  trendingInfo: {
    flex: 1,
  },
  trendingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  trendingUsername: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  trendingLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendingLocationText: {
    fontSize: 12,
    color: '#6b7280',
  },
  bookmarkButton: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendingTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  trendingTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendingTagText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  trendingStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  trendingStatItem: {
    alignItems: 'center',
  },
  trendingStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  trendingStatLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  socialStats: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  socialStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  socialStatText: {
    fontSize: 12,
    color: '#6b7280',
  },
  viewProfileButton: {
    backgroundColor: '#464FE5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  viewProfileButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    // Active state styling
  },
  navText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  navTextActive: {
    color: '#464FE5',
  },
  filterModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  filterModalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterOptionSelected: {
    backgroundColor: '#464FE5',
    borderColor: '#464FE5',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: '#ffffff',
  },
  filterModalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#464FE5',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default DashboardNew;

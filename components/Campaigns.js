import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';

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

const Campaigns = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedCampaigns, setBookmarkedCampaigns] = useState(new Set());

  const categories = ['All', 'Fashion', 'Tech', 'Beauty', 'Food'];

  const campaigns = [
    {
      id: 1,
      brandName: 'TechFlow',
      brandCategory: 'Technology',
      brandIcon: '💻',
      brandColor: '#464FE5',
      status: 'Open',
      statusColor: '#10b981',
      title: 'Smart Home Device Launch',
      description: 'Looking for tech influencers to showcase our new smart home ecosystem. Content should focus on ease of use and integration.',
      location: 'USA',
      followers: '10k+ Followers',
      platform: 'YouTube',
      platformIcon: 'play-circle-outline',
      budget: '$850',
      daysLeft: '5',
      applied: '12 applied',
      appliedIcon: 'group'
    },
    {
      id: 2,
      brandName: 'LuxeStyle',
      brandCategory: 'Fashion',
      brandIcon: '👑',
      brandColor: '#1f2937',
      status: 'Hot',
      statusColor: '#f59e0b',
      title: 'Summer Collection 2024',
      description: 'Promote our exclusive summer collection. Looking for fashion-forward creators with 50K+ followers.',
      location: 'Europe',
      followers: '50k+ Followers',
      platform: 'Instagram',
      platformIcon: 'camera-alt',
      budget: '$1,200',
      daysLeft: '3',
      applied: '28 applied',
      appliedIcon: 'group'
    },
    {
      id: 3,
      brandName: 'GlowNatural',
      brandCategory: 'Beauty',
      brandIcon: '🌿',
      brandColor: '#10b981',
      status: 'New',
      statusColor: '#464FE5',
      title: 'Skincare Routine Challenge',
      description: '30-day skincare challenge featuring our organic products. Perfect for beauty and wellness creators.',
      location: 'Anywhere',
      followers: '5k+ Followers',
      platform: 'TikTok',
      platformIcon: 'music-note',
      budget: '$650',
      daysLeft: '7',
      applied: '8 applied',
      appliedIcon: 'group'
    }
  ];

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      alert('Going back...');
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleBidNow = (campaign) => {
    navigation?.navigate('CampaignDetails', { campaign });
  };

  const handleBookmark = (campaignId) => {
    const newBookmarks = new Set(bookmarkedCampaigns);
    if (newBookmarks.has(campaignId)) {
      newBookmarks.delete(campaignId);
      alert('Removed from bookmarks');
    } else {
      newBookmarks.add(campaignId);
      alert('Added to bookmarks');
    }
    setBookmarkedCampaigns(newBookmarks);
  };

  const filteredCampaigns = selectedCategory === 'All' 
    ? campaigns 
    : campaigns.filter(campaign => campaign.brandCategory === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <MaterialIcons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Campaigns</Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation?.navigate('CreateCampaign')}
          >
            <MaterialIcons name="add" size={24} color="#464FE5" />
          </TouchableOpacity>
        </View>

        {/* Summary Statistics */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Active Campaigns</Text>
                <Text style={styles.summaryValue}>24</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Earnings</Text>
                <Text style={styles.summaryValue}>$12,450</Text>
              </View>
            </View>
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

        {/* Campaigns List */}
        <View style={styles.campaignsSection}>
          {filteredCampaigns.map((campaign) => (
            <TouchableOpacity 
              key={campaign.id} 
              style={styles.campaignCard}
              onPress={() => navigation?.navigate('CampaignDetails', { campaign })}
              activeOpacity={0.7}
            >
              {/* Campaign Header */}
              <View style={styles.campaignHeader}>
                <View style={styles.brandInfo}>
                  <View style={[styles.brandIcon, { backgroundColor: campaign.brandColor }]}>
                    <Text style={styles.brandIconText}>{campaign.brandIcon}</Text>
                  </View>
                  <View style={styles.brandDetails}>
                    <Text style={styles.brandName}>{campaign.brandName}</Text>
                    <Text style={styles.brandCategory}>{campaign.brandCategory}</Text>
                  </View>
                </View>
                <View style={[styles.statusTag, { backgroundColor: campaign.statusColor + '20' }]}>
                  <Text style={[styles.statusText, { color: campaign.statusColor }]}>
                    {campaign.status}
                  </Text>
                </View>
              </View>

              {/* Campaign Content */}
              <Text style={styles.campaignTitle}>{campaign.title}</Text>
              <Text style={styles.campaignDescription}>{campaign.description}</Text>

              {/* Campaign Details */}
              <View style={styles.campaignDetails}>
                <View style={styles.detailItem}>
                  <MaterialIcons name="location-on" size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{campaign.location}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name="group" size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{campaign.followers}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name={campaign.platformIcon} size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{campaign.platform}</Text>
                </View>
              </View>

              {/* Campaign Metrics */}
              <View style={styles.campaignMetrics}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Budget</Text>
                  <Text style={styles.metricValue}>{campaign.budget}</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Days left</Text>
                  <Text style={styles.metricValue}>{campaign.daysLeft}</Text>
                </View>
                <View style={styles.metricItem}>
                  <MaterialIcons name={campaign.appliedIcon} size={16} color="#6b7280" />
                  <Text style={styles.metricText}>{campaign.applied}</Text>
                </View>
              </View>

              {/* Campaign Actions */}
              <View style={styles.campaignActions}>
                <TouchableOpacity 
                  style={styles.bidButton} 
                  onPress={(e) => {
                    e.stopPropagation();
                    handleBidNow(campaign);
                  }}
                >
                  <MaterialIcons name="send" size={16} color="#ffffff" />
                  <Text style={styles.bidButtonText}>Bid Now</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.bookmarkButton} 
                  onPress={(e) => {
                    e.stopPropagation();
                    handleBookmark(campaign.id);
                  }}
                >
                  <MaterialIcons 
                    name={bookmarkedCampaigns.has(campaign.id) ? "bookmark" : "bookmark-border"} 
                    size={20} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#6b7280" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="local-offer" size={24} color="#6b7280" />
          <Text style={styles.navText}>Offers</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="chat" size={24} color="#6b7280" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="shopping-bag" size={24} color="#6b7280" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  placeholder: {
    width: 40,
  },
  createButton: {
    padding: 4,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summarySection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  summaryCard: {
    backgroundColor: '#464FE5',
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  filtersSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  campaignsSection: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  campaignCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  brandInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  brandIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  brandIconText: {
    fontSize: 16,
  },
  brandDetails: {
    flex: 1,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  brandCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  campaignDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  campaignDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  campaignMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  metricText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  campaignActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bidButton: {
    flex: 1,
    backgroundColor: '#464FE5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
    gap: 8,
  },
  bidButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  bookmarkButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
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
  navText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});

export default Campaigns;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';

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

const { width } = Dimensions.get('window');

const CreatorProfile = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Portfolio');
  const [isConnected, setIsConnected] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleConnect = () => {
    if (isConnected) {
      setIsConnected(false);
      alert('Disconnected from Jessie Alvarado');
    } else {
      setIsConnected(true);
      alert('Successfully connected to Jessie Alvarado!');
    }
  };

  const handleMessage = () => {
    navigation?.navigate('Messages');
  };

  const handleSocialConnect = (platform) => {
    alert(`Connecting to ${platform}...`);
    // Open social media app or profile
  };

  const handleSendProposals = () => {
    navigation?.navigate('Proposals');
  };

  const handleDrawer = () => {
    if (navigation?.openDrawer) {
      navigation.openDrawer();
    }
  };

  const handleMenu = () => {
    setShowShareModal(true);
  };

  const handleShare = () => {
    setShowShareModal(false);
    alert('Profile shared successfully!');
  };

  const handleReport = () => {
    setShowShareModal(false);
    setShowReportModal(true);
  };

  const handleReportSubmit = () => {
    setShowReportModal(false);
    alert('Report submitted. Thank you for your feedback.');
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    alert(isFollowing ? 'Unfollowed Jessie Alvarado' : 'Following Jessie Alvarado');
  };

  const handlePortfolioItem = (item) => {
    alert(`Opening ${item}...`);
  };

  const handleReviewPress = () => {
    navigation?.navigate('Reviews', { returnScreen: 'CreatorProfile' });
  };

  const handleInsightPress = (insight) => {
    alert(`Viewing ${insight} insights...`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Background Image */}
        <View style={styles.headerSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXQlMjBnaXJsfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000' }}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          
          {/* Navigation Icons */}
          <View style={styles.navIcons}>
            <TouchableOpacity style={styles.backButton} onPress={handleDrawer}>
              <MaterialIcons name="menu" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={handleMenu}>
              <MaterialIcons name="more-vert" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Social Media Icons Sidebar */}
          <View style={styles.socialSidebar}>
            <TouchableOpacity style={styles.socialIcon} onPress={() => handleSocialConnect('Instagram')}>
              <MaterialIcons name="camera-alt" size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon} onPress={() => handleSocialConnect('TikTok')}>
              <MaterialIcons name="music-note" size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon} onPress={() => handleSocialConnect('YouTube')}>
              <MaterialIcons name="play-circle-outline" size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon} onPress={() => handleSocialConnect('Website')}>
              <MaterialIcons name="link" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Dark Overlay for Profile Info */}
          <View style={styles.darkOverlay}>
            {/* Profile Card */}
            <View style={styles.profileCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' }}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Jessie Alvarado</Text>
                <Text style={styles.profileUsername}>@jessie_alvarado</Text>
                <View style={styles.locationContainer}>
                  <MaterialIcons name="location-on" size={16} color="#ffffff" />
                  <Text style={styles.locationText}>Los Angeles, CA</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Tags, Metrics & Actions Section */}
        <View style={styles.metricsSection}>
          {/* Tags */}
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <MaterialIcons name="local-florist" size={16} color="#ffffff" />
              <Text style={styles.tagText}>Fashion & Beauty</Text>
            </View>
            <View style={[styles.tag, styles.tagGreen]}>
              <MaterialIcons name="star" size={16} color="#ffffff" />
              <Text style={styles.tagText}>Influencer</Text>
            </View>
          </View>

          {/* Statistics */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.2M</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>89.5%</Text>
              <Text style={styles.statLabel}>Engagement</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.connectButton, isConnected && styles.connectedButton]} 
              onPress={handleConnect}
            >
              <Text style={styles.connectButtonText}>
                {isConnected ? 'Connected' : 'Connect'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
              <MaterialIcons name="chat" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Media Reach Section */}
        <View style={styles.socialReachSection}>
          <Text style={styles.sectionTitle}>Social Media Reach</Text>
          
          {/* Instagram Card */}
          <View style={styles.socialCard}>
            <View style={styles.socialCardHeader}>
              <View style={styles.socialIconContainer}>
                <MaterialIcons name="camera-alt" size={24} color="#E4405F" />
              </View>
              <View style={styles.socialInfo}>
                <Text style={styles.socialPlatform}>Instagram</Text>
                <Text style={styles.socialHandle}>@jessie_alvarado</Text>
                <Text style={styles.socialFollowers}>856K followers</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.socialConnectButton} 
              onPress={() => handleSocialConnect('Instagram')}
            >
              <Text style={styles.socialConnectText}>Connect</Text>
            </TouchableOpacity>
          </View>

          {/* TikTok Card */}
          <View style={styles.socialCard}>
            <View style={styles.socialCardHeader}>
              <View style={styles.socialIconContainer}>
                <MaterialIcons name="music-note" size={24} color="#000000" />
              </View>
              <View style={styles.socialInfo}>
                <Text style={styles.socialPlatform}>TikTok</Text>
                <Text style={styles.socialHandle}>@jessie.alvarado</Text>
                <Text style={styles.socialFollowers}>324K followers</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.socialConnectButton} 
              onPress={() => handleSocialConnect('TikTok')}
            >
              <Text style={styles.socialConnectText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Me Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>
            Fashion & beauty content creator passionate about sustainable fashion and empowering women. 
            Collaborating with brands that align with my values and aesthetic.
          </Text>
          <View style={styles.hashtagContainer}>
            <View style={[styles.hashtag, styles.hashtagBlue]}>
              <Text style={styles.hashtagText}>#Fashion</Text>
            </View>
            <View style={[styles.hashtag, styles.hashtagPink]}>
              <Text style={styles.hashtagText}>#Beauty</Text>
            </View>
            <View style={[styles.hashtag, styles.hashtagGreen]}>
              <Text style={styles.hashtagText}>#Lifestyle</Text>
            </View>
          </View>
        </View>

        {/* Audience Insights Section */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Audience Insights</Text>
          
          {/* Top Locations */}
          <View style={styles.insightItem}>
            <Text style={styles.insightSubtitle}>Top Locations</Text>
            <Text style={styles.insightDescription}>Based on followers</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>United States</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, styles.progressBlue, { width: '45%' }]} />
                </View>
                <Text style={styles.progressPercent}>45%</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Canada</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, styles.progressGreen, { width: '22%' }]} />
                </View>
                <Text style={styles.progressPercent}>22%</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>United Kingdom</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, styles.progressPurple, { width: '18%' }]} />
                </View>
                <Text style={styles.progressPercent}>18%</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Australia</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, styles.progressOrange, { width: '15%' }]} />
                </View>
                <Text style={styles.progressPercent}>15%</Text>
              </View>
            </View>
          </View>

          {/* Gender Distribution */}
          <View style={styles.insightItem}>
            <Text style={styles.insightSubtitle}>Gender Distribution</Text>
            <Text style={styles.insightDescription}>Based on followers</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Female</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, styles.progressPink, { width: '68%' }]} />
                </View>
                <Text style={styles.progressPercent}>68%</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Male</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, styles.progressBlue, { width: '32%' }]} />
                </View>
                <Text style={styles.progressPercent}>32%</Text>
              </View>
            </View>
          </View>

          {/* Summary Cards */}
          <View style={styles.summaryCards}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryText}>Age Group 18-34 (72%)</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryText}>Avg Views 125K</Text>
            </View>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <TouchableOpacity 
            style={styles.reviewsHeader}
            onPress={handleReviewPress}
          >
            <Text style={styles.sectionTitle}>Reviews (24)</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={20} color="#fbbf24" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image 
                source={{ uri: 'https://media.istockphoto.com/id/1134068203/photo/glowing-face-of-beautiful-girl.jpg?s=612x612&w=0&k=20&c=mKR9jMPgzSJ3Rhpkk_avTMW4eZ12iGLVAqq38Ch9mTo=' }}
                style={styles.reviewerImage}
              />
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewerName}>Sarah M.</Text>
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <MaterialIcons key={star} name="star" size={16} color="#fbbf24" />
                  ))}
                </View>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Amazing collaboration! Professional, creative, and delivered exactly what we needed."
            </Text>
          </View>
        </View>

        {/* Portfolio Section */}
        <View style={styles.portfolioSection}>
          <View style={styles.portfolioTabs}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'Info' && styles.activeTab]}
              onPress={() => setActiveTab('Info')}
            >
              <Text style={[styles.tabText, activeTab === 'Info' && styles.activeTabText]}>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'Portfolio' && styles.activeTab]}
              onPress={() => setActiveTab('Portfolio')}
            >
              <Text style={[styles.tabText, activeTab === 'Portfolio' && styles.activeTabText]}>Portfolio</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'Portfolio' && (
            <View style={styles.portfolioGrid}>
              <TouchableOpacity 
                style={styles.portfolioItem} 
                onPress={() => handlePortfolioItem('Photo 1')}
              >
                <Image 
                  source={{ uri: 'https://media.istockphoto.com/id/1134068203/photo/glowing-face-of-beautiful-girl.jpg?s=612x612&w=0&k=20&c=mKR9jMPgzSJ3Rhpkk_avTMW4eZ12iGLVAqq38Ch9mTo=' }}
                  style={styles.portfolioImage}
                />
                <View style={styles.portfolioTag}>
                  <Text style={styles.portfolioTagText}>Photo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.portfolioItem} 
                onPress={() => handlePortfolioItem('Video 1')}
              >
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' }}
                  style={styles.portfolioImage}
                />
                <View style={styles.portfolioTag}>
                  <Text style={styles.portfolioTagText}>Video</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.portfolioItem} 
                onPress={() => handlePortfolioItem('Photo 2')}
              >
                <Image 
                  source={{ uri: 'https://photoswala.net/wp-content/uploads/2025/04/girl-dp_9.jpg' }}
                  style={styles.portfolioImage}
                />
                <View style={styles.portfolioTag}>
                  <Text style={styles.portfolioTagText}>Photo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.portfolioItem} 
                onPress={() => handlePortfolioItem('Brand Campaign')}
              >
                <View style={styles.linkCard}>
                  <MaterialIcons name="link" size={24} color="#ffffff" />
                  <Text style={styles.linkText}>Brand Campaign Nike x Jessie</Text>
                </View>
                <View style={styles.portfolioTag}>
                  <Text style={styles.portfolioTagText}>Link</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Bottom Action Button */}
        <TouchableOpacity style={styles.bottomActionButton} onPress={handleSendProposals}>
          <Text style={styles.bottomActionText}>Send Proposals</Text>
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
  scrollContent: {
    paddingBottom: 100,
  },
  headerSection: {
    height: 450,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  navIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  backButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  socialSidebar: {
    position: 'absolute',
    left: 16,
    top: 80,
    zIndex: 2,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  darkOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
    paddingBottom: 20,
    zIndex: 3,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 4,
  },
  metricsSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
  },
  tagGreen: {
    backgroundColor: '#10b981',
  },
  tagText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  connectButton: {
    flex: 1,
    backgroundColor: '#464FE5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  connectedButton: {
    backgroundColor: '#10b981',
  },
  messageButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialReachSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  socialCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  socialCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  socialIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  socialInfo: {
    flex: 1,
  },
  socialPlatform: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  socialHandle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  socialFollowers: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  socialConnectButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  socialConnectText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  aboutSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  aboutText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hashtag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  hashtagBlue: {
    backgroundColor: '#dbeafe',
  },
  hashtagPink: {
    backgroundColor: '#fce7f3',
  },
  hashtagGreen: {
    backgroundColor: '#dcfce7',
  },
  hashtagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  insightsSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  insightItem: {
    marginBottom: 24,
  },
  insightSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  progressContainer: {
    gap: 8,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressLabel: {
    fontSize: 14,
    color: '#374151',
    width: 100,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressBlue: {
    backgroundColor: '#464FE5',
  },
  progressGreen: {
    backgroundColor: '#10b981',
  },
  progressPurple: {
    backgroundColor: '#8b5cf6',
  },
  progressOrange: {
    backgroundColor: '#f59e0b',
  },
  progressPink: {
    backgroundColor: '#ec4899',
  },
  progressPercent: {
    fontSize: 14,
    color: '#374151',
    width: 40,
    textAlign: 'right',
  },
  summaryCards: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  reviewsSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 4,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  portfolioSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  portfolioTabs: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#464FE5',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  portfolioItem: {
    width: (width - 44) / 2,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  portfolioImage: {
    width: '100%',
    height: '100%',
  },
  portfolioTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  portfolioTagText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  linkCard: {
    width: '100%',
    height: '100%',
    backgroundColor: '#464FE5',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  linkText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomActionButton: {
    backgroundColor: '#000000',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bottomActionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreatorProfile;

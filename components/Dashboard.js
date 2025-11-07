import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList, Dimensions } from 'react-native';

// Import MaterialIcons - handle both ES6 and CommonJS
let MaterialIcons;
try {
  const MaterialIconModule = require('react-native-vector-icons/MaterialIcons');
  MaterialIcons = MaterialIconModule.default || MaterialIconModule;
  // Verify it's a valid component
  if (typeof MaterialIcons !== 'function') {
    console.warn('MaterialIcons is not a function, creating fallback');
    MaterialIcons = ({ name, size, color, style }) => (
      <Text style={[{ fontSize: size || 20, color: color || '#000' }, style]}>?</Text>
    );
  }
} catch (error) {
  console.error('Error importing MaterialIcons:', error);
  // Fallback component
  MaterialIcons = ({ name, size, color, style }) => (
    <Text style={[{ fontSize: size || 20, color: color || '#000' }, style]}>?</Text>
  );
}

const { width } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const campaignData = [
    {
      id: 1,
      title: "EcoWear Summer Line",
      image: "https://images.unsplash.com/photo-1602423763918-6ae68bca77c8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMGltYWdlJTIweWVsbG93JTIwZHJlc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      platform: "TikTok",
      icon: "music-note",
      price: "$200 - $500",
      description: "Promote the new sustainable fashion line."
    },
    {
      id: 2,
      title: "TechGadg",
      image: "https://images.unsplash.com/photo-1650546321038-224b1ec3cce5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdpcmwlMjBpbWFnZSUyMHllbGxvdyUyMGRyZXNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      platform: "YouTube",
      icon: "play-circle-filled",
      price: "$300 - $800",
      description: "Create an unb review video."
    },
    {
      id: 3,
      title: "Fashion Forward",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
      platform: "Instagram",
      icon: "camera-alt",
      price: "$400 - $600",
      description: "Showcase latest fashion trends."
    }
  ];

  const renderCampaignItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.campaignBox}
      onPress={() => navigation?.navigate('CampaignDetails', { campaign: item })}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.campaignImage}
        resizeMode="cover"
      />
      <Text style={styles.campaignTitle}>{item.title}</Text>
      <View style={styles.campaignDetailRow}>
        <MaterialIcons name={item.icon} size={14} color="#464FE5" />
        <Text style={styles.campaignDetail}>{item.platform} • {item.price}</Text>
      </View>
      <Text style={styles.campaignDetailSmall}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with hamburger and bell */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.hamburger}
            onPress={() => navigation?.openDrawer?.()}
          >
            <MaterialIcons name="menu" size={24} color="#2d3748" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Dashboard</Text>
          <TouchableOpacity 
            style={styles.bell}
            onPress={() => navigation?.navigate('Notifications')}
          >
            <MaterialIcons name="notifications" size={24} color="#2d3748" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome{'\n'}back, Olivia!</Text>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMGltYWdlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000' }}
            style={styles.userImage}
          />
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={styles.statBox}
            onPress={() => navigation?.navigate('Wallet')}
          >
            <Text style={styles.statLabel}>Total Earnings</Text>
            <Text style={styles.statValue}>$12,403</Text>
          </TouchableOpacity>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Active Campaigns</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
        </View>

        {/* New Opportunities Section */}
        <View style={styles.opportunitiesSection}>
          <Text style={styles.sectionTitle}>NEW OPPORTUNITIES</Text>
          <Text style={styles.sectionSubtitle}>We have new brand campaigns!</Text>
          <View style={styles.campaignsContainer}>
            <FlatList
              ref={flatListRef}
              data={campaignData}
              renderItem={renderCampaignItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / (width * 0.8));
                setCurrentIndex(index);
              }}
              style={styles.campaignSlider}
              contentContainerStyle={styles.campaignSliderContent}
            />
            {/* Pagination Dots */}
            <View style={styles.paginationDots}>
              {campaignData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentIndex && styles.activeDot
                  ]}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => navigation?.navigate('ExploreOffers')}
          >
            <Text style={styles.viewButtonText}>View All Campaigns</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.viewButtonSecondary}
            onPress={() => navigation?.navigate('Proposals')}
          >
            <Text style={styles.viewButtonTextSecondary}>View My Offers</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Links Section */}
        <View style={styles.quickLinksSection}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.linksContainer}>
            <TouchableOpacity 
              style={styles.linkBox}
              onPress={() => navigation?.navigate('ActiveOrders')}
            >
              <View style={styles.linkMaterialIconsContainer}>
                <MaterialIcons name="shopping-basket" size={20} color="#464FE5" />
              </View>
              <Text style={styles.linkText}>My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkBox}
              onPress={() => navigation?.navigate('Messages')}
            >
              <View style={styles.linkMaterialIconsContainer}>
                <MaterialIcons name="headset" size={20} color="#464FE5" />
              </View>
              <Text style={styles.linkText}>Contact Support</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkBox}
              onPress={() => navigation?.navigate('Messages')}
            >
              <View style={styles.linkMaterialIconsContainer}>
                <MaterialIcons name="chat-bubble-outline" size={20} color="#464FE5" />
              </View>
              <Text style={styles.linkText}>Messages</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFuJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600' }}
              style={styles.activityImage}
            />
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>Brand X viewed your profile.</Text>
              <Text style={styles.time}>1h ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1614203586524-fee58ef9ef90?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbiUyMGltYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' }}
              style={styles.activityImage}
            />
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>New message from Brand Y.</Text>
              <Text style={styles.time}>3h ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="check-circle" size={16} color="#464FE5" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                Your content for "Summer Vibe" was <Text style={styles.activityTextApproved}>approved.</Text>
              </Text>
              <Text style={styles.time}>1d ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.iconCirclePayment}>
              <MaterialIcons name="attach-money" size={16} color="#fff" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>Payment of $500 sent.</Text>
              <Text style={styles.time}>2d ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>

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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  hamburger: {
    padding: 4,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  bell: {
    padding: 4,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5a67d8',
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    flex: 1,
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 0.45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  opportunitiesSection: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius:16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#464FE5',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 16,
  },
  campaignsContainer: {
    marginBottom: 16,
  },
  campaignSlider: {
    height: 200,
  },
  campaignSliderContent: {
    paddingHorizontal: 8,
  },
  campaignBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    width: width * 0.5,
    marginHorizontal: 8,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cbd5e0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#464FE5',
    width: 12,
    height: 8,
    borderRadius: 4,
  },
  campaignImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  campaignTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 4,
    textAlign: 'left',
  },
  campaignDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    justifyContent: 'flex-start',
  },
  campaignDetail: {
    fontSize: 12,
    color: '#718096',
    marginLeft: 4,
  },
  campaignDetailSmall: {
    fontSize: 11,
    color: '#718096',
    textAlign: 'left',
    lineHeight: 14,
  },
  viewButton: {
    backgroundColor: '#464fe5',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    
  },
  viewButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#464fe5',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  viewButtonTextSecondary: {
    color: '#464FE5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickLinksSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  linkMaterialIconsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  linkText: {
    fontSize: 12,
    color: '#2d3748',
    textAlign: 'center',
  },
  activitySection: {
    paddingHorizontal: 16,
    marginBottom: 100,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    marginTop: 2,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e9d5ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  iconCirclePayment: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#a78bfa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#2d3748',
    marginBottom: 4,
    lineHeight: 20,
  },
  activityTextApproved: {
    fontSize: 14,
    color: '#2d3748',
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#718096',
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

export default Dashboard;
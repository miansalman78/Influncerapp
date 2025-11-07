import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dashboard from '../Dashboard';
import ExploreOffers from '../ExploreOffers';
import Messages from '../Messages';
import Inbox from '../Inbox';
import ActiveOrders from '../ActiveOrders';
import CreatorProfile from '../CreatorProfile';
import Drawer from '../Drawer';

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

const AppNavigator = ({ navigation, route }) => {
  // Get initial tab from route params or default to 'Home'
  const initialTab = route?.params?.initialTab || navigation?.getParam?.('initialTab') || 'Home';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userRole, setUserRole] = useState('Creator'); // Can be 'Creator' or 'Brand'

  // Update activeTab when route params change
  useEffect(() => {
    const newInitialTab = route?.params?.initialTab || navigation?.getParam?.('initialTab');
    if (newInitialTab) {
      setActiveTab(newInitialTab);
    }
  }, [route?.params?.initialTab, navigation]);

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  // Create enhanced navigation that includes tab switching and drawer control
  const enhancedNavigation = {
    ...navigation,
    navigate: (screen, params) => {
      // If navigating to a tab screen, switch tabs
      if (screen === 'Dashboard') {
        setActiveTab('Home');
      } else if (screen === 'ExploreOffers') {
        setActiveTab('Offers');
      } else if (screen === 'Inbox') {
        setActiveTab('Messages');
      } else if (screen === 'ActiveOrders') {
        setActiveTab('Orders');
      } else if (screen === 'CreatorProfile') {
        setActiveTab('Profile');
      } else if (screen === 'Messages' && activeTab === 'Messages') {
        // If already on Messages tab and navigating to Messages detail, use main navigation
        navigation?.navigate(screen, params);
      } else if (screen === 'Messages') {
        // If not on Messages tab, switch to it
        setActiveTab('Messages');
      } else {
        // For other screens (like Notifications), use the main navigation
        // This ensures screenHistory is properly maintained
        navigation?.navigate(screen, params);
      }
    },
    goBack: () => {
      // Use main navigation's goBack to properly restore previous screen
      if (navigation?.goBack) {
        navigation.goBack();
      }
    },
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <Dashboard navigation={enhancedNavigation} />;
      case 'Offers':
        return <ExploreOffers navigation={enhancedNavigation} />;
      case 'Messages':
        return <Inbox navigation={enhancedNavigation} />;
      case 'Orders':
        return <ActiveOrders navigation={enhancedNavigation} />;
      case 'Profile':
        return <CreatorProfile navigation={enhancedNavigation} />;
      default:
        return <Dashboard navigation={enhancedNavigation} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
      
      {/* Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navigation={navigation}
        userRole={userRole}
        currentScreen={activeTab === 'Messages' ? 'Inbox' : activeTab === 'Home' ? 'Dashboard' : activeTab === 'Orders' ? 'ActiveOrders' : activeTab === 'Profile' ? 'CreatorProfile' : 'AppNavigator'}
      />
      
      {/* Bottom Tab Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleTabPress('Home')}
        >
          <MaterialIcons 
            name="home" 
            size={24} 
            color={activeTab === 'Home' ? '#464FE5' : '#64748b'} 
          />
          <Text style={[
            styles.navText, 
            activeTab === 'Home' && styles.navTextActive
          ]}>
            Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => {
            // Switch to Offers tab to show ExploreOffers screen
            handleTabPress('Offers');
          }}
        >
          <MaterialIcons 
            name="local-offer" 
            size={24} 
            color={activeTab === 'Offers' ? '#464FE5' : '#64748b'} 
          />
          <Text style={[
            styles.navText, 
            activeTab === 'Offers' && styles.navTextActive
          ]}>
            Offers
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleTabPress('Messages')}
        >
          <MaterialIcons 
            name="chat-bubble" 
            size={24} 
            color={activeTab === 'Messages' ? '#464FE5' : '#64748b'} 
          />
          <Text style={[
            styles.navText, 
            activeTab === 'Messages' && styles.navTextActive
          ]}>
            Messages
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleTabPress('Orders')}
        >
          <MaterialIcons 
            name="shopping-bag" 
            size={24} 
            color={activeTab === 'Orders' ? '#464FE5' : '#64748b'} 
          />
          <Text style={[
            styles.navText, 
            activeTab === 'Orders' && styles.navTextActive
          ]}>
            Orders
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleTabPress('Profile')}
        >
          <MaterialIcons 
            name="person" 
            size={24} 
            color={activeTab === 'Profile' ? '#464FE5' : '#64748b'} 
          />
          <Text style={[
            styles.navText, 
            activeTab === 'Profile' && styles.navTextActive
          ]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    flex: 1,
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
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
  },
  navTextActive: {
    color: '#464FE5',
    fontWeight: '600',
  },
});

export default AppNavigator;


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Animated, Dimensions } from 'react-native';

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

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

const Drawer = ({ isOpen, onClose, navigation, userRole = 'Creator', currentScreen = 'Dashboard' }) => {
  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleMenuItemPress = (screen) => {
    onClose();
    setTimeout(() => {
      // Pass userRole when navigating to Settings or EditProfile
      // Also pass returnScreen so we can navigate back to the screen that opened the drawer
      if (screen === 'Settings' || screen === 'EditProfile') {
        navigation?.navigate(screen, { role: userRole, returnScreen: currentScreen });
      } else {
        navigation?.navigate(screen, { returnScreen: currentScreen });
      }
    }, 300);
  };

  const handleSwitchRole = () => {
    onClose();
    setTimeout(() => {
      // If currently on DashboardNew (Brand), navigate to AppNavigator (which has Dashboard with bottom bar)
      // If currently on Dashboard/AppNavigator (Creator), navigate to DashboardNew
      if (currentScreen === 'DashboardNew') {
        // Switch from Brand to Creator - go to AppNavigator (has bottom bar)
        navigation?.navigate('AppNavigator');
      } else if (currentScreen === 'Dashboard' || currentScreen === 'AppNavigator') {
        // Switch from Creator to Brand - go to DashboardNew
        navigation?.navigate('DashboardNew');
      } else {
        // Default: navigate to DashboardNew
        navigation?.navigate('DashboardNew');
      }
    }, 300);
  };

  const handleLogout = () => {
    onClose();
    // TODO: Implement logout logic
    alert('Logging out...');
    navigation?.reset('Login');
  };

  const menuItems = [
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings',
      screen: 'Settings',
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-outline',
      screen: 'HelpSupport',
    },
    {
      id: 'reviews',
      title: 'Reviews',
      icon: 'star-outline',
      screen: 'Reviews',
    },
    {
      id: 'legal',
      title: 'Legal / Info',
      icon: 'info-outline',
      screen: 'LegalInfo',
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      
      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <SafeAreaView style={styles.drawerContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* User Info Card */}
            <View style={styles.userCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMGltYWdlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000' }}
                style={styles.userImage}
              />
              <Text style={styles.userName}>Olivia Smith</Text>
              <View style={styles.roleBadge}>
                <MaterialIcons name="verified" size={16} color="#10B981" />
                <Text style={styles.roleText}>{userRole}</Text>
              </View>
              <Text style={styles.userTagline}>Verified Creator</Text>
              
              {/* Action Buttons */}
              <View style={styles.userActions}>
                <TouchableOpacity
                  style={styles.userActionButton}
                  onPress={() => handleMenuItemPress('CreatorProfile')}
                >
                  <MaterialIcons name="person" size={18} color="#464FE5" />
                  <Text style={styles.userActionText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.userActionButton, styles.switchRoleButton]}
                  onPress={handleSwitchRole}
                >
                  <MaterialIcons name="swap-horiz" size={18} color="#464FE5" />
                  <Text style={styles.userActionText}>Switch Role</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuSection}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => handleMenuItemPress(item.screen)}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIconContainer}>
                      <MaterialIcons name={item.icon} size={24} color="#464FE5" />
                    </View>
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color="#CBD5E0" />
                </TouchableOpacity>
              ))}
              
              {/* Logout Button - Moved to Menu Section */}
              <TouchableOpacity
                style={[styles.menuItem, styles.logoutMenuItem]}
                onPress={handleLogout}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIconContainer, styles.logoutIconContainer]}>
                    <MaterialIcons name="logout" size={24} color="#EF4444" />
                  </View>
                  <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#CBD5E0" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#FFFFFF',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  drawerContent: {
    flex: 1,
  },
  userCard: {
    backgroundColor: '#F0F4FF',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 6,
  },
  userTagline: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  userActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  switchRoleButton: {
    borderColor: '#464FE5',
  },
  userActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#464FE5',
  },
  menuSection: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  logoutMenuItem: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  logoutIconContainer: {
    backgroundColor: '#FEE2E2',
  },
  logoutText: {
    color: '#EF4444',
  },
});

export default Drawer;


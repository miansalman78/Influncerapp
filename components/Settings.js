import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Switch, TextInput } from 'react-native';

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

const Settings = ({ navigation, route }) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  // Get user role from navigation params
  const userRole = route?.params?.role || navigation?.getParam?.('role') || 'Creator';

  const settingsSections = [
    {
      title: 'Account Settings',
      items: [
        {
          id: 'editProfile',
          label: 'Edit Profile',
          value: '',
          type: 'button',
          icon: 'edit',
          action: () => navigation?.navigate('EditProfile', { role: userRole }),
        },
        {
          id: 'email',
          label: 'Email',
          value: 'olivia.smith@example.com',
          type: 'text',
          icon: 'email',
        },
        {
          id: 'phone',
          label: 'Phone Number',
          value: '+1 (555) 123-4567',
          type: 'text',
          icon: 'phone',
        },
        {
          id: 'password',
          label: 'Password',
          value: '••••••••',
          type: 'button',
          icon: 'lock',
          action: () => alert('Change Password'),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          id: 'push',
          label: 'Push Notifications',
          value: pushNotifications,
          type: 'switch',
          onToggle: setPushNotifications,
        },
        {
          id: 'email',
          label: 'Email Notifications',
          value: emailNotifications,
          type: 'switch',
          onToggle: setEmailNotifications,
        },
        {
          id: 'sms',
          label: 'SMS Notifications',
          value: smsNotifications,
          type: 'switch',
          onToggle: setSmsNotifications,
        },
      ],
    },
    {
      title: 'Privacy',
      items: [
        {
          id: 'profile',
          label: 'Profile Visibility',
          value: 'Public',
          type: 'button',
          icon: 'visibility',
          action: () => alert('Change Profile Visibility'),
        },
        {
          id: 'data',
          label: 'Data Usage',
          value: 'Standard',
          type: 'button',
          icon: 'data-usage',
          action: () => alert('Manage Data Usage'),
        },
      ],
    },
    {
      title: 'Social Accounts',
      items: [
        {
          id: 'instagram',
          label: 'Instagram',
          value: 'Connected',
          type: 'button',
          icon: 'camera-alt',
          action: () => alert('Manage Instagram'),
        },
        {
          id: 'tiktok',
          label: 'TikTok',
          value: 'Connected',
          type: 'button',
          icon: 'music-note',
          action: () => alert('Manage TikTok'),
        },
        {
          id: 'youtube',
          label: 'YouTube',
          value: 'Not Connected',
          type: 'button',
          icon: 'play-circle-outline',
          action: () => alert('Connect YouTube'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          const returnScreen = route?.params?.returnScreen || navigation?.getParam?.('returnScreen');
          if (returnScreen === 'CreatorProfile') {
            navigation?.navigate('AppNavigator', { initialTab: 'Profile' });
          } else if (returnScreen === 'CreateOffer') {
            navigation?.navigate('CreateOffer');
          } else if (returnScreen === 'Inbox') {
            navigation?.navigate('AppNavigator', { initialTab: 'Messages' });
          } else if (returnScreen === 'ActiveOrders') {
            navigation?.navigate('AppNavigator', { initialTab: 'Orders' });
          } else if (navigation?.goBack) {
            navigation.goBack();
          }
        }}>
          <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingItem,
                    itemIndex === section.items.length - 1 && styles.settingItemLast,
                  ]}
                  onPress={item.action}
                  activeOpacity={item.type === 'button' ? 0.7 : 1}
                  disabled={item.type === 'switch' || item.type === 'text'}
                >
                  <View style={styles.settingItemLeft}>
                    {item.icon && (
                      <MaterialIcons
                        name={item.icon}
                        size={24}
                        color="#464FE5"
                        style={styles.settingIcon}
                      />
                    )}
                    <View style={styles.settingTextContainer}>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                      {item.type === 'text' && (
                        <Text style={styles.settingValue}>{item.value}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.settingItemRight}>
                    {item.type === 'switch' && (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#D1D5DB', true: '#464FE5' }}
                        thumbColor="#FFFFFF"
                      />
                    )}
                    {item.type === 'button' && (
                      <>
                        <Text style={styles.settingValueText}>{item.value}</Text>
                        <MaterialIcons name="chevron-right" size={24} color="#CBD5E0" />
                      </>
                    )}
                    {item.type === 'text' && (
                      <MaterialIcons name="chevron-right" size={24} color="#CBD5E0" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValueText: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
});

export default Settings;


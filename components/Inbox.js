import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';

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

const Inbox = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'EcoWear Co.',
      avatar: '🧑‍💼',
      lastMessage: 'Looking forward to working with you…',
      timestamp: '2h ago',
      unreadCount: 2,
      isUnread: true
    },
    {
      id: 2,
      name: 'Alex Doe',
      subtitle: 'Creator',
      avatar: '👩‍🎤',
      lastMessage: 'Sure! I\'ll send the proposal…',
      timestamp: '5h ago',
      unreadCount: 0,
      isUnread: false
    },
    {
      id: 3,
      name: 'TechGadget Inc.',
      avatar: '🧢',
      lastMessage: 'Offer accepted 🎉',
      timestamp: '1d ago',
      unreadCount: 0,
      isUnread: false
    },
    {
      id: 4,
      name: 'Fashion Forward',
      avatar: '👗',
      lastMessage: 'Can we schedule a call?',
      timestamp: '2d ago',
      unreadCount: 1,
      isUnread: true
    },
    {
      id: 5,
      name: 'Sarah Johnson',
      subtitle: 'Creator',
      avatar: '👩',
      lastMessage: 'Thanks for the opportunity!',
      timestamp: '3d ago',
      unreadCount: 0,
      isUnread: false
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    if (!searchText) return true;
    const searchLower = searchText.toLowerCase();
    return conv.name.toLowerCase().includes(searchLower) || 
           conv.lastMessage.toLowerCase().includes(searchLower);
  });

  const handleConversationPress = (conversation) => {
    navigation?.navigate('Messages', { conversation });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.drawerButton}
          onPress={() => navigation?.openDrawer?.()}
        >
          <MaterialIcons name="menu" size={24} color="#2d3748" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation?.navigate('Notifications', { returnScreen: 'Inbox' })}
        >
          <MaterialIcons name="notifications" size={24} color="#2d3748" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color="#9E9E9E" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search brand or creator..."
            placeholderTextColor="#9E9E9E"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Conversation List */}
      {filteredConversations.length > 0 ? (
        <ScrollView style={styles.conversationList} showsVerticalScrollIndicator={false}>
          {filteredConversations.map((conversation, index) => (
            <TouchableOpacity
              key={conversation.id}
              style={styles.conversationItem}
              onPress={() => handleConversationPress(conversation)}
              activeOpacity={0.7}
            >
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{conversation.avatar}</Text>
              </View>

              {/* Content */}
              <View style={styles.conversationContent}>
                <View style={styles.nameRow}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.conversationName} numberOfLines={1}>
                      {conversation.name}
                    </Text>
                    {conversation.subtitle && (
                      <Text style={styles.subtitle} numberOfLines={1}>
                        {conversation.subtitle}
                      </Text>
                    )}
                  </View>
                  <View style={styles.rightSection}>
                    <Text style={styles.timestamp}>{conversation.timestamp}</Text>
                    {conversation.isUnread && conversation.unreadCount > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>{conversation.unreadCount}</Text>
                      </View>
                    )}
                    {conversation.isUnread && conversation.unreadCount === 0 && (
                      <View style={styles.unreadDot} />
                    )}
                  </View>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {conversation.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        /* Empty State */
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>💬</Text>
          <Text style={styles.emptyStateTitle}>No messages yet</Text>
          <Text style={styles.emptyStateText}>
            Start by sending a proposal or accepting an offer.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  drawerButton: {
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
    backgroundColor: '#F6F6F6',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2d3748',
    marginLeft: 12,
  },
  conversationList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  conversationContent: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  nameContainer: {
    flex: 1,
    marginRight: 8,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#464FE5',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#464FE5',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Inbox;


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';

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

const ActiveOrders = ({ navigation, route }) => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      title: 'EcoWear Summer Line',
      company: 'by EcoWear Co.',
      status: 'In Progress',
      statusColor: '#fbbf24',
      progress: 75,
      dueDate: 'Due in 5 days',
      participants: [
        { name: 'John Doe', avatar: '👩' },
        { name: 'You', avatar: '👨' }
      ],
      actionText: 'Chat'
    },
    {
      id: 2,
      title: 'TechGadget Pro Review',
      company: 'by TechGadget Inc.',
      status: 'Awaiting Approval',
      statusColor: '#10b981',
      progress: 100,
      dueDate: 'Submitted Today',
      participants: [
        { name: 'Jane Smith', avatar: '👩' },
        { name: 'You', avatar: '👨' }
      ],
      actionText: 'View Details'
    },
    {
      id: 3,
      title: '"Gourmet Bites" Promo',
      company: 'by FoodieFinds',
      status: 'Revisions',
      statusColor: '#bfdbfe',
      progress: 85,
      dueDate: 'Due in 2 days',
      participants: [
        { name: 'Mike Chen', avatar: '👨' },
        { name: 'You', avatar: '👩' }
      ],
      actionText: 'Chat'
    },
    {
      id: 4,
      title: '"FitLife" App Launch',
      company: 'by Active Health',
      status: 'Content Creation',
      statusColor: '#fbcfe8',
      progress: 45,
      dueDate: 'Due in 10 days',
      participants: [
        { name: 'Sarah Lee', avatar: '👩' },
        { name: 'You', avatar: '👨' }
      ],
      actionText: 'View Brief'
    },
    {
      id: 5,
      title: 'Fashion Week Campaign',
      company: 'by StyleHub',
      status: 'Review',
      statusColor: '#fde68a',
      progress: 60,
      dueDate: 'Due in 7 days',
      participants: [
        { name: 'Alex Johnson', avatar: '👨' },
        { name: 'You', avatar: '👩' }
      ],
      actionText: 'Review'
    }
  ]);

  // Check if order was just completed from route params
  useEffect(() => {
    const completedOrder = route?.params?.completedOrder;
    if (completedOrder) {
      // Navigate to LeaveReview screen with the completed order
      navigation?.navigate('LeaveReview', { order: completedOrder });
    }
  }, [route?.params?.completedOrder]);

  const handleMarkAsComplete = (order) => {
    Alert.alert(
      'Mark as Complete',
      `Are you sure you want to mark "${order.title}" as complete?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Complete',
          onPress: () => {
            // Update order status to completed
            setOrders(prevOrders => 
              prevOrders.map(o => 
                o.id === order.id 
                  ? { ...o, status: 'Completed', progress: 100, statusColor: '#10b981' }
                  : o
              )
            );
            // Navigate to LeaveReview screen
            navigation?.navigate('LeaveReview', { order: { ...order, status: 'Completed', progress: 100 } });
          }
        }
      ]
    );
  };

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
          <Text style={styles.headerTitle}>Active Orders</Text>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation?.navigate('Notifications', { returnScreen: 'ActiveOrders' })}
          >
            <MaterialIcons name="notifications" size={24} color="#2d3748" />
          </TouchableOpacity>
        </View>

        {/* Orders List */}
        <View style={styles.ordersContainer}>
          {orders.map((order) => (
            <TouchableOpacity 
              key={order.id} 
              style={styles.orderCard}
              onPress={() => navigation?.navigate('Messages')}
              activeOpacity={0.7}
            >
              {/* Order Title, Company and Status in Same Row */}
              <View style={styles.orderHeaderRow}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderTitle}>{order.title}</Text>
                  <Text style={styles.companyName}>{order.company}</Text>
                </View>
                <View style={[styles.statusTag, { backgroundColor: order.statusColor }]}>
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>

              {/* Timeline */}
              <View style={styles.timelineContainer}>
                <Text style={styles.timelineLabel}>Timeline</Text>
                <View style={styles.timelineBar}>
                  <View style={[
                    styles.timelineProgress, 
                    { 
                      width: `${order.progress}%`,
                      backgroundColor: order.progress === 100 ? '#10b981' : '#464FE5'
                    }
                  ]} />
                </View>
                <Text style={styles.dueDate}>{order.dueDate}</Text>
              </View>

              {/* Participants and Action Button in Same Row */}
              <View style={styles.participantsActionRow}>
                <View style={styles.participantsSection}>
                  <Text style={styles.participantsLabel}>Participants</Text>
                  <View style={styles.participantsRow}>
                    <View style={styles.avatarContainer}>
                      {order.participants.map((participant, index) => (
                        <View key={index} style={[styles.avatar, { marginLeft: index > 0 ? -8 : 0 }]}>
                          <Text style={styles.avatarText}>{participant.avatar}</Text>
                        </View>
                      ))}
                    </View>
                    <Text style={styles.participantsText}>
                      You & {order.participants[0].name}
                    </Text>
                  </View>
                </View>
                
                {order.progress === 100 && order.status !== 'Completed' ? (
                  <TouchableOpacity 
                    style={styles.completeButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleMarkAsComplete(order);
                    }}
                  >
                    <Text style={styles.completeButtonText}>Mark Complete</Text>
                    <MaterialIcons name="check-circle" size={16} color="#10b981" />
                  </TouchableOpacity>
                ) : order.status === 'Completed' ? (
                  <TouchableOpacity 
                    style={styles.reviewButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      navigation?.navigate('LeaveReview', { order });
                    }}
                  >
                    <Text style={styles.reviewButtonText}>Leave Review</Text>
                    <MaterialIcons name="star" size={16} color="#fbbf24" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      if (order.actionText === 'Chat') {
                        navigation?.navigate('Messages');
                      } else if (order.actionText === 'Review') {
                        navigation?.navigate('LeaveReview', { order });
                      } else {
                        navigation?.navigate('CampaignDetails', { order });
                      }
                    }}
                  >
                    <Text style={styles.actionButtonText}>{order.actionText}</Text>
                    <MaterialIcons name="arrow-forward" size={16} color="#464FE5" />
                  </TouchableOpacity>
                )}
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
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 200,
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
  ordersContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  orderCard: {
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
  orderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
    marginRight: 12,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    minWidth: 90,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'center',
  },
  timelineContainer: {
    marginBottom: 16,
  },
  timelineLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  timelineBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginBottom: 8,
  },
  timelineProgress: {
    height: '100%',
    backgroundColor: '#464FE5',
    borderRadius: 3,
  },
  dueDate: {
    fontSize: 14,
    color: '#2d3748',
    textAlign: 'right',
  },
  participantsActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  participantsSection: {
    flex: 1,
    marginRight: 20,
  },
  participantsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    marginRight: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  avatarText: {
    fontSize: 16,
  },
  participantsText: {
    fontSize: 14,
    color: '#2d3748',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dbeafe',
    minWidth: 60,
  },
  actionButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#464FE5',
    marginRight: 4,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1fae5',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#10b981',
    minWidth: 100,
  },
  completeButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10b981',
    marginRight: 4,
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef3c7',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fbbf24',
    minWidth: 100,
  },
  reviewButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#f59e0b',
    marginRight: 4,
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

export default ActiveOrders;

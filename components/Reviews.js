import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';

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

const Reviews = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Received'); // 'Received' or 'Given'

  const receivedReviews = [
    {
      id: 1,
      reviewerName: 'Sarah M.',
      reviewerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 5,
      review: 'Amazing collaboration! Professional, creative, and delivered exactly what we needed. Highly recommend!',
      campaign: 'Summer Launch Campaign',
      date: '2 weeks ago',
    },
    {
      id: 2,
      reviewerName: 'Brand X',
      reviewerImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
      rating: 4,
      review: 'Great work on the campaign. Content was engaging and met all our requirements.',
      campaign: 'EcoWear Collection',
      date: '1 month ago',
    },
    {
      id: 3,
      reviewerName: 'TechGadg',
      reviewerImage: 'https://images.unsplash.com/photo-1614203586524-fee58ef9ef90?w=100',
      rating: 5,
      review: 'Outstanding professionalism and creativity. Will definitely work together again!',
      campaign: 'Product Launch',
      date: '2 months ago',
    },
  ];

  const givenReviews = [
    {
      id: 1,
      revieweeName: 'Brand Y',
      revieweeImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
      rating: 5,
      review: 'Great brand to work with! Clear communication and fair terms.',
      campaign: 'Fashion Forward Campaign',
      date: '3 weeks ago',
    },
    {
      id: 2,
      revieweeName: 'EcoWear',
      revieweeImage: 'https://images.unsplash.com/photo-1614203586524-fee58ef9ef90?w=100',
      rating: 4,
      review: 'Smooth collaboration process. Payment was timely.',
      campaign: 'Sustainable Fashion',
      date: '1 month ago',
    },
  ];

  const currentReviews = activeTab === 'Received' ? receivedReviews : givenReviews;
  const averageRating = activeTab === 'Received'
    ? (receivedReviews.reduce((sum, r) => sum + r.rating, 0) / receivedReviews.length).toFixed(1)
    : (givenReviews.reduce((sum, r) => sum + r.rating, 0) / givenReviews.length).toFixed(1);

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
          } else {
            navigation?.navigate('AppNavigator', { initialTab: 'Home' });
          }
        }}>
          <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Received' && styles.activeTab]}
          onPress={() => setActiveTab('Received')}
        >
          <Text style={[styles.tabText, activeTab === 'Received' && styles.activeTabText]}>
            Received ({receivedReviews.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Given' && styles.activeTab]}
          onPress={() => setActiveTab('Given')}
        >
          <Text style={[styles.tabText, activeTab === 'Given' && styles.activeTabText]}>
            Given ({givenReviews.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <Text style={styles.summaryLabel}>
              {activeTab === 'Received' ? 'Average Rating' : 'Your Average Rating'}
            </Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={32} color="#FBBF24" />
              <Text style={styles.ratingValue}>{averageRating}</Text>
            </View>
          </View>
          <View style={styles.summaryRight}>
            <Text style={styles.reviewCount}>{currentReviews.length}</Text>
            <Text style={styles.reviewCountLabel}>Reviews</Text>
          </View>
        </View>

        {/* Reviews List */}
        {currentReviews.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="star-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No reviews yet</Text>
            <Text style={styles.emptyText}>
              {activeTab === 'Received'
                ? 'You haven\'t received any reviews yet.'
                : 'You haven\'t given any reviews yet.'}
            </Text>
            {activeTab === 'Given' && (
              <TouchableOpacity
                style={styles.leaveReviewButton}
                onPress={() => navigation?.navigate('LeaveReview')}
              >
                <Text style={styles.leaveReviewButtonText}>Leave a Review</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.reviewsList}>
            {currentReviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image
                    source={{ uri: review.reviewerImage || review.revieweeImage }}
                    style={styles.reviewerImage}
                  />
                  <View style={styles.reviewInfo}>
                    <Text style={styles.reviewerName}>
                      {review.reviewerName || review.revieweeName}
                    </Text>
                    <View style={styles.starsContainer}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <MaterialIcons
                          key={star}
                          name={star <= review.rating ? 'star' : 'star-border'}
                          size={16}
                          color="#FBBF24"
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.campaignName}>{review.campaign}</Text>
                <Text style={styles.reviewText}>{review.review}</Text>
              </View>
            ))}
          </View>
        )}
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#F0F4FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#464FE5',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryLeft: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  summaryRight: {
    alignItems: 'center',
  },
  reviewCount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#464FE5',
  },
  reviewCountLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  reviewsList: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  campaignName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#464FE5',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  leaveReviewButton: {
    backgroundColor: '#464FE5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  leaveReviewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Reviews;


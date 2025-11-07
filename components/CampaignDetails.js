import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

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

const CampaignDetails = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation?.navigate('ExploreOffers')}
          >
            <MaterialIcons name="arrow-back" size={24} color="#2d3748" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Campaign Details</Text>
          <TouchableOpacity style={styles.bookmarkButton}>
            <View style={styles.bookmarkCircle}>
              <MaterialIcons name="bookmark-border" size={20} color="#2d3748" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Hero Image */}
        <View style={styles.heroImageContainer}>
          <Image
            source={{ uri: 'https://media.cnn.com/api/v1/images/stellar/prod/sustainable-shoes-cnnu.jpg?c=16x9&q=h_833,w_1480,c_fill' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Campaign Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.campaignTitle}>EcoWear Summer Line Launch</Text>
        </View>

        {/* Brand Information */}
        <View style={styles.brandContainer}>
          <Image
            source={{ uri: 'https://thumbs.dreamstime.com/b/beauty-woman-portrait-girl-beautiful-face-smiling-closeup-happy-perfect-smile-white-teeth-camera-attractive-healthy-76138194.jpg' }}
            style={styles.brandImage}
          />
          <View style={styles.brandInfo}>
            <Text style={styles.brandName}>EcoWear Co.</Text>
            <Text style={styles.brandTagline}>Sustainable Fashion</Text>
          </View>
        </View>

        {/* Budget & Platform Cards */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>BUDGET</Text>
            <Text style={styles.detailValue}>$200 - $500</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>PLATFORM</Text>
            <View style={styles.platformRow}>
              <MaterialIcons name="music-note" size={20} color="#000" />
              <Text style={styles.detailValue}>TikTok</Text>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            We are launching our new sustainable summer collection and we're looking for passionate creators to showcase our products. The campaign focuses on authenticity, style, and a love for our planet. We want you to create a fun, engaging TikTok video that highlights the style and eco-friendly nature of our new line.
          </Text>
        </View>

        {/* Deliverables Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deliverables</Text>
          <View style={styles.deliverablesList}>
            <View style={styles.deliverableItem}>
              <MaterialIcons name="check-circle" size={16} color="#464FE5" />
              <Text style={styles.deliverableText}>
                1x TikTok Video (30-60 seconds) featuring at least one item from the collection.
              </Text>
            </View>
            <View style={styles.deliverableItem}>
              <MaterialIcons name="check-circle" size={16} color="#464FE5" />
              <Text style={styles.deliverableText}>
                2x Instagram Stories with a swipe-up link to our collection page.
              </Text>
            </View>
            <View style={styles.deliverableItem}>
              <MaterialIcons name="check-circle" size={16} color="#464FE5" />
              <Text style={styles.deliverableText}>
                Usage rights for 3 months on our social media channels.
              </Text>
            </View>
          </View>
        </View>

        {/* Creator Requirements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Creator Requirements</Text>
          <View style={styles.requirementsContainer}>
            <View style={styles.requirementTag}>
              <Text style={styles.requirementText}>10k+ Followers</Text>
            </View>
            <View style={styles.requirementTag}>
              <Text style={styles.requirementText}>Fashion & Lifestyle Niche</Text>
            </View>
            <View style={styles.requirementTag}>
              <Text style={styles.requirementText}>Based in USA</Text>
            </View>
            <View style={styles.requirementTag}>
              <Text style={styles.requirementText}>Female Creator</Text>
            </View>
            <View style={styles.requirementTag}>
              <Text style={styles.requirementText}>High Engagement Rate</Text>
            </View>
          </View>
        </View>

        {/* Compensation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compensation</Text>
          <View style={styles.compensationContainer}>
            <View style={styles.compensationCard}>
              <MaterialIcons name="attach-money" size={20} color="#22c55e" />
              <Text style={styles.compensationText}>$ Paid Collaboration</Text>
            </View>
            <View style={styles.compensationCard}>
              <MaterialIcons name="card-giftcard" size={20} color="#8b5cf6" />
              <Text style={styles.compensationText}>Free Products Included</Text>
            </View>
          </View>
        </View>

        {/* Bottom Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.messageButton}
            onPress={() => navigation?.navigate('Messages')}
          >
            <Text style={styles.messageButtonText}>Message Brand</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={() => navigation?.navigate('CreateOffer')}
          >
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
        </View>
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
  bookmarkButton: {
    padding: 4,
  },
  bookmarkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e6ecff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImageContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  campaignTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    lineHeight: 32,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  brandImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 2,
  },
  brandTagline: {
    fontSize: 14,
    color: '#718096',
  },
  detailsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  detailCard: {
    flex: 1,
    backgroundColor: '#e6ecff',
    padding: 16,
    borderRadius: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#464FE5',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#4a5568',
    lineHeight: 20,
  },
  deliverablesList: {
    gap: 12,
  },
  deliverableItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  deliverableText: {
    fontSize: 14,
    color: '#4a5568',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  requirementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  requirementTag: {
    backgroundColor: '#e6ecff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  requirementText: {
    fontSize: 12,
    color: '#2d3748',
    fontWeight: '500',
  },
  compensationContainer: {
    gap: 12,
  },
  compensationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6ecff',
    padding: 17,
    borderRadius: 12,
  },
  compensationText: {
    fontSize: 14,
    color: '#2d3748',
    marginLeft: 12,
    fontWeight: '500',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 40,
    marginTop: -24,
    gap: 12,
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,

  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#464FE5',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
     marginBottom: 15,
    marginTop: 15,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default CampaignDetails;

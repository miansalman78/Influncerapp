import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

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

const Wallet = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const transactions = [
    {
      id: 1,
      title: 'Payment from EcoWear',
      date: 'Oct 15, 2025',
      amount: '+$500.00',
      type: 'earning',
      icon: 'arrow-downward',
      iconColor: '#10b981',
      iconBg: '#dcfce7'
    },
    {
      id: 2,
      title: 'Withdrawal to Bank',
      date: 'Oct 12, 2025',
      amount: '-$1,000.00',
      type: 'withdrawal',
      icon: 'arrow-upward',
      iconColor: '#464FE5',
      iconBg: '#dbeafe'
    },
    {
      id: 3,
      title: 'Payment from TechGadget',
      date: 'Oct 10, 2025',
      amount: '+$750.75',
      type: 'earning',
      icon: 'arrow-downward',
      iconColor: '#10b981',
      iconBg: '#dcfce7'
    },
    {
      id: 4,
      title: 'Payment from GlowUp Cosmetics',
      date: 'Oct 05, 2025',
      amount: '+$350.00',
      type: 'earning',
      icon: 'arrow-downward',
      iconColor: '#10b981',
      iconBg: '#dcfce7'
    },
    {
      id: 5,
      title: 'Withdrawal to Bank',
      date: 'Oct 01, 2025',
      amount: '-$2,000.00',
      type: 'withdrawal',
      icon: 'arrow-upward',
      iconColor: '#464FE5',
      iconBg: '#dbeafe'
    },
    {
      id: 6,
      title: 'Payment from Fashion Brand',
      date: 'Sep 28, 2025',
      amount: '+$425.50',
      type: 'earning',
      icon: 'arrow-downward',
      iconColor: '#10b981',
      iconBg: '#dcfce7'
    },
    {
      id: 7,
      title: 'Payment from Tech Startup',
      date: 'Sep 25, 2025',
      amount: '+$680.25',
      type: 'earning',
      icon: 'arrow-downward',
      iconColor: '#10b981',
      iconBg: '#dcfce7'
    },
    {
      id: 8,
      title: 'Withdrawal to Bank',
      date: 'Sep 22, 2025',
      amount: '-$1,500.00',
      type: 'withdrawal',
      icon: 'arrow-upward',
      iconColor: '#464FE5',
      iconBg: '#dbeafe'
    },
    {
      id: 9,
      title: 'Payment from Beauty Brand',
      date: 'Sep 20, 2025',
      amount: '+$320.75',
      type: 'earning',
      icon: 'arrow-downward',
      iconColor: '#10b981',
      iconBg: '#dcfce7'
    },
    {
      id: 10,
      title: 'Payment from Fitness App',
      date: 'Sep 18, 2025',
      amount: '+$550.00',
      type: 'earning',
      icon: 'arrow-downward',
      iconColor: '#10b981',
      iconBg: '#dcfce7'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Earnings') return transaction.type === 'earning';
    if (selectedFilter === 'Withdrawals') return transaction.type === 'withdrawal';
    return true;
  });

  const displayedTransactions = showAllTransactions ? filteredTransactions : filteredTransactions.slice(0, 5);

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
  };

  const handleViewAllPress = () => {
    setShowAllTransactions(!showAllTransactions);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#2d3748" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Wallet</Text>
          <TouchableOpacity style={styles.menuButton}>
            <MaterialIcons name="more-vert" size={24} color="#2d3748" />
          </TouchableOpacity>
        </View>

        {/* Available Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>$1,250.75</Text>
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawButtonText}>Withdraw Funds</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method Section */}
        <View style={styles.paymentMethodSection}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodInfo}>
              <View style={styles.bankIcon}>
                <MaterialIcons name="account-balance" size={24} color="#464FE5" />
              </View>
              <View style={styles.bankDetails}>
                <Text style={styles.bankName}>Bank of America</Text>
                <Text style={styles.accountNumber}>**** **** **** 1234</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.manageButton}>
              <Text style={styles.manageButtonText}>Manage</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction History Section */}
        <View style={styles.transactionSection}>
          <View style={styles.transactionHeader}>
            <Text style={styles.sectionTitle}>Transaction History</Text>
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllPress}>
              <Text style={styles.viewAllText}>{showAllTransactions ? 'Show Less' : 'View All'}</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Tabs */}
          <View style={styles.filterTabs}>
            <TouchableOpacity
              style={[
                styles.filterTab,
                selectedFilter === 'All' && styles.filterTabSelected
              ]}
              onPress={() => handleFilterPress('All')}
            >
              <Text style={[
                styles.filterTabText,
                selectedFilter === 'All' && styles.filterTabTextSelected
              ]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterTab,
                selectedFilter === 'Earnings' && styles.filterTabSelected
              ]}
              onPress={() => handleFilterPress('Earnings')}
            >
              <Text style={[
                styles.filterTabText,
                selectedFilter === 'Earnings' && styles.filterTabTextSelected
              ]}>
                Earnings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterTab,
                selectedFilter === 'Withdrawals' && styles.filterTabSelected
              ]}
              onPress={() => handleFilterPress('Withdrawals')}
            >
              <Text style={[
                styles.filterTabText,
                selectedFilter === 'Withdrawals' && styles.filterTabTextSelected
              ]}>
                Withdrawals
              </Text>
            </TouchableOpacity>
          </View>

          {/* Transaction List */}
          <View style={styles.transactionList}>
            {displayedTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={[styles.transactionIcon, { backgroundColor: transaction.iconBg }]}>
                  <MaterialIcons name={transaction.icon} size={20} color={transaction.iconColor} />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.type === 'earning' ? '#10b981' : '#464FE5' }
                ]}>
                  {transaction.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#464FE5" />
          <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="local-offer" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="chat-bubble" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="shopping-bag" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 100,
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
  menuButton: {
    padding: 4,
  },
  balanceCard: {
    backgroundColor: '#464FE5',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  withdrawButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  withdrawButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#464FE5',
  },
  paymentMethodSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 12,
  },
  paymentMethodCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bankIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bankDetails: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 14,
    color: '#6b7280',
  },
  manageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  manageButtonText: {
    fontSize: 14,
    color: '#464FE5',
    fontWeight: '600',
  },
  transactionSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#464FE5',
    fontWeight: '600',
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  filterTabSelected: {
    backgroundColor: '#ffffff',
  },
  filterTabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterTabTextSelected: {
    color: '#2d3748',
    fontWeight: '600',
  },
  transactionList: {
    gap: 12,
  },
  transactionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
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

export default Wallet;

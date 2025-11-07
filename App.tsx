import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Text, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen from './components/OnboardingScreen';
import ChooseRoleScreen from './components/ChooseRole';
import AppNavigator from './components/Navigator/AppNavigator';
import Dashboard from './components/Dashboard';
import CampaignDetails from './components/CampaignDetails';
import CreateCampaign from './components/CreateCampaign';
import CreateOffer from './components/CreateOffer';
import ActiveOrders from './components/ActiveOrders';
import Proposals from './components/Proposals';
import ExploreOffers from './components/ExploreOffers';
import Wallet from './components/Wallet';
import Messages from './components/Messages';
import LeaveReview from './components/LeaveReview';
import CreatorProfile from './components/CreatorProfile';
import Campaigns from './components/Campaigns';
import DashboardNew from './components/DashboardNew';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import HelpSupport from './components/HelpSupport';
import Reviews from './components/Reviews';
import LegalInfo from './components/LegalInfo';
import EditProfile from './components/EditProfile';
import Drawer from './components/Drawer';

type Screen = 
  | 'Onboarding' 
  | 'ChooseRole' 
  | 'AppNavigator'
  | 'Dashboard' 
  | 'Campaigns'
  | 'CampaignDetails'
  | 'CreateCampaign'
  | 'CreateOffer'
  | 'ActiveOrders'
  | 'Proposals'
  | 'ExploreOffers'
  | 'Wallet'
  | 'Messages'
  | 'LeaveReview'
  | 'CreatorProfile'
  | 'DashboardNew'
  | 'CreateAccount'
  | 'Login'
  | 'ForgotPassword'
  | 'Notifications'
  | 'Settings'
  | 'HelpSupport'
  | 'Reviews'
  | 'LegalInfo'
  | 'EditProfile';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState<Screen>('Onboarding');
  const [screenHistory, setScreenHistory] = useState<Screen[]>(['Onboarding']);
  const [screenParams, setScreenParams] = useState<Record<string, any>>({});
  const [userRole, setUserRole] = useState<string | null>(null); // Store user role globally
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer state for screens outside AppNavigator

  // Navigation handler with history and params
  const navigation = {
    navigate: (screen: Screen, params?: any) => {
      setScreenHistory(prev => [...prev, currentScreen]);
      setScreenParams(prev => ({ ...prev, [screen]: params }));
      // Store role if provided
      if (params?.role) {
        setUserRole(params.role);
      }
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (screenHistory.length > 0) {
        const previousScreen = screenHistory[screenHistory.length - 1];
        setScreenHistory(prev => prev.slice(0, -1));
        setCurrentScreen(previousScreen);
      }
    },
    reset: (screen: Screen) => {
      setScreenHistory([screen]);
      setCurrentScreen(screen);
    },
    getParam: (key: string) => {
      return screenParams[currentScreen]?.[key];
    },
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
  };

  const renderScreen = () => {
    try {
      switch (currentScreen) {
        case 'Onboarding':
          return <OnboardingScreen navigation={navigation} />;
        case 'ChooseRole':
          return <ChooseRoleScreen navigation={navigation} />;
        case 'AppNavigator':
          return <AppNavigator navigation={navigation} route={{ params: screenParams['AppNavigator'] }} />;
        case 'Dashboard':
          return <Dashboard navigation={navigation} />;
        case 'Campaigns':
          return <Campaigns navigation={navigation} />;
        case 'CampaignDetails':
          return <CampaignDetails navigation={navigation} />;
        case 'CreateCampaign':
          return <CreateCampaign navigation={navigation} />;
        case 'CreateOffer':
          return (
            <>
              <CreateOffer navigation={navigation} />
              <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                navigation={navigation}
                userRole={userRole || 'Creator'}
                currentScreen="CreateOffer"
              />
            </>
          );
        case 'ActiveOrders':
          return (
            <>
              <ActiveOrders navigation={navigation} route={{ params: screenParams['ActiveOrders'] }} />
              <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                navigation={navigation}
                userRole={userRole || 'Creator'}
                currentScreen="ActiveOrders"
              />
            </>
          );
        case 'Proposals':
          return <Proposals navigation={navigation} />;
        case 'ExploreOffers':
          return <ExploreOffers navigation={navigation} />;
        case 'Wallet':
          return <Wallet navigation={navigation} />;
        case 'Messages':
          return <Messages navigation={navigation} route={{ params: screenParams['Messages'] }} />;
        case 'LeaveReview':
          return <LeaveReview navigation={navigation} />;
        case 'CreatorProfile':
          return (
            <>
              <CreatorProfile navigation={navigation} />
              <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                navigation={navigation}
                userRole={userRole || 'Creator'}
                currentScreen="CreatorProfile"
              />
            </>
          );
        case 'DashboardNew':
          return <DashboardNew navigation={navigation} />;
        case 'CreateAccount':
          return <CreateAccount navigation={navigation} route={{ params: screenParams['CreateAccount'] }} />;
        case 'Login':
          return <Login navigation={navigation} route={{ params: screenParams['Login'] }} />;
        case 'ForgotPassword':
          return <ForgotPassword navigation={navigation} />;
        case 'Notifications':
          return <Notifications navigation={navigation} route={{ params: screenParams['Notifications'] }} />;
        case 'Settings':
          return <Settings navigation={navigation} route={{ params: screenParams['Settings'] }} />;
        case 'HelpSupport':
          return <HelpSupport navigation={navigation} route={{ params: screenParams['HelpSupport'] }} />;
        case 'Reviews':
          return <Reviews navigation={navigation} route={{ params: screenParams['Reviews'] }} />;
        case 'LegalInfo':
          return <LegalInfo navigation={navigation} route={{ params: screenParams['LegalInfo'] }} />;
        case 'EditProfile':
          return <EditProfile navigation={navigation} route={{ params: screenParams['EditProfile'] }} />;
        default:
          return <OnboardingScreen navigation={navigation} />;
      }
    } catch (error) {
      console.error('Error rendering screen:', error);
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Error loading screen. Check console for details.</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {renderScreen()}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;

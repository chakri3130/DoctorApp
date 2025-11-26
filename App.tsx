import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Appointments from './Pages/Appointments';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';
import Slots from './Pages/Slots';
import History from './Pages/History';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import Notifications from './Pages/Notifications';
import { useEffect } from 'react';
import JitsiService from './services/JitsiService';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Dashboard">
      <Tab.Screen name='Dashboard' component={Dashboard} options={({ navigation }) => ({
        headerTitle: "",
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate('Notifications')}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Ionicons name="notifications-outline" size={25} style={{ marginRight: 15 }} />
          </Pressable>
        ),
        tabBarIcon: ({ color, size }) => (<Ionicons name="home-outline" color={color} size={size} />),
      })} />
      <Tab.Screen name="Appointments" component={Appointments} options={{
        headerTitle: "",
        tabBarIcon: ({ color, size }) => (<Ionicons name='calendar-outline' color={color} size={size} />)
      }} />
      <Tab.Screen name="History" component={History} options={{
        headerTitle: "",
        tabBarIcon: ({ color, size }) => (<Ionicons name='time-outline' color={color} size={size} />)
      }} />
      <Tab.Screen name="Slots" component={Slots} options={{
        headerTitle: "",
        tabBarIcon: ({ color, size }) => (<Ionicons name='calendar-number-outline' color={color} size={size} />)
      }} />
      <Tab.Screen name="Profile" component={Profile} options={({ navigation }) => ({
        headerTitle: "",
        tabBarIcon: ({ color, size }) => (<Ionicons name='person-outline' color={color} size={size} />),
        headerRight: () => (
          <Pressable
            onPress={() => navigation.setParams({ editMode: true })}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'flex-start', marginRight: 15 }}>
              <Ionicons name="create-outline" size={25} />
              <Text>Edit</Text>
            </View>
          </Pressable>
        )
      })} />
    </Tab.Navigator >
  );
}

// Main App with Stack Navigator
export default function App() {
  useEffect(() => {
    // Setup Jitsi event listeners when app starts
    JitsiService.setupEventListeners();

    // Cleanup event listeners when app unmounts
    return () => {
      JitsiService.removeEventListeners();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ title: 'Notifications' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

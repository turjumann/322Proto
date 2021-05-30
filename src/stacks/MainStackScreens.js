import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen'
import MessageScreen from '../screens/MessageScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SettingsScreen from '../screens/SettingsScreen'



export default MainStackScreens = () => {

    const MainStack = createBottomTabNavigator()

    const tabBarOptions = {
        showLabel: false,
        style: {
            backgroundColor: '#222222',
            paddingBottom: 12
        }
    }
    const screenOptions = (({route}) => ({
        tabBarIcon: ({focused}) => {
            let iconName= 'ios-home'

            switch (route.name) {
                case 'Home':
                    iconName = 'ios-home'
                    break
                case 'Profile':
                    iconName = 'ios-person'
                    break
                case 'Home':
                    iconName = 'ios-home'
                    break
                case 'Message':
                    iconName = 'ios-chatboxes'
                    break
                case 'Settings':
                    iconName='ios-settings-outline'
                    break

                default:
                    iconName = 'ios-home'
            }

            return <Ionicons name = {iconName} size={24} color={focused ? '#ffffff' : '#666666'} />
        }
        
    }))

    return (
        <MainStack.Navigator tabBarOptions = {tabBarOptions} screenOptions = {screenOptions}>
            <MainStack.Screen name ="Profile" component = {ProfileScreen} />
            <MainStack.Screen name ="Home" component = {HomeScreen} />
            <MainStack.Screen name ="Settings" component = {SettingsScreen} />
        </MainStack.Navigator>
    )

}
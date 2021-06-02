import React, {useContext} from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import {UserContext} from '../context/UserContext'

import AuthStackScreens from './AuthStackScreens';
import MainStackScreens from './MainStackScreens';
import LoadingScreen from '../screens/LoadingScreen'
import MessageScreen from '../screens/MessageScreen'


export default AppStackScreens = () => {
    const [user] = useContext(UserContext)
    const AppStack = createStackNavigator()
    
    

    return (

        <AppStack.Navigator>
            
            {user.isLoggedIn === null ? (
                <AppStack.Screen name = 'Loading' options={{headerShown: false}} component = {LoadingScreen} />

            ) : user.isLoggedIn ? (

                <AppStack.Screen name = 'Main' options={{headerShown: false}} component = {MainStackScreens} />
            ) : (
                <AppStack.Screen name = 'Auth' options={{headerShown: false}} component = {AuthStackScreens} />
            )
        }
        <AppStack.Screen name = 'Message' component = {MessageScreen}/> 
            

        </AppStack.Navigator>
    )

}


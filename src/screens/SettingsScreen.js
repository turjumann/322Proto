import React, {useContext, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../components/Text'
import styled from 'styled-components';
import {FirebaseContext} from '../context/FirebaseContext'
import {UserContext} from '../context/UserContext'




export default SettingsScreen = () => {

    
    const [user, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)
    


    const logOut = async () => {
        const loggedOut = firebase.logOut()
        

        if(loggedOut) {
            console.log('Before @setUser')
            setUser((state) => ({...state, isLoggedIn: false}))
            console.log('After @setUser')
        }

    }


    return (
        <Container>
            <Logout onPress = {logOut}>
                <Text large bold color ='#222222' >Logout</Text>
            </Logout>
        </Container>
        
    )
}


const Container = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;

`
const Logout = styled.TouchableOpacity`
    margin-bottom: 32px;
    
`




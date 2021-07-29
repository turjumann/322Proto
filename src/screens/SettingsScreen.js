import React, {useContext, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../components/Text'
import styled from 'styled-components';
import {FirebaseContext} from '../context/FirebaseContext'
import {UserContext} from '../context/UserContext'
import {StatusBar} from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



export default SettingsScreen = () => {

    
    const [user, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)
    


    const logOut = async () => {
        const loggedOut = firebase.logOut()
        

        if(loggedOut) {
            
            setUser((state) => ({...state, isLoggedIn: false}))
           
        }

    }


    return (
            
            <View>
                <StatusBar style = 'dark' />
            <ImageContainer>
                <Logo source={require('../../assets/images/logo.png')} />
            </ImageContainer>
            <Container>
            <Logout onPress = {logOut}>
                <Text large bold color ='#222222' >Logout</Text>
            </Logout>
        </Container>
        </View>
    )
}


const Container = styled.View`
    justify-content: flex-end;
    align-items: center;
    margin-top: 30px;
`
const Logout = styled.TouchableOpacity`
    margin-bottom: 32px;
    
`

const ImageContainer = styled.View`
    height: ${hp('70%')};
    shadow-opacity: 0.5;
    shadow-radius: 30px;
    shadow-color: #222222;
    align-items: center;
    margin-top: 60px;
  

`


const Logo = styled.Image`
    width: 300px;
    height: 300px;
    border-radius: 100px;

`


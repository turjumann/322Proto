import React, { useContext, useEffect } from 'react';
import styled from 'styled-components'
import Text from '../components/Text'
import LottieView from 'lottie-react-native'
import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'

export default LoadingScreen = () => {


    const [_, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)

    useEffect(() => {

        setTimeout(async () => {
            
            const user = firebase.getCurrentUser()

            if (user) {

                const userInfo = await firebase.getUserInfo(user.uid)

                setUser({
                    isLoggedIn: true,
                    email: userInfo.email,
                    name: userInfo.name,
                    surname: userInfo.surname,
                    age: userInfo.age,
                    prevInst: userInfo.prevInst,
                    country: userInfo.country,
                    profilePhotoUrl: userInfo.profilePhotoUrl
                })
            } else {

                setUser(state => ({...state, isLoggedIn: false}))
            }

        }, 1000)
    }, [])

    return (
        <Container>
            <Text title color ='#DFE7F2'>
                CMSE322
            </Text>
            <Text></Text>
            <Text medium color ='#DFE7F2' >
                University Chatting & Admission App 
            </Text>
            <LottieView
                source={require("../../assets/loadingAnimation.json")}
                autoPlay
                loop
                style = {{width: "100%"}}
                />
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #222222;
`

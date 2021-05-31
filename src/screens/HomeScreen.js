import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import styled from 'styled-components'
import Text from '../components/Text'
import { FirebaseContext } from '../context/FirebaseContext'
import { UserContext } from '../context/UserContext'



const [user, setUser] = useContext(UserContext)
const firebase = useContext(FirebaseContext)
const [userData, setUserData] = useState(null);

export default HomeScreen = () => {

    return (
        
        <Container>
            
            <Text title semi center>Hello there</Text>
              
        </Container>

        
    )
}

const Container = styled.View`
    flex: 1;
    justify-content: center;

`
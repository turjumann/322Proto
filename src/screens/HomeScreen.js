import React from 'react';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components'
import Text from '../components/Text'



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
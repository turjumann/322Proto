import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Button, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components'
import Text from '../components/Text'
import CustomListItem from '../components/CustomListItem'








export default HomeScreen = ({navigation}) => {

    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            headerTitle: <Text title bold >Home</Text>,

        })
    })
    return (
        <SafeAreaView>
            <ScrollView>
            <CustomListItem navigation={navigation} />
            </ScrollView>
        </SafeAreaView>        
    )
}

const Container = styled.View`
    flex: 1;
   justify-content: center;

`
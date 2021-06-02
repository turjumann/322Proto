import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import { UserContext } from '../context/UserContext'
import { FirebaseContext,  db} from '../context/FirebaseContext'
import styled from 'styled-components'
import MessageScreen from '../screens/MessageScreen'
import Text from '../components/Text'

export default CustomListItem = ({navigation}) => {

    const firebase = useContext(FirebaseContext)
    const [chats, setChats] = useState([])
    const [currId, setCurrId] = useState()
    
    const waitForIt = async () =>{
        let ex = await firebase.getRegisteredUsers()
        let uuid = await firebase.getCurrentUser().uid
        setChats(ex)
        setCurrId(uuid)



    }
    useEffect(() => {
        waitForIt()

    }, [])

    const onTap = (guestId, guestName, guestSurname) => {
      navigation.navigate('Message', {
        guestName,
        guestSurname,
        guestId,
        currentUserID: currId,
      })
    }

    return (
      
      <Container>
          <Text title color = '#222222'>Some info here</Text>
          <View style = {{height: 70}}/>
              {
    chats.map((item, i) => (
      <ListItem key={i} bottomDivider onPress={() => onTap(item.id, item.name, item.surname)}>
        <ListItem.Content>
          <ListItem.Title style={{ color: '#414959', fontWeight: '400', fontSize: 20 }}>{item.name}{item.surname}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
        </Container>
    )
}


const Container = styled.View`
  flex: 1;


`


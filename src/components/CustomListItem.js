import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
    const [currName, setCurrName] = useState()
    const [currProfilePhoto, setCurrProfilePhoto] = useState()
    const [guestProfilePhoto, setGuestProfilePhoto] = useState()
    const waitForIt = async () =>{
        let ex = await firebase.getRegisteredUsers()
        let uuid = await firebase.getCurrentUser().uid
        let currUser = await firebase.getUserInfo(uuid)
        setChats(ex)
        
        setCurrId(uuid)
        setCurrName(currUser.name)
        setCurrProfilePhoto(currUser.profilePhotoUrl)
        setGuestProfilePhoto(ex.profilePhoto)

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
      
        <ScrollView>
        <ProfilePhotoContainer>
        <Text large color = '#222222'>
                <ProfilePhoto source ={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cmse322.appspot.com/o/profilePhotos%2Femu.png?alt=media&token=55ce41ce-8282-4a78-bbbb-efbc80e0611d'}
                    } />  {currName}, welcome to EMU
                       
                       
                       </Text>
            </ProfilePhotoContainer>
        
    
      
          
          <View style = {{height: 10}}/>
              {
    chats.map((item, i) => (
      <ListItem key={i} bottomDivider onPress={() => onTap(item.id, item.name, item.surname)} >
              <Avatar
                  rounded
                  size ='small'
                  source={{ uri: item.profilePhoto === 'default'
                  ?'https://firebasestorage.googleapis.com/v0/b/cmse322.appspot.com/o/profilePhotos%2FFW6FissAKyRAMy80YZvyIm0lJbt2?alt=media&token=36a87151-298a-4d54-a447-869158e43ede'
                  :item.profilePhoto }}
                />
        <ListItem.Content>
          <ListItem.Title style={{ color: '#414959', fontWeight: '400', fontSize: 20 }}>{item.name} {item.surname}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
        
        </ScrollView>
    )
}


const Container = styled.View`


`

const ProfilePhotoContainer = styled.View`
    shadow-opacity: 0.5;
    shadow-radius: 30px;
    shadow-color: #222222;
    align-items: center;
    margin-top: 30px;
    marginRight: auto;

`


const ProfilePhoto = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 64px;
    marginLeft: auto;
`
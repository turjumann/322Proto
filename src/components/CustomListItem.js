import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { UserContext } from '../context/UserContext'
import { FirebaseContext,  db} from '../context/FirebaseContext'

export default CustomListItem = ({id, chatName, enterChat}) => {

    const firebase = useContext(FirebaseContext)
    const [chats, setChats] = useState([])


    useEffect(() => {
        let ex = firebase.getRegisteredUsers()
        setChats(ex)
        console.log(ex)
    }, [])
    return (
    
        <ListItem>
            
            <Avatar
            rounded
            source = {{ 
                uri:
                '../assets/images/logo.png'
            }} 
            />
            <ListItem.Content>
                <ListItem.Title style ={{fontWeight: '800'}} >
                    Agent 1 Chat
                </ListItem.Title>
                <ListItem.Subtitle 
                numberOfLines={1}
                ellipsizeMode = 'tail'
                >
                    EMU University Agent Subtitle    
                </ListItem.Subtitle>
            </ListItem.Content>
            
        </ListItem>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
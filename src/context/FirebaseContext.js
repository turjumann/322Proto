import React, {createContext, useState } from 'react'


import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../config/firebase'
import { Alert } from 'react-native'


const FirebaseContext = createContext();



if(!firebase.apps.length) {

    firebase.initializeApp(config);

}


const db = firebase.firestore()

const Firebase = {

    getCurrentUser: () => {
        return firebase.auth().currentUser
    },

    createUser: async (user) =>{

        try{
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            const uid = Firebase.getCurrentUser().uid

            let profilePhotoUrl = 'default'

            await db.collection('users').doc(uid).set({
                name: user.name,
                surname: user.surname,
                age: user.age,
                prevInst: user.prevInst,
                country: user.country,
                email: user.email,
                profilePhotoUrl
                
            })

            
            if (user.profilePhoto) {
                profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto)
            }
            delete user.password
            return {...user, profilePhotoUrl, uid}

            

        } catch(error){
            Alert.alert(error.message)
            setUser((state) => ({...state, isLoggedIn: false}))
            console.log('Error @createUser: ', error.message)
        }

        
    },

    uploadProfilePhoto: async (uri) => {
        const uid = Firebase.getCurrentUser().uid

        try{
            const photo = await Firebase.getBlob(uri)

            const imageRef = firebase.storage().ref('profilePhotos').child(uid);
            await imageRef.put(photo)


            const url = await imageRef.getDownloadURL()

            await db.collection('users').doc(uid).update({
                profilePhotoUrl: url
            })

            return url

        } catch(error) {

            console.log('Error @uploadProfilePhoto: ', error)

        }
    },

    getBlob: async (uri) => {
        return await new Promise ((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.onload = () => {
                resolve(xhr.response)
            }

            xhr.onerror = () => {
                reject (new TypeError('Network request failed.'))
            }


            xhr.responseType = 'blob'
            xhr.open('GET', uri, true)
            xhr.send(null)
        })
    }, 
    getUserInfo: async (uid) => {
        
        try {
            const user = await db.collection('users').doc(uid).get()
            if(user.exists) {
                return user.data()
            }
        } catch (error) {
            console.log('Error @getUserInfo', error)
        }
    },


    updateUser: async (uid, userData) => {
        
        try {

            const uid = Firebase.getCurrentUser().uid
            const ds = firebase.firestore();

            ds.collection('users').doc(uid).update({
                name: userData.name,
                surname: userData.surname,
                age: userData.age,
                prevInst: userData.prevInst,
                country: userData.country,
               
               
                }).then(() => {
            console.log('Profile Successfully Edited!')},
            Alert.alert(
                'Profile Successfully Updated!'))


        } catch (error) {

            console.log('Error @updateUser', error),
            Alert.alert('Error, Please fill all the fields')
        }
    },

    logOut: async () => {
        try{
            await firebase.auth().signOut()

            
            
            return true
            
        } catch(error) {
            Alert.alert(error.message)
            console.log('Error @logOut', error)
        }
        return false
    },


    logIn: async (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    },

    getRegisteredUsers: async () => {
        
        const db = firebase.firestore();

        const currId = Firebase.getCurrentUser().uid
        return await db
        .collection('users')
        .get()
        .then(querySnapshot => {
           let arr = []
           
          querySnapshot.forEach(documentSnapshot => {


              let newData = {
                  id: documentSnapshot.id,
                  name: documentSnapshot.data().name,
                  surname: documentSnapshot.data().surname,
                  profilePhoto: documentSnapshot.data().profilePhotoUrl,
                }
                if (newData.id === currId){}
                else{

                    arr = [...arr, newData]
                }
                
          });
        return arr;
        });
        
    },

    sendMessages: async (docId, myMsg) => {
          db.collection('chatrooms')
          .doc(docId)
          .collection('messages')
          .add({...myMsg, createdAt:firebase.firestore.FieldValue.serverTimestamp()})

    },



    

}

const FirebaseProvider = (props) => {

    return <FirebaseContext.Provider value = {Firebase}>{props.children}</FirebaseContext.Provider>
}

export {FirebaseContext, FirebaseProvider}
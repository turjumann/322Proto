import React, {useState, useContext} from 'react'
import {ScrollView, View, Keyboard, KeyboardAvoidingView, Platform} from 'react-native'
import styled from 'styled-components'
import Text from '../components/Text'
import {AntDesign} from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { StatusBar } from 'expo-status-bar';

import { FirebaseContext } from '../context/FirebaseContext'
import { UserContext } from '../context/UserContext'



export default function RegisterScreen({navigation})  {
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [age, setAge] = useState();
    const [country, setCountry] = useState();
    const [prevInst, setPrevInst] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState()
    const firebase = useContext(FirebaseContext)
    const [_, setUser] = useContext(UserContext)
    


    const getPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            
            return status
        }
    }

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })

            if(!result.cancelled) {
                setProfilePhoto(result.uri)
            }

        }catch (error) {
            console.log('Error @pickImage: ', error)
        }
    }

    const addProfilePhoto = async () => {
        const status = await getPermissions()
        if (status !== 'granted' ) {
            alert("We need permission to access your photo library.")

            return
        }
        pickImage()
    }


    const signUp = async () => {
        setLoading(true)

        
        const user = {name, surname, age, prevInst, country, email, password, profilePhoto}

        console.log(name, surname, age, prevInst, country, email, password)
        try{
            const createdUser = await firebase.createUser(user)
                     
          
                
                setUser({ ...createdUser, isLoggedIn: true })
         

            
        } catch(error) {
            console.log('Error: @signUp:', error)
        } finally {

            setLoading(false)
        }
    }

    return (
        
       <Container>
           <Main>
               <Text title semi center>
                   Register as a Student
               </Text>
           </Main>
            <ProfilePhotoContainer onPress = {addProfilePhoto}>
                {profilePhoto ? (
                    <ProfilePhoto source = {{uri: profilePhoto}} />

                ) : (
                    <DefaultProfilePhoto>
                    <AntDesign name = 'plus' size = {24} color = '#ffffff' />
                    </DefaultProfilePhoto>
                )}
                
            </ProfilePhotoContainer>
            <View style={{height: 300}} >
            <ScrollView>
            
           <Auth>
           
           <AuthContainer>
                   <AuthTitle>Name</AuthTitle>
                   <AuthField 
                        autoCapitalize = 'words' 
                        autoCorrect = {false} 
                        autoFocus = {false}
                        onChangeText = {name => setName(name.trim())}
                        value={name}
                   />
               </AuthContainer>

               <AuthContainer>
                   <AuthTitle>Surname</AuthTitle>
                   <AuthField 
                        autoCapitalize = 'words' 
                        autoCorrect = {false} 
                        autoFocus = {false}
                        onChangeText = {surname => setSurname(surname.trim())}
                        value={surname}
                   />
               </AuthContainer>

               <AuthContainer>
                   <AuthTitle>Age</AuthTitle>
                   <AuthField 
                        autoCapitalize = 'none' 
                        autoCorrect = {false} 
                        autoFocus = {false}
                        keyboardType='numeric'
                        onChangeText = {age => setAge(age.trim())}
                        value={age}
                   />
               </AuthContainer>

               <AuthContainer>
                   <AuthTitle>Previous Institution</AuthTitle>
                   <AuthField 
                        autoCapitalize = 'words' 
                        autoCorrect = {false} 
                        autoFocus = {false}
                        onChangeText = {prevInst => setPrevInst(prevInst)}
                        value={prevInst}
                   />
               </AuthContainer>

               <AuthContainer>
                   <AuthTitle>Country</AuthTitle>
                   <AuthField 
                        autoCapitalize = 'words' 
                        autoCorrect = {false} 
                        autoFocus = {false}
                        onChangeText = {country => setCountry(country)}
                        value={country}
                   />
               </AuthContainer>
               
               <AuthContainer>
                   <AuthTitle>Email Address</AuthTitle>
                   <AuthField 
                        autoCapitalize = 'none' 
                        autoCompleteType='email' 
                        autoCorrect = {false} 
                        autoFocus = {false}
                        keyboardType='email-address'
                        onChangeText = {email => setEmail(email.trim())}
                        value={email}
                   />
               </AuthContainer>
               <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} keyboardVerticalOffset={75} behavior={"padding"}>
               <AuthContainer>
               
                   <AuthTitle>Password</AuthTitle>
                   <AuthField 
                        autoCapitalize = 'none' 
                        autoCompleteType='password' 
                        autoCorrect = {false} 
                        autoFocus = {false}
                        secureTextEntry = {true}
                        onChangeText = {password => setPassword(password.trim())}
                        value={password}
                   />
                  
               </AuthContainer>
               </KeyboardAvoidingView>
           </Auth>
           
           </ScrollView>
           </View>
           <RegisterContainer onPress ={signUp} disabled = {loading}>
               {loading ? (
                   <Loading />
               ) : (
                <Text bold center color = '#ffffff'>Register</Text>
               )}
               
           </RegisterContainer>

            <LoginContainer onPress = {() => navigation.navigate("Login")}>
                <Text small bold center>Already have an account?{" "}<Text bold color = '#932432'>Login</Text></Text>
            </LoginContainer>

            <HeaderGraphic>
                <RightCircle />
                <LeftCircle />
            </HeaderGraphic>

            <StatusBar style = 'light' />
       </Container>
       
    )
}


const Container = styled.View`
    flex: 1;
`;

const Main = styled.View`
    margin-top: 100px;

`;

const ProfilePhotoContainer = styled.TouchableOpacity`
    background-color: #E1E2E6;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    align-self: center;
    margin-top: 16px;
    overflow: hidden;
    margin-bottom: 16px;
`;


const DefaultProfilePhoto = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`;


const ProfilePhoto = styled.Image`
    flex:1;
`;


const Auth = styled.View`
    margin: 20px 32px 32px;
`;

const AuthContainer = styled.View`
    margin-bottom: 20px;
`;

const AuthTitle = styled(Text)`
    color: #8E93A1;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 300;
`;


const AuthField = styled.TextInput`
    border-bottom-color: #8E93A1; 
    border-bottom-width: 0.5px;
    height: 25px;
`;

const RegisterContainer = styled.TouchableOpacity`
    margin: 0 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #222222;
    border-radius: 6px;
`;

const Loading = styled.ActivityIndicator.attrs(props => ({
    color: '#ffffff',
    size: 'small'
}))``


const LoginContainer = styled.TouchableOpacity`
    margin-top: 16px
`;


const HeaderGraphic = styled.View`
    position: absolute;
    width: 100%;
    top: -100px;
    z-index: -100;
`;


const RightCircle = styled.View`
    background-color: #BEC3CC;
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 200px;
    right: -100px;
    top: -225px;
`;

const LeftCircle = styled.View`
    background-color: #222222;
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    left: -50px;
    top: -50px;
`;



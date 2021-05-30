import React, {useState} from 'react'
import {ScrollView, View} from 'react-native'
import { CheckBox } from 'react-native-elements'
import styled from 'styled-components'
import Text from '../components/Text'
import {AntDesign} from '@expo/vector-icons'

export default function RegisterScreen({navigation})  {
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [country, setCountry] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    return (
       <Container>
           <Main>
               <Text title semi center>
                   Register as an Agent
               </Text>
           </Main>
            <ProfilePhotoContainer>
                <DefaultProfilePhoto>
                    <AntDesign name = 'plus' size = {24} color = '#ffffff' />
                </DefaultProfilePhoto>
            </ProfilePhotoContainer>
            <View style={{height: 300}}>
            <ScrollView>
           <Auth>
           <AuthContainer>
                   <AuthTitle>Name</AuthTitle>
                   <AuthField 
                        autoCapitalize = 'none' 
                        autoCorrect = {false} 
                        autoFocus = {false}
                        onChangeText = {name => setName(name.trim())}
                        value={name}
                   />
               </AuthContainer>

               <AuthContainer>
                   <AuthTitle>Surname</AuthTitle>
                   <AuthField 
                        autoCapitalize = 'none' 
                        autoCorrect = {false} 
                        autoFocus = {false}
                        onChangeText = {surname => setSurname(surname.trim())}
                        value={surname}
                   />
               </AuthContainer>

               <AuthContainer>
                   <AuthTitle>Country</AuthTitle>
                   <AuthField 
                        autoCapitalize = 'none' 
                        autoCorrect = {false} 
                        autoFocus = {false}
                        onChangeText = {country => setCountry(country.trim())}
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

           </Auth>
           </ScrollView>
           </View>
           
           <RegisterContainer disabled = {loading}>
               {loading ? (
                   <Loading />
               ) : (
                <Text bold center color = '#ffffff'>Register</Text>
               )}
               
           </RegisterContainer>

            <LoginContainer onPress = {() => navigation.navigate("Login")}>
                <Text small center>Already have an account?{" "}<Text bold color = '#8022D9'>Login</Text></Text>
            </LoginContainer>

            <HeaderGraphic>
                <RightCircle />
                <LeftCircle />
            </HeaderGraphic>

            <StatusBar barStyle = 'light-content' />
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
    background-color: #8022D9;
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
    background-color: #8022D9;
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 200px;
    right: -100px;
    top: -200px;
`;

const LeftCircle = styled.View`
    background-color: #23A6D5;
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    left: -50px;
    top: -50px;
`;

const StatusBar = styled.StatusBar``;

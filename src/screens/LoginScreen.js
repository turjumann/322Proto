import React, {useState, useContext} from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components'
import Text from '../components/Text'
import { StatusBar } from 'expo-status-bar';
import { FirebaseContext } from '../context/FirebaseContext'
import { UserContext } from '../context/UserContext'
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native'


const DissmissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        {children}
        </TouchableWithoutFeedback>
)

export default function LoginScreen({navigation})  {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const firebase = useContext(FirebaseContext)
    const [_,setUser] = useContext(UserContext)

    const logIn = async () => {
        setLoading(true)

        try{
            await firebase.logIn(email, password)

            const uid = firebase.getCurrentUser().uid

            const userInfo = await firebase.getUserInfo(uid)
            
            setUser({
                name: userInfo.name,
                surname: userInfo.surname,
                age: userInfo.age,
                prevInst: userInfo.prevInst,
                country: userInfo.country,
                email: userInfo.email,
                uid,
                isLoggedIn: true,
                profilePhotoUrl: userInfo.profilePhotoUrl,
            })

        }catch(error) {
            Alert.alert(error.message)
        }
        finally {
            setLoading(false)
        }
    }
    return (

        <DissmissKeyboard>
       <Container>
           <Main>
               <Text title semi center>
                   CMSE322 Term Project
               </Text>
           </Main>

           <Auth>
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

           <View style = {{paddingTop: 20}}>
           <LoginContainer onPress = {logIn} disabled = {loading}>
               {loading ? (
                   <Loading />
               ) : (
                <Text bold center color = '#ffffff'>Login</Text>
               )}
               
           </LoginContainer>
           
            <RegisterContainer onPress = {() => navigation.navigate("Register")}>
                <Text small bold center>First time here?<Text bold color = '#932432'>Register</Text></Text>
            </RegisterContainer>
            </View>
            <HeaderGraphic>
                <RightCircle />
                <LeftCircle />
            </HeaderGraphic>

            <StatusBar style = 'light' />
       </Container>
       </DissmissKeyboard>
    )
}


const Container = styled.View`
    flex: 1;
`;

const Main = styled.View`
    margin-top: 200px;

`;
const Auth = styled.View`
    margin: 50px 32px 32px;
`;

const AuthContainer = styled.View`
    margin-bottom: 15px;
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
    height: 40px;
`;

const LoginContainer = styled.TouchableOpacity`
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


const RegisterContainer = styled.TouchableOpacity`
    margin-top: 16px
`;


const HeaderGraphic = styled.View`
    position: absolute;
    width: 100%;
    top: -50px;
    z-index: -100;
`;


const RightCircle = styled.View`
    background-color: #222222;
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 200px;
    right: -100px;
    top: -200px;
`;

const LeftCircle = styled.View`
    background-color: #BEC3CC;
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    left: -50px;
    top: -50px;
`;

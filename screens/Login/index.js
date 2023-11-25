import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import img from '../../assets/img';
import {HEIGHT, WIDTH} from '../../assets/style';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { useLogin } from '../../Context/HotelContext';
const baseUrl = 'http://192.168.100.121/backend_p3l/public'

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMail, setErrorMail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [isEnable, setIsEnable] = useState(true);
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { isLogin, setIsLogin, setIsToken } = useLogin(); 
  // const getLocalIpAddress = () => {
  //   const ipAddress = DeviceInfo.getIpAddressSync();
  //   return ipAddress;
  // };
  // const localIpAddress = getLocalIpAddress();
  // console.log('Local IP Address:', localIpAddress);

  useEffect(() => {
    validation();
  }, [password, email]);

  const validation = () => {
    // console.log("INI VALIDASI")
    let vMail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email && password) {
      if (vMail.test(email)) {
        setErrorMail('');
      } else {
        setErrorMail('Email not Valid');
        setIsEnable(true);
      }
      // if (password.length > 0 && password.length < 8) {
      //   setErrorPassword('Password must less than 8 characters');
      //   setIsEnable(true);
      // } else {
        setErrorPassword('');
      // }
      setIsEnable(false);
    } else {
      if (password) {
        setErrorPassword('');
      } else {
        setErrorPassword('Password must be filled in');
        setIsEnable(true);
      }

      if (email) {
        setErrorMail('');
      } else {
        setErrorMail('Email must be filled in');
        setIsEnable(true);
      }
      setIsEnable(true);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setIsEnable(true);

      const requestBody = {
        email: email,
        password: password,
      };
      console.log(requestBody)

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };

      const response = await axios.post(`${baseUrl}/api/login`, requestBody, config);
      console.log('RESPONSE1', response)
      if (response.status === 200) {
        console.log('RESPONSE', JSON.stringify(response, null, 2));
        await AsyncStorage.setItem('token', response.data.auth.token);
        await AsyncStorage.setItem('email', response.data.data.email);
        const token = await AsyncStorage.getItem('token');
        Alert.alert('Login Successful', 'You have successfully logged in!', [
          {
            text: 'OK',
            onPress: () => {
              setIsToken(token)
              setIsLogin(true)
              navigation.navigate('Home');
            },
          }, 
        ]);
        const emailLocal = await AsyncStorage.getItem('email');
        console.log('EMAIL test', token);
      } else {
      }
    } catch (error) {
      // console.log('Login Error', error);
      Alert.alert('Login Failed', 'Email or Password Incorrect!', [
        {
          text: 'OK',
        },
      ]);
      setErrorMail('Email not Valid');
      setErrorPassword('Password not Valid');
    } finally {
      setIsLoading(false);
      setIsEnable(false);
    }
  }

    return (
      <ImageBackground
        source={img.BGPROFILE}
        style={{width: WIDTH, height: HEIGHT}}
        resizeMode="cover">
        <View style={{marginHorizontal: 16}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 90,
            }}>
            <Image source={img.LOGOBAWAH} style={{width: 200, height: 80}} />
          </View>
          <View style={{marginTop: 90}}>
            <Text style={{fontSize: 16, color: '#fff'}}>Email</Text>

            <View
              style={{
                borderWidth: 1,
                marginTop: 8,
                borderColor: errorMail ? '#EA8685' : '#132040',
                backgroundColor: '#F2F4F9',
                borderRadius: 8,
                padding: 4,
              }}>
              <TextInput
                value={email}
                keyboardType={'email-address'}
                autoCapitalize="none"
                style={{
                  color: '#000',
                  fontSize: 16,
                }}
                placeholder="Enter Your Email"
                placeholderTextColor={'#B4BDC3'}
                onChangeText={value => {
                  console.log('VALUE EMAIL ', value);
                  setEmail(value);
                  validation();
                }}
              />
            </View>
            <View style={{position: 'absolute', bottom: -25, right: 5}}>
              <Text color="#fff">{errorMail}</Text>
            </View>
          </View>
          <View style={{marginTop: 27}}>
            <Text style={{fontSize: 16, color: '#fff'}}>Password</Text>

            <View
              style={{
                borderWidth: 1,
                marginTop: 8,
                borderColor: errorPassword ? '#EA8685' : '#132040',
                borderColor: '#132040',
                backgroundColor: '#F2F4F9',
                borderRadius: 8,
                padding: 4,
              }}>
              <TextInput
                value={password}
                secureTextEntry={visible} //untuk visible password
                style={{
                  color: '#000',
                  fontSize: 16,
                }}
                placeholder="Password"
                placeholderTextColor={'#B4BDC3'}
                onChangeText={value => {
                  console.log('VALUE PASSWORD ', value);
                  setPassword(value);
                  validation();
                }}
              />

              <View style={{position: 'absolute', bottom: -25, right: 5}}>
                <Text color="#EA8685">{errorPassword}</Text>
              </View>

              {/* <TouchableOpacity
            onPress={() => setVisible(!visible)}
              style={{
                position: "absolute",
                right: 12,
                top: 15,
              }}
            >
                {
                    visible ? (
                        <EyeIcon width={20} height={20} />
                    ): (
                        <EyeSlashIcon width={20} height={20} />
                    )
                }
              
            </TouchableOpacity> */}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text
                style={{
                  marginTop: 25,
                  marginLeft: 5,
                  fontSize: 16,
                  textAlign: 'right',
                  color: '#f6e58d',
                }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Button Login */}
          <TouchableOpacity
            disabled={isEnable}
            onPress={() => {
              handleLogin()
            }}
            style={{
              opacity: isEnable ? 0.5 : 1,
              backgroundColor: '#A37D4C',
              borderRadius: 8,
              paddingVertical: 12,
              alignItems: 'center',
              marginTop: 30,
            }}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#160520" />
            ) : (
              <Text style={{fontSize: 17, fontWeight: 'bold', color: '#fff'}}>
                Login
              </Text>
            )}
          </TouchableOpacity>

          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 16}}>
              Dont Have an Account?{' '}
              <Text
                style={{fontWeight: 'bold', color: '#f6e58d'}}
                onPress={() => navigation.navigate('Register')}>
                Sign Up
              </Text>{' '}
            </Text>
          </View>
          <View>
          <TouchableOpacity onPress={() => navigation.navigate('LoginStaff')}>
            <Text style={{color:"#fff", textAlign:"center", textDecorationLine:"underline", fontWeight:"400", fontSize:16, top:230}}>Login as Staff</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  };

export default Login;

import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import img from '../../assets/img';
import {HEIGHT, WIDTH} from '../../assets/style';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const baseUrl = 'http://10.0.2.2:8000';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const handleSendResetEmail = async () => {
    try {
      setIsLoading(true);
      const requestBody = {
        email: email,
        role: "C",
      };

      const response = await axios.post(`${baseUrl}/api/password/reset/request`, requestBody);

      if (response.status === 200) {
        Alert.alert('Reset Password Email Send!', 'Please check your email to get the token!', [
            {
              text: 'OK',
             onPress: () => {
                setIsSend(true)
              },
            }
          ]);
      } else {
        Alert.alert('Send Email Failed!', 'Email not found', [
            {
              text: 'OK',
            },
          ]);
        setIsLoading(false);
      }
    } catch (error) {
    //   console.error("Forgot Password API Error:", error);
    Alert.alert('Send Email Failed!', 'Email not found', [
        {
          text: 'OK',
        },
      ]);
      setIsLoading(false);
    }finally {
      setIsLoading(false);
    }
  };

  const handleSubmitNewPassword = async () => {
    try {
      setIsLoading(true);
      const requestBody = {
        email: email,
        role: "C",
        token: token,
        password: password,
      };

      console.log("TOKEN", token);
      const response = await axios.post(`${baseUrl}/api/password/reset`, requestBody);

      if (response.status === 200) {
        Alert.alert('Reset Password Successful', 'Password has been changed', [
            {
              text: 'OK',
             onPress: () => {
                navigation.navigate('Login');
              },
            }
          ]);
      } else {
        Alert.alert('Reset Password Failed!', 'Token not match!', [
            {
              text: 'OK',
            },
          ]);
      }
    } catch (error) {
    //   console.error("Reset Password API Error:", error);
      Alert.alert('Reset Password Failed!', 'Token not match!', [
        {
          text: 'OK',
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={img.BGPROFILE}
      style={{width: WIDTH, height: HEIGHT}}
      resizeMode="cover">
      <View style={{marginHorizontal: 16}}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginPegawai')}>
          <Image
            source={img.BACK}
            style={{
              position: 'absolute',
              top: 30,
              tintColor: '#fff',
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>
        {/* <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 90,
              }}> */}
        {/* <Image source={img.LOGOBAWAH} style={{width: 200, height: 80}} /> */}
        <Text
          style={{
            color: '#fff',
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 30,
            textAlign: 'center',
          }}>
          Forgot Password
        </Text>
        {/* </View> */}
        {!isSend ? (

        <View style={{marginTop: 50}}>
          <Text style={{fontSize: 16, color: '#fff'}}>Email</Text>

          <View
            style={{
              borderWidth: 1,
              marginTop: 8,
              borderColor: '#132040',
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
                setEmail(value);
              }}
            />
          </View>
        </View>
        ) : ""}
        {isSend ? (
          <>
            <View style={{marginTop: 27}}>
              <Text style={{fontSize: 16, color: '#fff'}}>Token</Text>

              <View
                style={{
                  borderWidth: 1,
                  marginTop: 8,
                  borderColor: '#132040',
                  borderColor: '#132040',
                  backgroundColor: '#F2F4F9',
                  borderRadius: 8,
                  padding: 4,
                }}>
                <TextInput
                  value={token}
                  keyboardType='number-pad'
                  style={{
                    color: '#000',
                    fontSize: 16,
                  }}
                  placeholder="Input Token"
                  placeholderTextColor={'#B4BDC3'}
                  onChangeText={value => {
                    setToken(value);
                  }}
                />
              </View>
            </View>
            <View style={{marginTop: 27}}>
              <Text style={{fontSize: 16, color: '#fff'}}>Password</Text>

              <View
                style={{
                  borderWidth: 1,
                  marginTop: 8,
                  borderColor: '#132040',
                  borderColor: '#132040',
                  backgroundColor: '#F2F4F9',
                  borderRadius: 8,
                  padding: 4,
                }}>
                <TextInput
                  value={password}
                  secureTextEntry={visible}
                  style={{
                    color: '#000',
                    fontSize: 16,
                  }}
                  placeholder="Password"
                  placeholderTextColor={'#B4BDC3'}
                  onChangeText={value => {
                    setPassword(value);
                  }}
                />
              </View>
            </View>
          </>
        ) : (
          ''
        )}

        {/* Button Login */}
        <TouchableOpacity
          onPress={() => {
            {!isSend ? handleSendResetEmail() : handleSubmitNewPassword() }
          }}
          style={{
            opacity: 1,
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
                {isSend ? "Submit" : "Send Reset Email"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ForgotPassword;

import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import img from '../../assets/img';
import {HEIGHT, WIDTH} from '../../assets/style';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const baseUrl = 'http://192.168.100.121/backend_p3l/public'

const Register = () => {
  const navigation = useNavigation();
  const [isEnable, setIsEnable] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [identityNo, setIdentityNo] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const [visible, setVisible] = useState(true);
  const [visibleConfirm, setVisibleConfirm] = useState(true);
  const [errorName, setErrorName] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorIdentityNo, setErrorIdentityNo] = useState('');
  const [errorAddress, setErrorAddress] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    validation();
  }, [password, email, name, phoneNumber, identityNo, address]);

  const validation = () => {
    let vMail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email && password && name && phoneNumber && identityNo && address) {
      setIsEnable(false);
    } else {
      if (password) {
        setErrorPassword('');
        if (password.length > 0 && password.length < 8) {
          setErrorPassword('Password must less than 8 characters');
          setIsEnable(true);
        } else {
          setErrorPassword('');
        }
      } else {
        setErrorPassword('Password must be filled in');
        setIsEnable(true);
      }

      if (email) {
        setErrorMail('');
        if (vMail.test(email)) {
          setErrorMail('');
        } else {
          setErrorMail('Email not Valid');
          setIsEnable(true);
        }
      } else {
        if (email === '') {
          setErrorMail('Email must be filled in');
          setIsEnable(true);
        }

        setIsEnable(true);
      }

      if (name) {
        setErrorName('');
      } else {
        setErrorName('Name must be filled in');
        setIsEnable(true);
      }

      if (phoneNumber) {
        setErrorPhone('');

        if (phoneNumber.length < 10) {
          setErrorPhone('Phone number must be at least 10 digits');
          setIsEnable(true);
        }
      } else {
        setErrorPhone('Phone must be filled in');
        setIsEnable(true);
      }

      if (identityNo) {
        setErrorIdentityNo('');

        if (identityNo.length != 16) {
          setErrorIdentityNo('Identity number must be 16 digits');
          setIsEnable(true);
        }
      } else {
        setErrorIdentityNo('Identity number must be filled in');
        setIsEnable(true);
      }

      if (address) {
        setErrorAddress('');
      } else {
        setErrorAddress('Address must be filled in');
        setIsEnable(true);
      }
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      setIsEnable(true);

      const requestBody = {
        nama: name,
        email: email,
        no_identitas: identityNo,
        no_telepon: phoneNumber,
        alamat: address,
        role: 'P',
        password: password,
      };
      console.log(requestBody);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };

      const response = await axios.post(
        `${baseUrl}/api/register`,
        requestBody,
        config,
      );

      if (response.status === 200) {
        console.log('RESPONSE', JSON.stringify(response, null, 2));
        Alert.alert('Register Successful', 'You have successfully register!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
      } else {
      }
    } catch (error) {
      console.log('Register Error', error);
      Alert.alert('Register Failed', '', [
        {
          text: 'OK',
        },
      ]);
      setErrorName('Name not Valid');
      setErrorMail('Email not Valid');
      setErrorPhone('Phone not Valid');
      setErrorIdentityNo('Identity Number not Valid');
      setErrorAddress('Address not Valid');
      setErrorPassword('Password not Valid');
    } finally {
      setIsLoading(false);
      setIsEnable(false);
    }
  };

  return (
    <ImageBackground
      source={img.BGPROFILE}
      style={{width: WIDTH, height: HEIGHT}}
      resizeMode="cover">
      <KeyboardAvoidingView behavior="height">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 16}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Login')}>
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
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Image source={img.LOGOBAWAH} style={{width: 200, height: 80}} />
              <Text
                style={{
                  color: '#A37D4C',
                  fontSize: 30,
                  fontWeight: 'bold',
                  marginVertical: 8,
                }}>
                Register
              </Text>
            </View>

            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 16, color: '#fff'}}>Name</Text>

              <View
                style={{
                  borderWidth: 1,
                  marginTop: 8,
                  borderColor: errorName ? '#EA8685' : '#132040',
                  borderColor: '#132040',
                  backgroundColor: '#F2F4F9',
                  borderRadius: 8,
                  padding: 6,
                }}>
                <TextInput
                  value={name}
                  keyboardType={'default'}
                  autoCapitalize="none"
                  style={{
                    color: '#000',
                    fontSize: 16,
                  }}
                  placeholder="Enter Your Name"
                  placeholderTextColor={'#B4BDC3'}
                  onChangeText={value => {
                    console.log('VALUE NAME ', value);
                    setName(value);
                    validation();
                  }}
                />
              </View>
              <View style={{position: 'absolute', bottom: -25, right: 5}}>
                <Text color="#EA8685">{errorName}</Text>
              </View>
            </View>

            <View style={{marginTop: 27}}>
              <Text style={{fontSize: 16, color: '#fff'}}>Email</Text>

              <View
                style={{
                  borderWidth: 1,
                  marginTop: 8,
                  borderColor: errorMail ? '#EA8685' : '#132040',
                  borderColor: '#132040',
                  backgroundColor: '#F2F4F9',
                  borderRadius: 8,
                  padding: 6,
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
                <Text color="#EA8685">{errorMail}</Text>
              </View>
            </View>

            <View style={{marginTop: 27}}>
              <Text style={{fontSize: 16, color: '#fff'}}>Phone</Text>

              <View
                style={{
                  borderWidth: 1,
                  marginTop: 8,
                  borderColor: errorPhone ? '#EA8685' : '#132040',
                  borderColor: '#132040',
                  backgroundColor: '#F2F4F9',
                  borderRadius: 8,
                  padding: 6,
                }}>
                <TextInput
                  value={phoneNumber}
                  keyboardType={'number-pad'}
                  style={{
                    color: '#000',
                    fontSize: 16,
                  }}
                  placeholder="Enter Your Phone"
                  placeholderTextColor={'#B4BDC3'}
                  onChangeText={value => {
                    console.log('VALUE PHONE ', value);
                    setPhoneNumber(value);
                    validation();
                  }}
                  maxLength={15}
                />
              </View>
              <View style={{position: 'absolute', bottom: -25, right: 5}}>
                <Text color="#EA8685">{errorPhone}</Text>
              </View>
            </View>

            <View style={{marginTop: 27}}>
              <Text style={{fontSize: 16, color: '#fff'}}>Identity Number</Text>

              <View
                style={{
                  borderWidth: 1,
                  marginTop: 8,
                  borderColor: errorIdentityNo ? '#EA8685' : '#132040',
                  borderColor: '#132040',
                  backgroundColor: '#F2F4F9',
                  borderRadius: 8,
                  padding: 6,
                }}>
                <TextInput
                  value={identityNo}
                  keyboardType={'default'}
                  style={{
                    color: '#000',
                    fontSize: 16,
                  }}
                  placeholder="Enter Your Identity Number"
                  placeholderTextColor={'#B4BDC3'}
                  onChangeText={value => {
                    console.log('VALUE NIK ', value);
                    setIdentityNo(value);
                    validation();
                  }}
                  maxLength={16}
                />
              </View>
              <View style={{position: 'absolute', bottom: -25, right: 5}}>
                <Text color="#EA8685">{errorIdentityNo}</Text>
              </View>
            </View>

            <View style={{marginTop: 27}}>
              <Text style={{fontSize: 16, color: '#fff'}}>Address</Text>

              <View
                style={{
                  borderWidth: 1,
                  marginTop: 8,
                  borderColor: errorAddress ? '#EA8685' : '#132040',
                  borderColor: '#132040',
                  backgroundColor: '#F2F4F9',
                  borderRadius: 8,
                  padding: 6,
                }}>
                <TextInput
                  value={address}
                  keyboardType={'default'}
                  multiline={true}
                  numberOfLines={4}
                  style={{
                    color: '#000',
                    fontSize: 16,
                  }}
                  placeholder="Enter Your Address"
                  placeholderTextColor={'#B4BDC3'}
                  onChangeText={value => {
                    console.log('VALUE ADDRESS ', value);
                    setAddress(value);
                    validation();
                  }}
                />
              </View>
              <View style={{position: 'absolute', bottom: -25, right: 5}}>
                <Text color="#EA8685">{errorAddress}</Text>
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
                  padding: 6,
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
                    console.log('VALUE PASSWORD ', value);
                    setPassword(value);
                    validation();
                  }}
                />

                <View style={{position: 'absolute', bottom: -25, right: 5}}>
                  <Text color="#EA8685">{errorPassword}</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setVisible(!visible)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: 15,
                  }}>
                  {/* {visible ? (
                    <EyeIcon width={20} height={20} />
                  ) : (
                    <EyeSlashIcon width={20} height={20} />
                  )} */}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              disabled={isEnable}
              onPress={() => handleRegister()}
              style={{
                opacity: isEnable ? 0.5 : 1,
                opacity: 1,
                backgroundColor: '#A37D4C',
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: 'center',
                marginTop: 44,
                marginBottom: 110,
              }}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#160520" />
              ) : (
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
                  Register
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Register;

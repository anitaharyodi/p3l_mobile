import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, Alert} from 'react-native';
import {HEIGHT, WIDTH} from '../../assets/style';
import styles from './styles';
import img from '../../assets/img';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useLogin } from '../../Context/HotelContext';
const baseUrl = 'http://10.0.2.2:8000';

const Profile = () => {
  const navigation = useNavigation();
  const { isLogin, setIsLogin, token, setToken } = useLogin();
  const [profileData, setProfileData] = useState({});
  console.log('CEK LOGIN', isLogin)

  useEffect(() => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${baseUrl}/api/getProfile`, axiosConfig)
      .then((response) => {
        const { data } = response.data;
        const { nama, email, no_identitas, no_telepon, alamat } =
          data.customers;
        setProfileData({
          name: nama,
          email,
          noIdentitas: no_identitas,
          noTelepon: no_telepon,
          alamat,
        });
      })
      .catch((error) => {
        // console.error("Error fetching profile data: ", error.response);
      });
  }, [token]);

  console.log('MAU CEK TOKEN', token)

  const handleLogout = async () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?', 
      [
        { 
          text: 'Cancel',
          style: 'cancel',
        },
        { 
          text: 'Logout',
          onPress: async () => {
            try {

              const headers = {
                Authorization: `Bearer ${token}`,
              };

              const response = await axios.post(`${baseUrl}/api/logout`, null, { headers });

              if (response.status === 200) {
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("email");
                setIsLogin(false) 
                navigation.navigate('Home');
              }
            } catch (error) {
              console.error("Logout Error", error.response);
            }
          },
        },
      ]
    );
  };

  const { name, email, noIdentitas, noTelepon, alamat } = profileData;

  const updateProfileCallback = (newProfileData) => {
    setProfileData(newProfileData);
  };

  return (
    <View style={{backgroundColor: 'white', width: WIDTH, height: HEIGHT}}>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          <Image source={img.BGPROFILE} style={styles.backgroundImage} />
          {isLogin ? (
          <TouchableOpacity onPress={() => {
            navigation.navigate('EditProfile', {profileData: profileData, updateProfileCallback: updateProfileCallback })
          }}> 
            <Image
              source={img.EDITICON}
              style={{
                position: 'absolute',
                right: 20,
                top: 18,
                tintColor: '#fff',
              }}
            />
          </TouchableOpacity>
            
          ): null}
          <View style={styles.profileImageContainer}>
            <Image source={img.LOGOAJA} style={styles.profileImage} />
          </View>
          <View style={styles.textContainer}>
            {isLogin ? (
              <><Text style={styles.headingText}>{name}</Text><Text style={styles.subText}>{email}</Text>
              <TouchableOpacity style={styles.changePasswordButton} onPress={() => {
                navigation.navigate('ChangePassword')
              }}>
                  <Text style={styles.changePasswordButtonText}>
                    Change Password
                  </Text>
                </TouchableOpacity></>
            ) : (
              <Text style={{color:"#fff", fontSize: 20, fontWeight:"bold", marginTop:40}}>You are not Sign In</Text>

            )}
          </View>
        </View>
        {isLogin ? (

        <View style={{paddingVertical: 24}}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 24,
              elevation: 2,
              borderColor: '#A37D4C',
              marginTop: -80,
              borderRadius: 20,
              marginHorizontal: 16,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 16}}>Identity Number</Text>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{noIdentitas}</Text>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 0.8,
                height: 0.8,
                borderRadius: 0.4,
                borderColor: '#BFC7D0',
                marginTop: 16,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16,
              }}>
              <Text style={{fontSize: 16}}>Phone Number</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>{noTelepon}</Text>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 0.8,
                height: 0.8,
                borderRadius: 0.4,
                borderColor: '#BFC7D0',
                marginTop: 16,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16,
              }}>
              <Text style={{fontSize: 16}}>Address</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold', width: 200, textAlign: 'right'}}>
                {alamat}
              </Text>
            </View>
          </View> 
        </View>
        ): null}
        <View style={{paddingHorizontal: 16}}>
          {isLogin ? (
          <TouchableOpacity
            style={styles.bookNowButton}
            onPress={() => {
              handleLogout()
            }}>
            <Text style={styles.bookNowText}>Logout</Text>
          </TouchableOpacity>

          ): (
          <TouchableOpacity style={styles.bookNowButton}>
            <Text
              style={styles.bookNowText}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              Login
            </Text>
          </TouchableOpacity>

          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

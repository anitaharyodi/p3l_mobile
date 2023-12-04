import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HEIGHT, WIDTH} from '../../assets/style';
import styles from './styles';
import img from '../../assets/img';
import {useLogin} from '../../Context/HotelContext';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = 'https://ah-project.my.id'

const ProfileStaff = () => {
  const navigation = useNavigation();
  const {isLoginPegawai, setIsLoginPegawai, tokenPegawai, setTokenPegawai} =
    useLogin();
  const [emailPegawai, setEmailPegawai] = useState('');

  useEffect(() => {
    const getEmailPegawai = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('emailPegawai');
        setEmailPegawai(storedEmail || ''); // Set default value if null
      } catch (error) {
        console.error('Error retrieving emailPegawai', error);
      }
    };

    getEmailPegawai();
  }, []);

  console.log(isLoginPegawai);
  const handleLogout = async () => {
    Alert.alert('Logout Confirmation', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            const headers = {
              Authorization: `Bearer ${tokenPegawai}`,
            };

            const response = await axios.post(`${baseUrl}/api/logout`, null, {
              headers,
            });
            console.log(JSON.stringify(response, null, 2));
            if (response.status === 200) {
              await AsyncStorage.removeItem('tokenPegawai');
              await AsyncStorage.removeItem('emailPegawai');
              setIsLoginPegawai(false);
              navigation.navigate('LoginStaff');
            }
          } catch (error) {
            console.error('Logout Error', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={{backgroundColor: 'white', width: WIDTH, height: HEIGHT}}>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          <Image source={img.BGPROFILE} style={styles.backgroundImage} />
          <View style={styles.profileImageContainer}>
            <Image source={img.LOGOAJA} style={styles.profileImage} />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 40,
              }}>
              {emailPegawai}
            </Text>
          </View>
        </View>
        {isLoginPegawai ? (
          <View style={{paddingHorizontal: 16}}>
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={() => {
                handleLogout();
              }}>
              <Text style={styles.bookNowText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ProfileStaff;

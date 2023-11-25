import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import styles from '../styles';
import {HEIGHT, WIDTH} from '../../../assets/style';
import img from '../../../assets/img';
import {useLogin} from '../../../Context/HotelContext';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const baseUrl = 'http://192.168.100.121/backend_p3l/public'

const ChangePassword = () => {
  const navigation = useNavigation();
  const {token} = useLogin();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const handleChange = async () => {
    Alert.alert(
      'Change Password Confirmation',
      'Are you sure want to change your password?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Change',
          onPress: async () => {
            try {
              const requestBody = {
                old_password: oldPassword,
                password: newPassword,
              };
              console.log(requestBody);

              const axiosConfig = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };

              const response = await axios.post(
                `${baseUrl}/api/customer/changePassword`,
                requestBody,
                axiosConfig,
              );

              if (response.status === 200) {
                console.log('RESPONSE', JSON.stringify(response, null, 2));
                Alert.alert(
                  'Change Password Successful',
                  'You have successfully change your password!',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.navigate('Profile');
                      },
                    },
                  ],
                );
              } else {
              }
            } catch (error) {
              console.log('Change Password Error', error);
              Alert.alert('Change Password Failed', '', [
                {
                  text: 'OK',
                },
              ]);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={{backgroundColor: 'white', width: WIDTH, height: HEIGHT}}>
      <ScrollView>
        <View style={styles.backgroundEdit}>
          <Image source={img.BGPROFILE} style={styles.backgroundImage} />
          <View style={{padding: 24}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={img.BACK} style={styles.backButtonText} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Change Password</Text>
        </View>
        <View style={{paddingVertical: 24}}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 24,
              borderColor: '#A37D4C',
              marginTop: -80,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View>
              <Text style={{fontSize: 16, marginBottom: 6, color: '#000'}}>
                Old Password
              </Text>
              <TextInput
                value={oldPassword}
                secureTextEntry={true}
                placeholder="Input old password"
                autoCapitalize="none"
                style={{
                  paddingStart: 10,
                  borderRadius: 10,
                  backgroundColor: '#F2F4F9',
                  color: "#000"
                }}
                placeholderTextColor={'lightgray'}
                onChangeText={text => setOldPassword(text)}></TextInput>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 0.8,
                height: 0.8,
                borderRadius: 0.4,
                borderColor: '#BFC7D0',
                marginVertical: 16,
              }}
            />
            <View>
              <Text style={{fontSize: 16, marginBottom: 6, color: '#000'}}>
                New Password
              </Text>
              <TextInput
                value={newPassword}
                secureTextEntry={true}
                placeholder="Input new password"
                autoCapitalize="none"
                style={{
                  paddingStart: 10,
                  borderRadius: 10,
                  backgroundColor: '#F2F4F9',
                  color: "#000"
                }}
                placeholderTextColor={'lightgray'}
                onChangeText={text => setNewPassword(text)}></TextInput>
            </View>
            <TouchableOpacity
              onPress={handleChange}
              style={styles.bookNowButton}>
              <Text style={styles.bookNowText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangePassword;

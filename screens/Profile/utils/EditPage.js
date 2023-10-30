import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {HEIGHT, WIDTH} from '../../../assets/style';
import styles from '../styles';
import img from '../../../assets/img';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import {useLogin} from '../../../Context/HotelContext';
import {useNavigation} from '@react-navigation/native';
const baseUrl = 'http://10.0.2.2:8000';

const EditPage = ({navigation, route}) => {
  const navigations = useNavigation();
  const {profileData} = route.params;
  const {token} = useLogin();
  console.log('CEK PROFILE EDIT', profileData);
  const [name, setName] = useState(profileData.name);
  const [email, setEmail] = useState(profileData.email);
  const [identityNumber, setIdentityNumber] = useState(profileData.noIdentitas);
  const [phoneNumber, setPhoneNumber] = useState(profileData.noTelepon);
  const [address, setAddress] = useState(profileData.alamat);

  const handleUpdate = async () => {
    Alert.alert(
      'Update Confirmation',
      'Are you sure want to update your profile?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: async () => {
            try {
              const requestBody = {
                nama: name,
                email: email,
                no_identitas: identityNumber,
                no_telepon: phoneNumber,
                alamat: address,
                role: 'P',
              };
              console.log(requestBody);

              const axiosConfig = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };

              const response = await axios.post(
                `${baseUrl}/api/customer/updateProfile`,
                requestBody,
                axiosConfig,
              );

              if (response.status === 200) {
                console.log('RESPONSE', JSON.stringify(response, null, 2));
                route.params.updateProfileCallback({
                  ...profileData,
                  name,
                  email,
                  noIdentitas: identityNumber,
                  noTelepon: phoneNumber,
                  alamat: address,
                });
                Alert.alert(
                  'Update Profile Successful',
                  'You have successfully update profile!',
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
              console.log('Update Profile Error', error);
              Alert.alert('Update Profile Failed', '', [
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
            <TouchableOpacity onPress={() => navigations.goBack()}>
              <Image source={img.BACK} style={styles.backButtonText} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Adjust the offset as needed
        >
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
                  Name
                </Text>
                <TextInput
                  value={name}
                  placeholder="Input name"
                  autoCapitalize="none"
                  style={{
                    paddingStart: 10,
                    borderRadius: 10,
                    backgroundColor: '#F2F4F9',
                  }}
                  onChangeText={text => setName(text)}></TextInput>
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
                  Email
                </Text>
                <TextInput
                  value={email}
                  placeholder="Input email"
                  autoCapitalize="none"
                  keyboardType={'email-address'}
                  style={{
                    paddingStart: 10,
                    borderRadius: 10,
                    backgroundColor: '#F2F4F9',
                  }}
                  onChangeText={text => setEmail(text)}></TextInput>
              </View>
              <View
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 0.8,
                  height: 0.8,
                  borderRadius: 0.4,
                  borderColor: '#BFC7D0',
                  marginTop: 16,
                  marginVertical: 16,
                }}
              />
              <View>
                <Text style={{fontSize: 16, marginBottom: 6, color: '#000'}}>
                  Identity Number
                </Text>
                <TextInput
                  value={identityNumber}
                  placeholder="Input identity number"
                  autoCapitalize="none"
                  style={{
                    paddingStart: 10,
                    borderRadius: 10,
                    backgroundColor: '#F2F4F9',
                  }}
                  onChangeText={text => setIdentityNumber(text)}></TextInput>
              </View>
              <View
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 0.8,
                  height: 0.8,
                  borderRadius: 0.4,
                  borderColor: '#BFC7D0',
                  marginTop: 16,
                  marginVertical: 16,
                }}
              />
              <View>
                <Text style={{fontSize: 16, marginBottom: 6, color: '#000'}}>
                  Phone Number
                </Text>
                <TextInput
                  value={phoneNumber}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  placeholder="Input phone number"
                  style={{
                    paddingStart: 10,
                    borderRadius: 10,
                    backgroundColor: '#F2F4F9',
                  }}
                  onChangeText={text => setPhoneNumber(text)}></TextInput>
              </View>
              <View
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 0.8,
                  height: 0.8,
                  borderRadius: 0.4,
                  borderColor: '#BFC7D0',
                  marginTop: 16,
                  marginVertical: 16,
                }}
              />
              <View>
                <Text style={{fontSize: 16, marginBottom: 6, color: '#000'}}>
                  Address
                </Text>
                <TextInput
                  value={address}
                  placeholder="Input address"
                  autoCapitalize="none"
                  multiline={true}
                  numberOfLines={4}
                  style={{
                    paddingStart: 10,
                    borderRadius: 10,
                    backgroundColor: '#F2F4F9',
                  }}
                  onChangeText={text => setAddress(text)}></TextInput>
              </View>
              <TouchableOpacity
                onPress={handleUpdate}
                style={styles.bookNowButton}>
                <Text style={styles.bookNowText}>Update Data</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default EditPage;

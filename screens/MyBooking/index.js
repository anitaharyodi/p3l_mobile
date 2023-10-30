import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {HEIGHT, WIDTH} from '../../assets/style';
import {TabView, TabBar} from 'react-native-tab-view';
import CardHistory from './utils/CardHistory';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useLogin} from '../../Context/HotelContext';
import img from '../../assets/img';
import styles from './styles';
const baseUrl = 'http://10.0.2.2:8000';

const MyBooking = () => {
  const navigation = useNavigation();
  const {token, isLogin} = useLogin();
  const [profileData, setProfileData] = useState();
  const [bookingData, setBookingData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${baseUrl}/api/history`, axiosConfig)
      .then(response => {
        const {nama, email, no_telepon} = response.data.mess.customers;
        setProfileData({
          name: nama,
          email: email,
          noTelepon: no_telepon,
        });
        setBookingData(response.data.mess.customers.reservations);
      })
      .catch(error => {
        // console.error("Error fetching profile data: ", error.response);
      });
  }, [token]);

  const filteredHistory = bookingData.filter(
    item =>
      item.id_booking.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.status.toLowerCase().includes(searchInput.toLowerCase()),
  );

  return (
    <View style={{backgroundColor: 'white', width: WIDTH, height: HEIGHT}}>
      <ScrollView>
        <View style={{paddingHorizontal: 16, marginTop: 24, marginBottom: 150}}>
          <Text style={{fontSize: 24, color: '#000', fontWeight: 'bold'}}>
            History Reservation
          </Text>
          <TextInput
            placeholder="Search"
            value={searchInput}
            style={{
              paddingHorizontal: 16,
              backgroundColor: '#F2F4F9',
              borderRadius: 10,
              marginTop: 16,
            }}
            onChangeText={text => setSearchInput(text)}
          />
          {isLogin ? (
            <View style={{marginTop: 30}}>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((booking, index) => (
                  <View key={index}>
                    <CardHistory
                      id={booking.id}
                      idBooking={booking.id_booking}
                      status={booking.status}
                      tglCheckin={booking.tgl_checkin}
                      tglCheckout={booking.tgl_checkout}
                      tglPembayaran={booking.tgl_pembayaran}
                      totalHarga={booking.total_harga}
                      nama={profileData.name}
                      email={profileData.email}
                      noTelepon={profileData.noTelepon}
                      jmlDewasa={booking.jumlah_dewasa}
                      jmlAnak={booking.jumlah_anak}
                      uangJaminan={booking.uang_jaminan}
                    />
                  </View>
                ))
              ) : (
                <View
                  style={styles.container}
                  showsVerticalScrollIndicator={false}>
                  <View style={styles.container}>
                    <Image source={img.NOTFOUND} style={styles.notFound} />
                    <View style={{marginTop: 36}}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontWeight: 'bold',
                          width: WIDTH,
                          textAlign: 'center',
                        }}>
                        Data Not Found
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ) : (
            ''
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyBooking;

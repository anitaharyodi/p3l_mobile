import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import styles from '../styles';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useLogin } from '../../../Context/HotelContext';
const baseUrl = 'http://192.168.100.121/backend_p3l/public'

const CardHistory = ({
  id,
  idBooking,
  status,
  tglCheckin,
  tglCheckout,
  tglPembayaran,
  totalHarga,
  nama,
  email,
  noTelepon,
  jmlDewasa,
  jmlAnak,
  uangJaminan,
}) => {
  const navigation = useNavigation()
  const {token, isLogin} = useLogin();
  const formatCurrency = number => {
    return `Rp ${new Intl.NumberFormat('id-ID').format(number)}`;
  };

  const formatDate = dateString => {
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const showCancelConfirmation = (bookingId) => {
  Alert.alert(
    'Confirmation',
    'Are you sure you want to cancel this booking?',
    [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => handlePembatalan(bookingId),
      },
    ],
  );
};


  const handlePembatalan = (bookingId) => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const apiURL = `${baseUrl}/api/reservasi/pemesananBatal/${bookingId}`;
    axios
      .post(apiURL, null, axiosConfig)
      .then((response) => {
        console.log(JSON.stringify(response, null, 2))
        if(response.status === 200) {
          Alert.alert('Success', 'Your booking has been cancelled!', [{ text: 'OK', onPress: () => navigation.navigate('History', { key: Date.now() }) }]);
        } 
      })
      .catch((error) => {
        console.error(error);
      }); 
}

  return (
    <View style={{marginBottom: 26}}>
      <View
        style={{
          backgroundColor: '#F2F4F9',
          padding: 24,
          borderRadius: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              flexShrink: 1,
            }}>
            <View style={{justifyContent: 'center'}}></View>
            <View
              style={{
                justifyContent: 'center',
                flexShrink: 1,
                marginRight: 8,
              }}>
              <Text
                style={{
                  flexShrink: 1,
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: 18,
                  marginBottom: 16,
                }}>
                #{idBooking}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderColor:
                status === 'Paid'
                  ? '#4A9468'
                  : status === 'Waiting for payment'
                  ? '#C4850F'
                  : status === 'Confirmed' || status === 'Check-In'
                  ? '#045AAC'
                  : '#AC2020',
              backgroundColor:
                status === 'Paid'
                  ? '#DAEEE2'
                  : status === 'Waiting for payment'
                  ? '#FBE9BE'
                  : status === 'Confirmed' || status === 'Check-In'
                  ? '#E6EEF7'
                  : '#FAD8D2',
              borderWidth: 1,
              borderRadius: 6,
              justifyContent: 'center',
              paddingHorizontal: 8,
              height: 30,
            }}>
            <Text
              style={{
                fontSize: 16,
                color:
                  status === 'Paid'
                    ? '#4A9468'
                    : status === 'Waiting for payment'
                    ? '#C4850F'
                    : status === 'Confirmed' || status === 'Check-In'
                    ? '#045AAC'
                    : '#AC2020',
              }}>
              {status}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderStyle: 'dashed',
            borderWidth: 0.8,
            height: 0.8,
            borderRadius: 0.4,
            borderColor: '#BFC7D0',
            marginBottom: 16,
          }}
        />
        <View style={{flexDirection: 'row', marginBottom: 16}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                letterSpacing: 0.4,
                lineHeight: 17,
                fontSize: 16,
                color: "#000",
              }}>
              Check-In
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                letterSpacing: 0.4,
                lineHeight: 17,
                fontSize: 16,
                fontWeight: 'bold',
                color: "#000",
              }}>
              {formatDate(tglCheckin)}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 16}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                letterSpacing: 0.4,
                lineHeight: 17,
                fontSize: 16,
                color: "#000",
              }}>
              Check-Out
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                letterSpacing: 0.4,
                lineHeight: 17,
                fontSize: 16,
                fontWeight: 'bold',
                color: "#000",
              }}>
              {formatDate(tglCheckout)}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 16}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                letterSpacing: 0.4,
                lineHeight: 17,
                fontSize: 16,
                color: "#000",
              }}>
              Total
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                letterSpacing: 0.4,
                lineHeight: 17,
                fontSize: 16,
                fontWeight: 'bold',
                color: "#000",
              }}>
              {formatCurrency(totalHarga)}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 16}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                letterSpacing: 0.4,
                lineHeight: 17,
                fontSize: 16,
                color: "#000",
              }}>
              Paid Date
            </Text>
          </View>
          <View style={{flex: 1}}>
            {tglPembayaran === null  ? (
               <Text
               style={{
                 letterSpacing: 0.4,
                 lineHeight: 17,
                 fontSize: 16,
                 fontWeight: 'bold',
                 color: "#000",
               }}>
               -
             </Text>
            ): (
            <Text
              style={{
                letterSpacing: 0.4,
                lineHeight: 17,
                fontSize: 16,
                fontWeight: 'bold',
                color: "#000",
              }}>
              {formatDate(tglPembayaran)}
            </Text>

            )}
          </View>
        </View>

        {status == "Waiting for payment" || status === "Confirmed" ? (
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <TouchableOpacity
                onPress={() => showCancelConfirmation(id)}
                >
                  <View style={styles.lihat}>
                    <Text style={styles.cancel}>Cancel Booking</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate('DetailHistory', {id: id})}
                >
                  <View style={styles.lihat}>
                    <Text style={styles.textLihat}>See details</Text>
                  </View>
                </TouchableOpacity>

        </View>

        ) : (
          <TouchableOpacity
          onPress={() => navigation.navigate('DetailHistory', {id: id})}
          >
            <View style={styles.lihat}>
              <Text style={styles.textLihat}>See details</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CardHistory;

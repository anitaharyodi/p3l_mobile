import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styles';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

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

  const formatCurrency = number => {
    return `Rp ${new Intl.NumberFormat('id-ID').format(number)}`;
  };

  const formatDate = dateString => {
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

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
                status === 'Lunas'
                  ? '#4A9468'
                  : status === 'Menunggu Pembayaran'
                  ? '#C4850F'
                  : status === 'Check-In'
                  ? '#045AAC'
                  : '#AC2020',
              backgroundColor:
                status === 'Lunas'
                  ? '#DAEEE2'
                  : status === 'Menunggu Pembayaran'
                  ? '#FBE9BE'
                  : status === 'Check-In'
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
                  status === 'Lunas'
                    ? '#4A9468'
                    : status === 'Menunggu Pembayaran'
                    ? '#C4850F'
                    : status === 'Check-In'
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
              }}>
              Paid Date
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                letterSpacing: 0.4,
                lineHeight: 17,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {formatDate(tglPembayaran)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
        onPress={() => navigation.navigate('DetailHistory', {id: id})}
        >
          <View style={styles.lihat}>
            <Text style={styles.textLihat}>Lihat detail</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardHistory;

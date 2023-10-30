import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from '../styles';
import img from '../../../assets/img';
import { useNavigation } from '@react-navigation/native';

const roomImages = [img.ROOM1, img.ROOM2, img.ROOM3, img.ROOM1];

const CardRoom = ({item, imageIndex}) => {
  console.log(imageIndex)
  const imageUrl = roomImages[imageIndex];
  const navigation = useNavigation()

  const formatCurrencyIDR = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    return formatter.format(amount).replace("Rp", "IDR");
  };

  return (
    <TouchableOpacity
      style={{
        marginRight: 16,
        backgroundColor: '#F2F4F9',
        borderRadius: 8,
        width: 363,
        marginBottom: 24,
        // marginEnd: 0
      }}
      onPress={() => navigation.navigate('RoomDetail', { item: item, imageIndex: imageIndex })}
      >
      <View>
        <Image source={imageUrl} style={styles.BannerImg} />
      </View>
      <View style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
            {item.jenis_kamar}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#A37D4C',
              fontWeight: 'bold',
            }}>
            {formatCurrencyIDR(item.tarif_normal)}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={img.SIZE}
            style={{
              width: 18,
              height: 18,
              tintColor: '#6C8993',
              marginRight: 4,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              color: '#6C8993',
              fontWeight: '500',
              paddingVertical: 6,
            }}>
            {item.ukuran_kamar} m²
          </Text>
          <Image
            source={img.PROFILEICON}
            style={{
              width: 18,
              height: 18,
              tintColor: '#6C8993',
              marginRight: 4,
              marginLeft: 16,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              color: '#6C8993',
              fontWeight: '500',
              paddingVertical: 6,
            }}>
            {item.kapasitas} People
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardRoom;

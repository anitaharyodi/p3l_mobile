import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../styles';
import img from '../../../assets/img';

const roomImages = [img.ROOM1, img.ROOM2, img.ROOM3, img.ROOM1];

const RoomDetail = ({navigation, route}) => {
  const item = route.params.item;
  const index = route.params.imageIndex;
  const imageUrl = roomImages[index];

  const formatCurrencyIDR = amount => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    return formatter.format(amount).replace('Rp', 'IDR');
  };

  const tipe_bed_array = item.tipe_bed?.split('\r\n').join(', ');
  const deskripsi_kamar_array = item.deskripsi_kamar?.split("\r\n");
  const rincian_kamar_array = item.rincian_kamar?.split("\r\n");

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          <Image source={imageUrl} style={styles.backgroundImage} />
          <View style={{padding: 24}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={img.BACK} style={styles.backButtonText} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.roomDetailsContainer}>
          <Text style={styles.title}>{item.jenis_kamar}</Text>
          <Text style={styles.price}>
            {formatCurrencyIDR(item.tarif_normal)}
          </Text>
          <Text style={styles.size}>Size: {item.ukuran_kamar} m²</Text>
          <Text style={styles.capacity}>Capacity: {item.kapasitas} People</Text>
          <Text style={styles.capacity}>Bed Type: {tipe_bed_array}</Text>
          <Text style={styles.description}>
            {item.jenis_kamar} Room boasts a spacious {item.ukuran_kamar} square
            meters, providing ample space for you to relax and savor your
            special moments. The available bed type is {tipe_bed_array},
            ensuring unmatched comfort for a restful sleep. After a long day,
            you can indulge in the luxury of the lavish bed.
          </Text>
          <Text style={{marginTop:16, fontSize:20, fontWeight:"bold" }}>Room Facilities</Text>
          {deskripsi_kamar_array?.map((roomDesc, index) => (
          <View key={index}>
            <Text style={styles.description}>• {roomDesc}</Text>
          </View>
          ))}
          <Text style={{marginTop:16, fontSize:20, fontWeight:"bold" }}>Room Details</Text>
          {rincian_kamar_array?.map((roomDetail, index) => (
            <View key={index}>
            <Text style={styles.description}>• {roomDetail}</Text>
          </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.bookNowButton}>
        <Text style={styles.bookNowButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoomDetail;

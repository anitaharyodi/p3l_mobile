import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../styles';
import img from '../../../assets/img';
import {useNavigation} from '@react-navigation/native';
import { useLogin } from '../../../Context/HotelContext';

const roomImages = [img.ROOM1, img.ROOM2, img.ROOM3, img.ROOM1];

const CardRoomSearch = ({jenisKamarBySeason, imgIndex, ketersediaanKamar}) => {
  const {tglCheckin, tglCheckout, clearBookingList, addToBookingList, removeFromBookingList} = useLogin()
  const [quantity, setQuantity] = useState(0);
  const imageUrl = roomImages[imgIndex];
  const navigation = useNavigation();

  const rincian_kamar_array = jenisKamarBySeason.rincian_kamar?.split("\r\n");

  const formatCurrencyIDR = amount => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    return formatter.format(amount)
  };

  useEffect(() => {
    setQuantity(0);
    clearBookingList();
  }, [tglCheckin, tglCheckout]);

  const addToBookingListAndResetQuantity = () => {
    if (quantity > 0) {
      addToBookingList({
        id: jenisKamarBySeason.id,
        jenis_kamar: jenisKamarBySeason.jenis_kamar,
        quantity,
        imgIndex: imgIndex,
        hargaPerMalam: jenisKamarBySeason.tarifBySeason,
      });
    } else {
      removeFromBookingList(jenisKamarBySeason.id); 
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };


  const itemsPerColumn = 2

  return (
    <View
      style={{
        marginRight: 16,
        backgroundColor: '#F2F4F9',
        borderRadius: 8,
        width: 380,
        marginBottom: 24,
        // marginEnd: 0
      }}>
      <View>
        <Image source={imageUrl} style={styles.BannerImg} />
      </View>
      <View style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold'}}>
            {jenisKamarBySeason.jenis_kamar}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RoomDetail', { item: jenisKamarBySeason, imageIndex: imgIndex })}
          >
            <Text
              style={{
                fontSize: 14,
                color: '#1E2131',
                fontWeight: '500',
              }}>
              See Detail ›
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
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
              {jenisKamarBySeason.ukuran_kamar} m²
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
              {jenisKamarBySeason.kapasitas} Person
            </Text>
          </View>
          <Text style={{color: '#FF3B3B'}}>{ketersediaanKamar} room(s) available</Text>
        </View>
        <View
          style={{
            borderWidth: 0.8,
            height: 0.8,
            borderRadius: 0.4,
            borderColor: '#BFC7D0',
            marginBottom: 16,
            marginTop: 4,
          }}
        />
        <View>
          <View style={styles.container}>
            {[0, 1, 2].map(columnIndex => (
              <View key={columnIndex} style={styles.column}>
                {rincian_kamar_array
                  .slice(
                    columnIndex * itemsPerColumn,
                    (columnIndex + 1) * itemsPerColumn,
                  )
                  .map((item, itemIndex) => (
                    <Text key={itemIndex} style={styles.textItem}>
                      - {item}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={img.INFOICON}
              style={{width: 15, height: 15, marginRight: 5}}
            />
            <Text style={{width: 180, fontSize: 12, color: "gray"}}>
              Refundable if cancellation is made a maximum of 1 week before
              check-in
            </Text>
          </View>
          {jenisKamarBySeason.tarif_normal != jenisKamarBySeason.tarifBySeason ? (
            <Text style={{textDecorationLine: 'line-through'}}>{formatCurrencyIDR(jenisKamarBySeason.tarif_normal)}</Text>
          ) : ""}
          
        </View>
        <Text
          style={{
            fontSize: 18,
            color: '#A37D4C',
            fontWeight: 'bold',
            textAlign: 'right',
            marginTop: -25,
          }}>
         {formatCurrencyIDR(jenisKamarBySeason.tarifBySeason)} 
        </Text>
        <Text style={{textAlign: 'right', color:'gray'}}>/ room / night(s)</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 16,
          }}>
          <TouchableOpacity
            onPress={decrementQuantity}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <View style={{width: 50, height: 40}}>
            <TextInput
              style={styles.quantityInput}
              value={quantity.toString()}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            onPress={incrementQuantity}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>

          <View style={{width: 150, marginLeft: 16}}>
            <Button
              title="Add to list"
              color={'#A37D4C'}
              style={{borderRadius: 10}}
              onPress={addToBookingListAndResetQuantity}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardRoomSearch;

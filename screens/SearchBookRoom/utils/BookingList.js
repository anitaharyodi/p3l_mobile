import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLogin } from '../../../Context/HotelContext';

const BookingList = () => {
  const { bookingList, tglCheckin, tglCheckOut, total, adults, kids } =
    useLogin()
    console.log('CEK LIS BOOKING', bookingList)
    const formatCurrency = (number) => {
      return `Rp ${new Intl.NumberFormat("id-ID").format(number)}`;
    };
  
    const totalPrice = Array.isArray(bookingList) && bookingList.length > 0
  ? bookingList.reduce((total, booking) => {
      return total + booking.quantity * booking.hargaPerMalam;
    }, 0)
  : 0;

  let totalQuantity = 0;

  for (const booking of bookingList) {
    totalQuantity += booking.quantity;
  }

    const formattedTotalPrice = formatCurrency(totalPrice);

  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <View style={styles.cartIcon}>
          <Text style={styles.cartText}>{totalQuantity}</Text>
        </View>
      </View>
      <View style={{marginRight:80}}>
        <Text style={{color:"#fff", fontWeight:"bold", fontSize:12}}>Total Price:</Text>
        <Text style={{color:"#fff", fontWeight:"bold", fontSize:16}}>{formattedTotalPrice}</Text>
      </View>
      <TouchableOpacity>
    <Text style={styles.totalText}>Book now</Text>
    </TouchableOpacity>
  </View>

  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1E2131',
        borderRadius:20,
        padding: 16,
        position: 'absolute',
        bottom: -40,
        left: 0,
        right: 0,
        marginHorizontal:16
      },
      cartIcon: {
        width: 30,
        height: 30,
        backgroundColor: '#A37D4C',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cartText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      totalText: {
        marginLeft:10,
        color: '#1E2131',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor:'#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10
      },
});

export default BookingList;

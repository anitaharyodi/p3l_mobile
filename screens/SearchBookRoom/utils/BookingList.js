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
    <TouchableOpacity style={styles.container}>
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <View style={styles.cartIcon}>
          <Text style={styles.cartText}>{totalQuantity}</Text>
        </View>
        <Text style={{color:"#fff", fontWeight:"bold", fontSize:16, marginLeft: 10}}>Total Price: {formattedTotalPrice}</Text>
      </View>
    <Text style={styles.totalText}>Book Now</Text>
  </TouchableOpacity>
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
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
      },
});

export default BookingList;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const BookingForm = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');

  const handleBookNow = () => {
    // Handle the "Book Now" button press, e.g., navigate to the booking screen.
    console.log('Booking details:', {
      checkInDate,
      checkOutDate,
      adults,
      children,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text>Check-In Date:</Text>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={checkInDate}
          onChangeText={(text) => setCheckInDate(text)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Check-Out Date:</Text>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={checkOutDate}
          onChangeText={(text) => setCheckOutDate(text)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Adults:</Text>
        <TextInput
          style={styles.input}
          placeholder="Number of Adults"
          value={adults}
          onChangeText={(text) => setAdults(text)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Children:</Text>
        <TextInput
          style={styles.input}
          placeholder="Number of Children"
          value={children}
          onChangeText={(text) => setChildren(text)}
        />
      </View>
      <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow}>
        <Text style={styles.bookNowText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal:16,
    borderRadius: 10,
    marginTop: -120
  },
  formGroup: {
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 8,
  },
  bookNowButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookNowText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default BookingForm;

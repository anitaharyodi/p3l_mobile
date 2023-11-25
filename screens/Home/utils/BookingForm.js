import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomDropdown from './CustomDropdown';
import { useNavigation } from '@react-navigation/native';
import { useLogin } from '../../../Context/HotelContext';


const BookingForm = () => {
  const navigation = useNavigation();
  const {tglCheckin, setTglCheckin, tglCheckOut, setTglCheckOut, adults, setAdults, kids, setKids} = useLogin()
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePickerOut, setShowDatePickerOut] = useState(false);

  const handleBookNow = () => {
    console.log('Booking details:', {
      tglCheckin,
      tglCheckOut,
      adults,
      kids,
    });
    navigation.navigate("SearchBookRoom")
  };

  const listAdults = [
    {label: '1', value:'1'},
    {label: '2', value:'2'},
    {label: '3', value:'3'},
    {label: '4', value:'4'},
  ]
  const listKids = [
    {label: '0', value:'0'},
    {label: '1', value:'1'},
    {label: '2', value:'2'},
    {label: '3', value:'3'},
    {label: '4', value:'4'},
  ]

  const handleAdultsSelect = (value) => {
    setAdults(value);
  };

  const handleChildSelect = (value) => {
    setKids(value);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setTglCheckin(selectedDate);

      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      setTglCheckOut(nextDay);
    }

    setShowDatePicker(Platform.OS === 'ios');
  };

  const handleDateCheckOut = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setTglCheckOut(selectedDate);
    }
    setShowDatePickerOut(Platform.OS === 'ios');
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showDatepickerOut = () => {
    setShowDatePickerOut(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={{color:'#000'}}>Check-In Date:</Text>
        <TouchableOpacity onPress={showDatepicker}>
        <Text style={styles.input}>{moment(tglCheckin).format('DD MMMM YYYY')}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={tglCheckin}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      </View>
      <View style={styles.formGroup}>
        <Text style={{color:'#000'}}>Check-Out Date:</Text>
        <TouchableOpacity onPress={showDatepickerOut}>
        <Text style={styles.input}>{moment(tglCheckOut).format('DD MMMM YYYY')}</Text>
      </TouchableOpacity>

      {showDatePickerOut && (
        <DateTimePicker
          value={tglCheckOut}
          mode="date"
          display="default"
          onChange={handleDateCheckOut}
        />
      )}
      </View>
      <View style={styles.formGroup}>
        <Text style={{color:'#000'}}>Adults:</Text>
        <CustomDropdown items={listAdults} selectedValue={adults} onSelect={handleAdultsSelect} />

      </View>
      <View style={styles.formGroup}>
        <Text style={{color:'#000'}}>Children:</Text>
        <CustomDropdown items={listKids} selectedValue={kids} onSelect={handleChildSelect} />
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
  },
  formGroup: {
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 8,
    color:"#000"
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

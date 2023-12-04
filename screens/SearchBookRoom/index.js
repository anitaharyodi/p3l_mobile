import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {HEIGHT, WIDTH} from '../../assets/style';
import BookingForm from '../Home/utils/BookingForm';
import img from '../../assets/img';
import styles from './styles';
import CardRoomSearch from './utils/CardRoomSearch';
import {useNavigation, useRoute} from '@react-navigation/native';
import BookingList from './utils/BookingList';
import {useLogin} from '../../Context/HotelContext';
import axios from 'axios';
import moment from 'moment';
const baseUrl = 'https://ah-project.my.id'

const SearchBookRoom = () => {
  const navigation = useNavigation();
  const {tglCheckin, tglCheckout, bookingList} = useLogin();
  const [jenisKamarBySeason, setJenisKamarBySeason] = useState([]);
  const [ketersediaanKamar, setKetersediaanKamar] = useState([]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const translateY = scrollY.interpolate({
    inputRange: [0, calculateThreshold()],
    outputRange: [0, -calculateThreshold()],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  function calculateThreshold() {
    const headerHeight = 50;
    const cardRoomSearchHeight = 20;
    const numberOfCardRoomSearch = 4;
    return headerHeight + cardRoomSearchHeight * numberOfCardRoomSearch;
  }

  const formattedDateCheckin = moment(tglCheckin).format('YYYY-MM-DD');
  const formattedDateCheckout = moment(tglCheckout).format('YYYY-MM-DD');

  useEffect(() => {
    const apiURL = `${baseUrl}/api/tarifBySeason?tgl_checkin=${formattedDateCheckin}&tgl_checkout=${formattedDateCheckout}`;
    axios
      .get(apiURL)
      .then(response => {
        // console.log(response)
        setJenisKamarBySeason(response.data.data);
        console.log(
          'MASUK SEARCH',
          JSON.stringify(response.data.data, null, 2),
        );
      })
      .catch(error => {
        console.error('Error fetching data from the API: ' + error);
      });
  }, [tglCheckin, tglCheckout]);

  useEffect(() => {
    const apiURL = `${baseUrl}/api/ketersediaanKamar?tgl_checkin=${formattedDateCheckin}&tgl_checkout=${formattedDateCheckout}`;
    axios
      .get(apiURL)
      .then(response => {
        // console.log(response)
        setKetersediaanKamar(response.data.data);
        console.log(
          'MASUK SEARCH',
          JSON.stringify(response.data.data, null, 2),
        );
      })
      .catch(error => {
        console.error('Error fetching data from the API: ' + error);
      });
  }, [tglCheckin, tglCheckout]);

  return (
    <View style={{backgroundColor: 'white', width: WIDTH, height: HEIGHT}}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            transform: [{translateY}],
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View
            style={{
              backgroundColor: '#1E2131',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <View style={{paddingTop: 24, paddingHorizontal: 24}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={img.BACK} style={styles.backButtonText} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                  textAlign: 'center',
                  top: -30,
                }}>
                Search Room
              </Text>
            </View>
            <View style={{marginBottom: 24}}>
              <BookingForm />
            </View>
          </View>
          <View style={{marginTop: 24, marginLeft: 16}}>
            {jenisKamarBySeason.map((item, index) => {
              const totalKamar = ketersediaanKamar?.find(
                kk => kk.id_jenis_kamar === item.id,
              )?.totalKamar;

              if (totalKamar > 0) {
                return (
                  <CardRoomSearch
                    key={item.id}
                    jenisKamarBySeason={item}
                    imgIndex={index}
                    ketersediaanKamar={totalKamar}
                  />
                );
              }

              return null;
            })}
          </View>
        </Animated.View>
      </ScrollView>

      {bookingList.length ? (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            transform: [{translateY}],
          }}>
          <BookingList />
        </Animated.View>
      ) : (
        ''
      )}
    </View>
  );
};

export default SearchBookRoom;

import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts, HEIGHT, WIDTH} from '../../assets/style';
import img from '../../assets/img';
import styles from './styles';
import CardRoom from './utils/CardRoom';
import { useNavigation } from '@react-navigation/native';
import BookingForm from './utils/BookingForm';
import axios from 'axios';

const baseUrl = 'https://ah-project.my.id'

const Homepage = () => {
  const navigation = useNavigation()
  const [jenisKamarData, setJenisKamarData] = useState([])

  useEffect(() => { 
    axios
      .get(`${baseUrl}/api/jenisKamar`)
      .then((response) => {
        console.log(JSON.stringify(response.data.mess, null, 2))
        setJenisKamarData(response.data.mess)
      })
      .catch((error) => {
        console.error("Error fetching jenis kamar data: ", error);
      });
  }, [])
  console.log(JSON.stringify(jenisKamarData, null, 2))

  return (
    <View style={{backgroundColor: 'white', width: WIDTH, height: HEIGHT}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.backgroundContainer}>
          <Image source={img.ROOM5} style={styles.backgroundImage} />
          <View style={styles.textContainer}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
              }}>
              <Image source={img.LOGOBAWAH} style={{width: 150, height: 65}} />
            </View>
            <Text style={styles.headingText}>Find The Perfect Room</Text>
            <Text style={styles.subText}>
              5-Star Luxury Meets Sophisticated Design
            </Text>
          </View>
        </View>

        <View style={{marginTop: -120}}>
          <BookingForm/>
        </View>

        <View style={{paddingHorizontal: 24, marginTop: 0, marginBottom: 150}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <Text style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
              Room Recommendations
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Rooms')}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#6C8993',
                }}
                >
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight: 16, marginRight: 16}}
            style={{marginTop: 10}}>
            {jenisKamarData.map((item, index) => (
              <CardRoom key={index} item={item} imageIndex={index} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Homepage;

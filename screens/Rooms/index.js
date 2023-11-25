import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {HEIGHT, WIDTH} from '../../assets/style';
import CardRoom from '../Home/utils/CardRoom';
import axios from 'axios';
import styles from './styles';
import img from '../../assets/img';
const baseUrl = 'http://192.168.100.121/backend_p3l/public'

const Rooms = () => {
  const [jenisKamarData, setJenisKamarData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/jenisKamar`)
      .then(response => {
        console.log(JSON.stringify(response.data.mess, null, 2));
        setJenisKamarData(response.data.mess);
      })
      .catch(error => {
        console.error('Error fetching jenis kamar data: ', error);
      });
  }, []);

  const filteredRooms = jenisKamarData.filter(item =>
    item.jenis_kamar.toLowerCase().includes(searchInput.toLowerCase()),
  );

  return (
    <View style={{backgroundColor: 'white', width: WIDTH, height: HEIGHT}}>
      <ScrollView>
        <View style={{paddingHorizontal: 16, marginTop: 24, marginBottom: 150}}>
          <Text style={{fontSize: 24, color: '#000', fontWeight: 'bold'}}>
            Room Type
          </Text>
          <TextInput
            placeholder="Search Room"
            value={searchInput}
            style={{
              paddingHorizontal: 16,
              backgroundColor: '#F2F4F9',
              borderRadius: 10,
              marginTop: 16,
              color: "#000"
            }}
            placeholderTextColor={'lightgray'}
            onChangeText={text => setSearchInput(text)}
          />
          <View style={{marginTop: 24, marginLeft: 10}}>
            {filteredRooms.length > 0 ? (
              filteredRooms.map((item, index) => (
                <CardRoom key={index} item={item} imageIndex={index} />
              ))
            ) : (
              <View
                style={styles.container}
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                  <Image source={img.NOTFOUND} style={styles.notFound} />
                  <View style={{marginTop: 36}}>
                    <Text
                      style={{
                        fontSize: 26,
                        fontWeight: 'bold',
                        width: WIDTH,
                        textAlign: 'center',
                      }}>
                      Data Not Found
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Rooms;

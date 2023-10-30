import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../styles';
import img from '../../../assets/img';
import {HEIGHT, WIDTH} from '../../../assets/style';
import {useLogin} from '../../../Context/HotelContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const baseUrl = 'http://10.0.2.2:8000';

const DetailHistory = ({ route}) => {
    const navigation = useNavigation()
  const detailId = route.params.id;
  const {token} = useLogin();
  console.log(detailId);
  const [reservation, setReservation] = useState();
  const [customer, setCustomer] = useState();
  const [bookRoom, setBookRoom] = useState([]);
  const [facilityBook, setFacilityBook] = useState([]);

  useEffect(() => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${baseUrl}/api/history/${detailId}`, axiosConfig)
      .then(response => {
        const {
          id_booking,
          status,
          tgl_checkin,
          tgl_checkout,
          jumlah_dewasa,
          jumlah_anak,
          uang_jaminan,
          tgl_pembayaran,
        } = response.data.data;
        setReservation({
          idBooking: id_booking,
          status: status,
          checkin: tgl_checkin,
          checkout: tgl_checkout,
          jmlDewasa: jumlah_dewasa,
          jmlAnak: jumlah_anak,
          uangJaminan: uang_jaminan,
          tglPembayaran: tgl_pembayaran,
        });
        console.log('ISI RESERVASI', reservation);
        const {nama, email, no_telepon} = response.data.data.customers;
        setCustomer({
          nama: nama,
          email: email,
          noTelp: no_telepon,
        });
        setBookRoom(response.data.data.reservasi_kamars);
        setFacilityBook(response.data.data.transaksi_fasilitas);
      })
      .catch(error => {
        // console.error("Error fetching profile data: ", error.response);
      });
  }, []);

  const formatDate = dateString => {
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const formatCurrency = number => {
    return `Rp ${new Intl.NumberFormat('id-ID').format(number)}`;
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        width: WIDTH,
        height:
          bookRoom.length === 0 || facilityBook.length === 0 ? HEIGHT : '',
      }}>
      <ScrollView>
        <View style={styles.backgroundEdit}>
          <Image source={img.BGPROFILE} style={styles.backgroundImage} />
          <View style={{padding:24}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Image source={img.BACK} style={styles.backButtonText} />
        </TouchableOpacity>
      </View>
          <Text style={styles.title}>Detail History</Text>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 16,
              marginTop: 6,
            }}>
            Booking ID : #{reservation?.idBooking}{' '}
          </Text>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                borderColor:
                  reservation?.status === 'Lunas'
                    ? '#4A9468'
                    : reservation?.status === 'Menunggu Pembayaran'
                    ? '#C4850F'
                    : reservation?.status === 'Check-In'
                    ? '#045AAC'
                    : '#AC2020',
                backgroundColor:
                  reservation?.status === 'Lunas'
                    ? '#DAEEE2'
                    : reservation?.status === 'Menunggu Pembayaran'
                    ? '#FBE9BE'
                    : reservation?.status === 'Check-In'
                    ? '#E6EEF7'
                    : '#FAD8D2',
                borderWidth: 1,
                borderRadius: 6,
                paddingHorizontal: 8,
                height: 30,
                marginTop: -25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color:
                    reservation?.status === 'Lunas'
                      ? '#4A9468'
                      : reservation?.status === 'Menunggu Pembayaran'
                      ? '#C4850F'
                      : reservation?.status === 'Check-In'
                      ? '#045AAC'
                      : '#AC2020',
                  textAlign: 'center',
                }}>
                {reservation?.status}
              </Text>
            </View>
          </View>
        </View>
        <View style={{paddingVertical: 24}}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 24,
              borderColor: '#A37D4C',
              marginTop: -40,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16,
              }}>
              <Text style={{fontSize: 16}}>Name</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {customer?.nama}
              </Text>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 0.8,
                height: 0.8,
                borderRadius: 0.4,
                borderColor: '#BFC7D0',
                marginVertical: 16,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 16}}>Email</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {customer?.email}
              </Text>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 0.8,
                height: 0.8,
                borderRadius: 0.4,
                borderColor: '#BFC7D0',
                marginVertical: 16,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 16}}>Phone Number</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {customer?.noTelp}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 24,
                color: '#A37D4C',
                marginTop: 24,
                marginBottom: 16,
                fontWeight: 'bold',
              }}>
              Reservation
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 16}}>Check-In</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {formatDate(reservation?.checkin)}
              </Text>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 0.8,
                height: 0.8,
                borderRadius: 0.4,
                borderColor: '#BFC7D0',
                marginVertical: 16,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 16}}>Check-Out</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {formatDate(reservation?.checkout)}
              </Text>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 0.8,
                height: 0.8,
                borderRadius: 0.4,
                borderColor: '#BFC7D0',
                marginVertical: 16,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 16}}>Adults</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {reservation?.jmlDewasa}
              </Text>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 0.8,
                height: 0.8,
                borderRadius: 0.4,
                borderColor: '#BFC7D0',
                marginVertical: 16,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 16}}>Kids</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {reservation?.jmlAnak}
              </Text>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 0.8,
                height: 0.8,
                borderRadius: 0.4,
                borderColor: '#BFC7D0',
                marginVertical: 16,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 16}}>Down Payment</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {formatCurrency(reservation?.uangJaminan)}
              </Text>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 0.8,
                height: 0.8,
                borderRadius: 0.4,
                borderColor: '#BFC7D0',
                marginVertical: 16,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 16}}>Payment Date</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {formatDate(reservation?.tglPembayaran)}
              </Text>
            </View>
            {bookRoom.length !== 0
              ? bookRoom.map((item, i) => (
                  <React.Fragment key={i}>
                    <Text
                      style={{
                        fontSize: 24,
                        color: '#A37D4C',
                        marginTop: 24,
                        marginBottom: 16,
                        fontWeight: 'bold',
                      }}>
                      Room
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        padding: 24,
                        elevation: 2,
                        borderColor: '#A37D4C',
                        borderRadius: 20,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: 16}}>Room Type</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>
                          {item.jenis_kamars.jenis_kamar}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderStyle: 'dashed',
                          borderWidth: 0.8,
                          height: 0.8,
                          borderRadius: 0.4,
                          borderColor: '#BFC7D0',
                          marginTop: 16,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 16,
                        }}>
                        <Text style={{fontSize: 16}}>Capacity</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                          {item.jenis_kamars.kapasitas}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderStyle: 'dashed',
                          borderWidth: 0.8,
                          height: 0.8,
                          borderRadius: 0.4,
                          borderColor: '#BFC7D0',
                          marginTop: 16,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 16,
                        }}>
                        <Text style={{fontSize: 16}}>Tonight's Rate</Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            width: 200,
                            textAlign: 'right',
                          }}>
                          {formatCurrency(item.jenis_kamars.tarif_normal)}
                        </Text>
                      </View>
                    </View>
                  </React.Fragment>
                ))
              : ''}
            {facilityBook.length !== 0
              ? facilityBook.map((item, i) => (
                  <React.Fragment key={i}>
                    <Text
                      style={{
                        fontSize: 24,
                        color: '#A37D4C',
                        marginTop: 24,
                        marginBottom: 16,
                        fontWeight: 'bold',
                      }}>
                      Paid Facilities
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        padding: 24,
                        elevation: 2,
                        borderColor: '#A37D4C',
                        borderRadius: 20,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: 16}}>Name</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>
                          {item.fasilitas_tambahans.nama_fasilitas}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderStyle: 'dashed',
                          borderWidth: 0.8,
                          height: 0.8,
                          borderRadius: 0.4,
                          borderColor: '#BFC7D0',
                          marginTop: 16,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 16,
                        }}>
                        <Text style={{fontSize: 16}}>Amount</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                          {item.jumlah}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderStyle: 'dashed',
                          borderWidth: 0.8,
                          height: 0.8,
                          borderRadius: 0.4,
                          borderColor: '#BFC7D0',
                          marginTop: 16,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 16,
                        }}>
                        <Text style={{fontSize: 16}}>Date</Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            width: 200,
                            textAlign: 'right',
                          }}>
                          {formatDate(item.tgl_pemakaian)}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderStyle: 'dashed',
                          borderWidth: 0.8,
                          height: 0.8,
                          borderRadius: 0.4,
                          borderColor: '#BFC7D0',
                          marginTop: 16,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 16,
                        }}>
                        <Text style={{fontSize: 16}}>Price</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                          {formatCurrency(item.subtotal)}
                        </Text>
                      </View>
                    </View>
                  </React.Fragment>
                ))
              : ''}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailHistory;

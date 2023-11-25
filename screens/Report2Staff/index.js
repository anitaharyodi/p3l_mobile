import {View, Text, ScrollView, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {HEIGHT, WIDTH} from '../../assets/style';
import styles from './styles';
import { useLogin } from '../../Context/HotelContext';
import axios from 'axios';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
const baseUrl = 'http://192.168.100.121/backend_p3l/public'

const Report2Staff = () => {
  const {tokenPegawai} = useLogin();
  const [reportData, setReportData] = useState([]);
  const [pdfFilePath, setPdfFilePath] = useState('');

  const formatCurrency = (number) => {
    return `Rp ${new Intl.NumberFormat("id-ID").format(number)}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/topCustomer`, {
          headers: {
            Authorization: `Bearer ${tokenPegawai}`,
          },
        });

        setReportData(response.data.top_customers);
      } catch (error) {
        console.error('Error fetching report 2 data: ', error.response);
      }
    };

    fetchData();
  }, [tokenPegawai]);

  const convertToPDF = async () => {
    try {
      // Create an HTML string with your React Native view content
      const htmlContent = `
        <html>
          <body>
            <h1>5 Customers With The Most Reservations</h1>
            <table border="1" style="width:100%">
              <tr>
                <th>NO</th>
                <th>CUSTOMER NAME</th>
                <th>TOTAL</th>
                <th>TOTAL_PAYMENT</th>
              </tr>
              ${reportData
                .map(
                  (item, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${item.nama}</td>
                  <td>${item.reservations[0].total_reservations}</td>
                  <td>${formatCurrency(item.reservations[0].total_payment)}</td>
                </tr>`,
                )
                .join('')}
            </table>
          </body>
        </html>
      `;

      // Create a PDF file using react-native-html-to-pdf
      const {filePath} = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: 'NewCustomerReports',
        base64: true,
      });

      setPdfFilePath(filePath);
    } catch (error) {
      console.error('Error converting view to PDF: ', error);
    }
  };

  const printPDF = async () => {
    if (pdfFilePath) {
      RNPrint.print({
        filePath: pdfFilePath,
      });
    }
  };

  return (
    <View style={{backgroundColor: 'white', width: WIDTH, height: HEIGHT}}>
      <ScrollView>
        <View style={{paddingTop:30, paddingHorizontal:16}}>
          <Text style={{fontSize:20, color:"#1E2131", fontWeight:"bold" ,textAlign:'center'}}>5 Customers With The Most Reservations</Text>
        </View>
        <View>
          <View style={{margin:15, paddingTop:16}}>
              <View style={styles.table_head}>
                  <View style={{width:'10%'}}>
                    <Text style={styles.table_caption}>NO</Text>
                  </View>
                  <View style={{width:'30%'}}>
                    <Text style={styles.table_caption}>CUSTOMER NAME</Text>
                  </View>
                  <View style={{width:'15%'}}>
                    <Text style={styles.table_caption}>TOTAL</Text>
                  </View>
                  <View style={{width:'45%'}}>
                    <Text style={styles.table_caption}>TOTAL PAYMENT</Text>
                  </View>
              </View>
              {reportData.map((item, i) => (
              <View style={styles.table_body}>
                  <View style={{width:'10%'}}>
                    <Text style={styles.table_data}>{i + 1}</Text>
                  </View>
                  <View style={{width:'30%'}}>
                    <Text style={styles.table_data}>{item.nama}</Text>
                  </View>
                  <View style={{width:'15%'}}>
                    <Text style={styles.table_data}>{item.reservations[0].total_reservations}</Text>
                  </View>
                  <View style={{width:'45%'}}>
                    <Text style={styles.table_data}>{formatCurrency(item.reservations[0].total_payment)}</Text>
                  </View>
              </View>
              ))}
          </View>
        </View>

        {pdfFilePath ? (
          <View style={styles.buttonContainer}>
            <Button title="Print PDF" onPress={printPDF} color={'#A37D4C'} />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              title="Convert to PDF"
              onPress={convertToPDF}
              color={'#A37D4C'}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Report2Staff;

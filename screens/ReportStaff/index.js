import {View, Text, ScrollView, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {HEIGHT, WIDTH} from '../../assets/style';
import styles from './styles';
import {useLogin} from '../../Context/HotelContext';
import axios from 'axios';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
const baseUrl = 'http://192.168.100.121/backend_p3l/public';

const ReportStaff = () => {
  const {tokenPegawai} = useLogin();
  const [reportData, setReportData] = useState([]);
  const [pdfFilePath, setPdfFilePath] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/customersPerMonth`, {
          headers: {
            Authorization: `Bearer ${tokenPegawai}`,
          },
        });

        setReportData(response.data.customers_per_month);
      } catch (error) {
        console.error('Error fetching report 1 data: ', error.response);
      }
    };

    fetchData();
  }, [tokenPegawai]);

  const totalSum = reportData.reduce((sum, item) => sum + item.total, 0);

  const convertToPDF = async () => {
    try {
      // Create an HTML string with your React Native view content
      const htmlContent = `
        <html>
          <body>
            <h1>New Customer Reports per Month</h1>
            <table border="1" style="width:100%">
              <tr>
                <th>NO</th>
                <th>MONTH</th>
                <th>AMOUNT</th>
              </tr>
              ${reportData
                .map(
                  (item, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${item.month}</td>
                  <td>${item.total}</td>
                </tr>`,
                )
                .join('')}
              <tr>
                <td></td>
                <td>TOTAL</td>
                <td>${totalSum}</td>
              </tr>
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
        <View style={{paddingTop: 30, paddingHorizontal: 16}}>
          <Text
            style={{
              fontSize: 20,
              color: '#1E2131',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            New Customer Reports per Month
          </Text>
        </View>
        <View>
          <View style={{margin: 15, paddingTop: 16}}>
            <View style={styles.table_head}>
              <View style={{width: '20%'}}>
                <Text style={styles.table_caption}>NO</Text>
              </View>
              <View style={{width: '35%'}}>
                <Text style={styles.table_caption}>MONTH</Text>
              </View>
              <View style={{width: '45%'}}>
                <Text style={styles.table_caption}>AMOUNT</Text>
              </View>
            </View>
            {reportData.map((item, i) => (
              <View style={styles.table_body}>
                <View style={{width: '20%'}}>
                  <Text style={styles.table_data}>{i + 1}</Text>
                </View>
                <View style={{width: '35%'}}>
                  <Text style={styles.table_data}>{item.month}</Text>
                </View>
                <View style={{width: '45%'}}>
                  <Text style={styles.table_data}>{item.total}</Text>
                </View>
              </View>
            ))}
            <View style={styles.table_head}>
              <View style={{width: '20%'}}>
                <Text style={styles.table_caption}></Text>
              </View>
              <View style={{width: '35%'}}>
                <Text style={styles.table_caption}>TOTAL</Text>
              </View>
              <View style={{width: '45%'}}>
                <Text style={styles.table_caption}>{totalSum}</Text>
              </View>
            </View>
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

export default ReportStaff;

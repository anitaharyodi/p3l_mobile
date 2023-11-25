import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  table_head: {
    flexDirection: 'row',
    backgroundColor:'#1E2131',
    padding:10,
  },
  table_caption: {
    color:'#fff',
    fontWeight:'bold',
    textAlign:'center'
  },
  table_body: {
    flexDirection: 'row',
    padding:10,
    backgroundColor:'#F4F4F4',
  },
  table_data: {
    fontSize: 14,
    textAlign:'center',
    color:'#000'
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  }

});

export default styles;

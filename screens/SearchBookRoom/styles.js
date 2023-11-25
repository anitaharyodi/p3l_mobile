import {StyleSheet, Dimensions} from 'react-native';

const heightBanner = Dimensions.get('screen').height * 0.2;
const widthBanner = Dimensions.get('screen').width * 0.92;

export default StyleSheet.create({
  backButtonText: {
    tintColor: '#fff',
    backgroundColor: '#1E2131',
    borderRadius:100,
    width:30,
    height:30,
    padding: 6,
  },
  BannerImg: {
    width: widthBanner,
    height: heightBanner,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  column: {
    width: '30%',
    marginBottom: 16,
  },
  textItem: {
    fontSize: 14,
    marginBottom: 8,
    color:"#000"
  },
  quantityButton: {
    borderColor:"gray",
    borderWidth: 1,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    height:40
  },
  quantityButtonText: {
    color: "#000",
    fontSize: 18,
    textAlign: "center"
  },
  quantityInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    fontSize: 16,
    color: "#000",
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#A37D4C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

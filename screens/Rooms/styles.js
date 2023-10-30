import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  backgroundContainer: {
    position: 'relative',
    width: '100%',
    height: 400,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  roomDetailsContainer: {
    padding: 24,
    backgroundColor: '#fff',
    marginTop: -70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  title: {
    fontSize: 24,
    color: "#000",
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A37D4C',
    marginTop: 8,
  },
  size: {
    fontSize: 16,
    marginTop: 16,
  },
  capacity: {
    fontSize: 16,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign:"justify"
  },
  bookNowButton: {
    backgroundColor: '#1E2131',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookNowButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButtonText: {
    tintColor: '#fff',
    backgroundColor: '#1E2131',
    borderRadius:100,
    width:36,
    height:36,
    padding: 6,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 52,
},
notFound: {
  // width: width,
  // height: height,
  width: 300,
  height: 250,
  resizeMode: 'contain',
},
});

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  backgroundEdit: {
    width: '100%',
    height: 200,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  profileImageContainer: {
    position: 'absolute',
    top: 90, 
    left: 30, 
  },
  profileImage: {
    width: 100, 
    height: 100, 
    borderRadius: 50, 
  },
  textContainer: {
    marginTop: 80, 
    marginLeft: 150, 
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  subText: {
    fontSize: 16,
    color: '#909090'
  },
  changePasswordButton: {
    backgroundColor: '#A37D4C',
    padding: 10,
    width: 160,
    borderRadius: 8,
    marginTop: 14,
  },
  changePasswordButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bookNowButton: {
    backgroundColor: '#1E2131',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  bookNowText: {
    color: '#fff',
    fontSize: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -30,
    textAlign: "center",
    color: "#fff"
  },
  backButtonText: {
    tintColor: '#fff',
    backgroundColor: '#1E2131',
    borderRadius:100,
    width:36,
    height:36,
    padding: 6,
  },

});

export default styles;

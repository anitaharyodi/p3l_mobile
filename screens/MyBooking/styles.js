import {StyleSheet, Dimensions} from 'react-native';
const heightBanner = Dimensions.get('screen').height * 0.2;
const widthBanner = Dimensions.get('screen').width * 0.88;

export default StyleSheet.create({
      lihat: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      },
      textLihat: {
        color: '#1E2131',
        fontSize: 16,
        letterSpacing: 0.4,
        lineHeight: 17,
        fontWeight: "500"
        // borderWidth: 1
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
      title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: -50,
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

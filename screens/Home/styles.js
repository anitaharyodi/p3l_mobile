import {StyleSheet, Dimensions} from 'react-native';
const heightBanner = Dimensions.get('screen').height * 0.2;
const widthBanner = Dimensions.get('screen').width * 0.88;

export default StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    backgroundColor: '#F2F4F9',
    overflow: 'hidden',
  },
  BannerImg: {
    width: widthBanner,
    height: heightBanner,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  wrapperTitle: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 52,
  },
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
  textContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  headingText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    width: 250,
    marginTop: 25,
  },
  subText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#DEDEDE',
    paddingVertical: 4,
  },
});

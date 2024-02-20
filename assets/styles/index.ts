import { StyleSheet, Dimensions } from "react-native";

export const PRIMARY_COLOR = "#7444C0";
export const SECONDARY_COLOR = "#5636B8";
export const WHITE = "#FFFFFF";
export const GRAY = "#757E90";
export const DARK_GRAY = "#363636";
export const BLACK = "#000000";

export const ONLINE_STATUS = "#46A575";
export const OFFLINE_STATUS = "#D04949";

export const STAR_ACTIONS = "#FFA200";
export const LIKE_ACTIONS = "#B644B2";
export const DISLIKE_ACTIONS = "#363636";
export const FLASH_ACTIONS = "#5028D7";

export const DIMENSION_WIDTH = Dimensions.get("window").width;
export const DIMENSION_HEIGHT=Dimensions.get("window").height;
 const {height} = Dimensions.get("window");
export const DIMENSION_HEIGHT1=height*0.7;

export default StyleSheet.create({
  // COMPONENT - CARD ITEM
  containerCardItem: {
    backgroundColor: WHITE,
    borderRadius: 40,
    margin: 10,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  matchesCardItem: {
    marginTop: -35,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  matchesTextCardItem: {
    color: WHITE,
  },
  descriptionCardItem: {
    color: GRAY,
    textAlign: "center",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
  },
  online: {
    width: 6,
    height: 6,
    backgroundColor: ONLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  offline: {
    width: 6,
    height: 6,
    backgroundColor: OFFLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  actionsCardItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: WHITE,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: DARK_GRAY,
    shadowOffset: { height: 10, width: 0 },
  },
  miniButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: WHITE,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: DARK_GRAY,
    shadowOffset: { height: 10, width: 0 },
  },

  // COMPONENT - CITY
  city: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 100,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  cityText: {
    color: DARK_GRAY,
    fontSize: 13,
    textAlign: "center",
  },

  // COMPONENT - FILTERS
  filters: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 90,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  filtersText: {
    color: DARK_GRAY,
    fontSize: 13,
    textAlign: "center",
  },

  // COMPONENT - MESSAGE
  containerMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: DIMENSION_WIDTH - 100,
  },
  avatar: {
    borderRadius: 20,
    width: 72,
    height: 72,
    marginRight: 20,
    marginVertical: 10,
   flexShrink:0,
  },


  // COMPONENT - PROFILE ITEM
  containerProfileItem: {
    backgroundColor: WHITE,
    paddingHorizontal: 10,
    paddingBottom: 25,
    margin: 20,
    borderRadius: 8,
    marginTop: -65,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  matchesProfileItem: {
    width: 135,
    marginTop: -15,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
  },
  matchesTextProfileItem: {
    color: WHITE,
    textAlign: "center",
  },
  name: {
    paddingTop: 25,
    paddingBottom: 5,
    color: DARK_GRAY,
    fontSize: 15,
    textAlign: "center",
  },
  descriptionProfileItem: {
    color: GRAY,
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 13,
  },
  info: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  iconProfile: {
    fontSize: 12,
    color: DARK_GRAY,
    paddingHorizontal: 10,
  },
  infoContent: {
    color: GRAY,
    fontSize: 13,
  },

  // CONTAINER - GENERAL
  bg: {
    flex: 1,
    resizeMode: "cover",
    width: DIMENSION_WIDTH,
    height: DIMENSION_HEIGHT,
  },
  top: {
    paddingTop: 50,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { 
    paddingBottom: 10,
    color: '#FFF',
    fontFamily: '',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
     },

  // CONTAINER - HOME
  containerHome: {
 
    backgroundColor:'#010510',
    width:DIMENSION_WIDTH,
    height:DIMENSION_HEIGHT
  },
  explorerText: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24, 
  },
  iconContainer: {
    width: 48,
    height: 48,
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: 'rgba(63, 80, 124, 0.16)',
     justifyContent:'center',
     alignItems:'center'
  },
  explorerImage:{
    marginTop:10,
    height: DIMENSION_HEIGHT1,
    borderRadius:40,
  },
  explorerInnerContainer: {
    width: 337,
    height: 120,
    gap: 8,
    borderRadius: 30,
    backgroundColor: 'rgba(63, 80, 124, 0.40)',
    position:'absolute',
    bottom:0,
    marginBottom:10,
    marginHorizontal:10,
  },
  matchContainer:{
   flexDirection:'row',
   justifyContent:'space-between',
   marginHorizontal:20,
   marginTop:10,
  },
  NameStyle: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24, 
   
  },
  matchText: {
    color: '#000',
    fontFamily: '',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 10,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  MATCHContainer: {
    display: 'flex',
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent:'flex-end',
    alignItems: 'flex-end',
    gap: 4,
    borderRadius: 40,
    backgroundColor: '#FFF',
  },
  line: {
    height: 1,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.10)',
  },
  Container:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginHorizontal:30,
  },
  Row:{
flexDirection:'row'
  },
  justifyRow:{
    flexDirection:'row',marginLeft:10,
  },
  crossContainer: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(63, 80, 124, 0.40)',
    position:'absolute',
    right:0,
    bottom:140,
  },
  heartContainer:{
    padding: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(63, 80, 124, 0.40)',
    position:'absolute',
    right:0,
    bottom:200,
  },
  // CONTAINER - MATCHES
  containerMatches: {
    backgroundColor:'#010510',
    width:DIMENSION_WIDTH,
    height:DIMENSION_HEIGHT
  },
  flexContainer1:{
    flexDirection:'row',gap:50,marginTop:10
  },
  flexContainer2:{
    flexDirection:'row',gap:45,marginTop:10,
  },
  // CONTAINER - MESSAGES
  containerMessages: {
    backgroundColor:'#010510',
    width:DIMENSION_WIDTH,
    height:DIMENSION_HEIGHT
  },
  matchesContainer: {
    width: 148,
    padding: 18,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    position: 'absolute',
    left: 12,
    bottom: 12,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
  },
  // CONTAINER - PROFILE
  containerProfile: { marginHorizontal: 0 },
  photo: {
    width: DIMENSION_WIDTH,
    height: 450,
    // opacity: 0.3,
    
  },
  topIconLeft: {
    paddingLeft: 5,
    color: '#FFF',
    fontFamily: '',
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 24, 
  },
  circle: {
    width: 48,
    height: 48,
    flexShrink: 0, 
    borderRadius: 20,
    backgroundColor: 'rgba(63, 80, 124, 0.16)',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    flexDirection:'row'
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop:50,
  },
  gradient: {
    flex: 1,
   
   
  },
  likeContainer: {
    display: 'flex',
    width: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  topText: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20 * 1.5, 
  },
  bottomText: {
    color: '#D0D9F9',
    fontFamily: '',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14 * 1.5,
  },
  text: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16 * 1.5,
    marginRight:10
  },
  aboutContainer: {
    width: DIMENSION_WIDTH,
    height: 118,
    flexShrink: 0,
    borderRadius: 30,
    backgroundColor: 'rgba(63, 80, 124, 0.40)',
   marginTop:20,
  },
  icon: {
    color: '#D0D9F9',
    fontFamily: '',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14 * 1.5, 
  },
  iconImage:{
    width:16,
    height:16,
    marginTop:2,
    marginRight:5,
  },
  about: {
    color: '#FFF',
    fontFamily: '',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16 * 1.5,
    marginLeft:10,
    marginTop:10,
  },
  topIconRight: {
   
  },
  actionsProfile: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  textButton: {
    fontSize: 15,
    color: WHITE,
    paddingLeft: 5,
  },
  circledButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  roundedButton: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: SECONDARY_COLOR,
    paddingHorizontal: 20,
  },

  // MENU
  tabButtonText: {
    textTransform: "uppercase",
  },
  iconMenu: {
    alignItems: "center",
  },
  
});

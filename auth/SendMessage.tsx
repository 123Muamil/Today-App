import { getDatabase,push,ref } from "firebase/database";
import app from "../config/firebaseConfig";
import moment from "moment";
const database = getDatabase(app);
export const SendMessage = async (currentUserId: any, guestUserId: any, msgValue: any, imgSource: any,videoSource:any,audioSource:any,) => {
  var todayDate = moment();
  try {
    await push(ref(database, `messages/${currentUserId}/${guestUserId}`), {
      message: {
        sender: currentUserId,
        receiver: guestUserId,
        msg: msgValue,
        image: imgSource,
        video:videoSource,
        audio:audioSource,
        date: todayDate.format('YYYY-MM-DD'),
        time: todayDate.format('hh:mm A'),
      },
    });
  } catch (error) {
    return error;
  }
};

export const ReceiveMessage = async (currentUserId: any, guestUserId: any, msgValue: any, imgSource: any,videoSource:any,audioSource:any) => {
  var todayDate = moment();
  try {
    await push(ref(database, `messages/${guestUserId}/${currentUserId}`), {
      message: {
        sender: currentUserId,
        receiver: guestUserId,
        msg: msgValue,
        image: imgSource,
        video:videoSource,
        audio:audioSource,
        date: todayDate.format('YYYY-MM-DD'),
        time: todayDate.format('hh:mm A'),
      },
    });
  } catch (error) {
    return error;
  }
};


//   // Return a function to unsubscribe
//   return unsubscribe;
// };
// import firebase from './firebaseConfig'
// export const sendMessage=async(currentuid,gestuid,message)=>{
//     try {
//       return await firebase.database().ref('messages/'+currentuid).child(gestuid).set({
//         currentuid:currentuid,
//         gestuid:gestuid,
//         message:message
//     })
//     } catch (error) {
//       return error
//     }
// }
// export const receiveMessage=async(currentuid,gestuid,message)=>{
//   try {
//     return await firebase.database().ref('messages/'+gestuid).child(gestuid).set({
//       currentuid:currentuid,
//       gestuid:gestuid,
//       message:message
//   })
//   } catch (error) {
//     return error
//   }
// }
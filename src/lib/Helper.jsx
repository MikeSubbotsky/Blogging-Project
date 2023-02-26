import  { db } from './firebase';
import { collection, addDoc, getDocs, orderBy, query, getDoc, doc, limit} from 'firebase/firestore';

export async function getTweetsArray(dispatchData, setLoading = () => {}, numberOfTweets = 10) {
  setLoading(true);
  try {
    const tweetsCol = collection(db, 'tweets');
    const q = query(tweetsCol, orderBy('date', 'desc'), limit(numberOfTweets));
    const snapshot = await getDocs(q);

    const tweets = await Promise.all(snapshot.docs.map(async id => {
      const docRef = doc(db, 'users', id.data().userID);
      const docSnap = await getDoc(docRef);
      return {
        ...id.data(),
        userName: docSnap.exists() ? docSnap.data().name : null,
        avatarUrl: docSnap.exists() ? docSnap.data().avatarUrl : null
      };
    }));

    dispatchData({ type: 'SET_TWEETS', payload: tweets });
  } catch (e) {
    console.log(e);
  }
  setLoading(false);
}

export async function postTweet(tweetData, setLoading = () => {}) {
  setLoading(true);
  try {
    const tweetsCol = collection(db, 'tweets');
    await addDoc(tweetsCol, tweetData);
  } catch (e) {
    console.log(e);
  }
  setLoading(false);
}

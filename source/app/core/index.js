import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { firebaseConfig } from 'config'

firebase.initializeApp(firebaseConfig)

export const snapShotParser = (snapshot) => {
  if (snapshot.docs) {
    if (snapshot.empty) return []
    return snapshot.docs.map(doc => {
      const data = doc.data()
      data.id = doc.id
      return data
    })
  } else {
    if (!snapshot.exists) return null
    const data = snapshot.data()
    return {
      ...data,
      id: data._id
    }
  }
}

export const db = firebase.firestore()
export default db

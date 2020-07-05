import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { db, snapShotParser } from './'
import { filterObject } from 'helpers/validate'

export const registerOrLoginWidthGoogle = async props => {
  const provider = new firebase.auth.GoogleAuthProvider()
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  provider.addScope('profile')
  provider.addScope('email')
  const result = await firebase.auth().signInWithPopup(provider)
  const { phoneNumber = '', uid = '', email = '', displayName = '' } = result.user

  // register if no exist user on DB
  const dataFromDb = await getData(uid)
  if (!dataFromDb) {
    await add(uid, { number: phoneNumber, name: displayName, email, id: uid })
  }

  return true
}

export const registerOrLoginWithFacebook = async props => {
  const provider = new firebase.auth.FacebookAuthProvider()
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  const result = await firebase.auth().signInWithPopup(provider)
  console.log('result', result)
  // const { phoneNumber = '', uid = '', email = '', displayName = '' } = result.user

  // // register if no exist user on DB
  // const dataFromDb = await getData(uid)
  // if (!dataFromDb) {
  //   await add(uid, { number: phoneNumber, name: displayName, email, id: uid })
  // }

  // return true
}

export const register = async data => {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    console.log(result)
    await add(result.user.uid, data)
    return result.user.uid
  } catch (error) {
    console.log(error)
    return null
  }
}

export default {
  registerOrLoginWidthGoogle
}

export const getData = async (userId = '') => {
  const snapshot = await db.doc(`users/${userId}`).get()
  return snapShotParser(snapshot)
}

export const add = async (id, data) => {
  try {
    const dataFiltered = filterObject(data, ['name', 'email', 'number', 'state', 'adress', 'city', 'gender'])
    await db.doc(`users/${id}`).set(dataFiltered)
    return id
  } catch (error) {
    return null
  }
}

export const onSessionChange = (handler) => {
  try {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const data = await getData(user.uid)
        handler(data)
      } else {
        handler(null)
      }
    })
  } catch (error) {
    handler(null)
  }
}

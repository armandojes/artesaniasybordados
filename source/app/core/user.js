import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { db, snapShotParser } from './'
import { filterObject } from 'helpers/validate'

export const registerOrLoginWidthGoogle = async props => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    provider.addScope('profile')
    provider.addScope('email')
    const result = await firebase.auth().signInWithPopup(provider)
    console.log(result)
    const { phoneNumber = '', uid = '', email = '', displayName = '', photoURL = null } = result.user

    // register if no exist user on DB
    const dataFromDb = await getData(uid)
    if (!dataFromDb) {
      await add(uid, { number: phoneNumber, name: displayName, email, id: uid, photo: photoURL })
    }
    return { errorMessage: null }
  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      return { errorMessage: 'Ya hay una cuenta registrada con este mismo correo, contactanos para ayudarte a recuperar el acceso a tu cuenta' }
    }
    return { errorMessage: null }
  }
}

export const registerOrLoginWithFacebook = async props => {
  try {
    const provider = new firebase.auth.FacebookAuthProvider()
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    const result = await firebase.auth().signInWithPopup(provider)
    console.log('result', result)
    const { phoneNumber = '', uid = '', email = '', displayName = '' } = result.user

    // register if no exist user on DB
    const dataFromDb = await getData(uid)
    if (!dataFromDb) {
      await add(uid, { number: phoneNumber, name: displayName, email, id: uid })
    }
    return { errorMessage: null }
  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      return { errorMessage: 'Ya hay una cuenta registrada con este mismo correo, contactanos para ayudarte a recuperar el acceso a tu cuenta' }
    }
    return { errorMessage: null }
  }
}

export const register = async data => {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    await add(result.user.uid, data)
    return { id: result.user.uid, errorMessage: null }
  } catch (error) {
    console.log(error)
    if (error.code === 'auth/email-already-in-use') {
      return { errorMessage: 'Ya hay una cuenta registrada con este mismo correo, contactanos para ayudarte a recuperar el acceso a tu cuenta' }
    }
    if (error.code === 'auth/invalid-email') {
      return { errorMessage: 'El correo no es válido' }
    }
    return { errorMessage: null }
  }
}

export const getData = async (userId = '') => {
  const snapshot = await db.doc(`users/${userId}`).get()
  return snapShotParser(snapshot)
}

export const add = async (id, data) => {
  try {
    const dataFiltered = filterObject(data, ['name', 'email', 'number', 'state', 'adress', 'city', 'gender', 'photo'])
    dataFiltered.admin = false
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
        // await new Promise(resolve => setTimeout(resolve, 3000))
        const data = await getData(user.uid)
        handler(filterObject(data, ['number', 'email', 'photo', 'name', 'admin', 'id']))
      } else {
        handler(null)
      }
    })
  } catch (error) {
    handler(null)
  }
}

export const loginWidthEmailAndPassword = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    return { errorMessage: null }
  } catch (error) {
    console.log('error login wirh email and password', error)
    return { errorMessage: 'Correo o contraseña incorrecta' }
  }
}

export const logOut = async () => {
  try {
    await firebase.auth().signOut()
    return true
  } catch (error) {
    console.log('error_closing-session', error)
    return false
  }
}
export default {
  registerOrLoginWidthGoogle
}

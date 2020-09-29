/* eslint-disable handle-callback-err */
/* eslint-disable no-new */
import firebase from 'firebase/app'
import 'firebase/storage'
import Compressor from 'compressorjs'

const resizeFile = (file) => new Promise(resolve => {
  new Compressor(file, {
    quality: 1,
    maxWidth: 1800,
    success: (result) => {
      resolve(result)
    },
    error: (error) => {
      resolve(null)
    }
  })
})

const storageRef = firebase.storage().ref()
const baseStorageUrl = 'https://firebasestorage.googleapis.com/v0/b'
const bucket = storageRef.bucket

export const uploadPicture = async (path, file, isPrimary = false) => {
  try {
    var name = isPrimary ? `primary_${file.name}` : file.name
    const compresed = await resizeFile(file)
    await storageRef.child(`${path}/${name}`).put(compresed)
    const fullPathEncoded = encodeURIComponent(`${path}/${name}`)
    return `${baseStorageUrl}/${bucket}/o/${fullPathEncoded}?alt=media`
  } catch (error) {
    console.error(error)
    return null
  }
}

export const drop = async url => {
  try {
    var filePath = decodeURIComponent(url)
    filePath = filePath.split('/o/')[1]
    filePath = filePath.split('?alt=media')[0]
    await storageRef.child(filePath).delete()
    return true
  } catch (error) {
    return false
  }
}

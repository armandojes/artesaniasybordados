import firebase from 'firebase/app'
import 'firebase/storage'

const storageRef = firebase.storage().ref()
const baseStorageUrl = 'https://firebasestorage.googleapis.com/v0/b'
const bucket = storageRef.bucket

export const uploadPicture = async (path, file, isPrimary = false) => {
  try {
    var name = file.name
    if (isPrimary) name = `primary_${name}`
    await storageRef.child(`${path}/${name}`).put(file)
    const fullPathEncoded = encodeURIComponent(`${path}/${name}`)
    return `${baseStorageUrl}/${bucket}/o/${fullPathEncoded}?alt=media`
  } catch (error) {
    console.error(error)
    return null
  }
}

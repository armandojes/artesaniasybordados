import firebase from 'firebase/app'
import 'firebase/storage'

const resizeFile = (file) => new Promise(resolve => {
  return resolve(file)
})

const storageRef = firebase.storage().ref()
const baseStorageUrl = 'https://firebasestorage.googleapis.com/v0/b'
const bucket = storageRef.bucket

export const uploadPicture = async (path, file, isPrimary = false) => {
  try {
    const compresedFile = await resizeFile(file)
    var name = file.name
    if (isPrimary) name = `primary_${name}`
    await storageRef.child(`${path}/${name}`).put(compresedFile)
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

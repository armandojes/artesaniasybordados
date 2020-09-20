/* eslint-disable handle-callback-err */
/* eslint-disable no-new */
import firebase from 'firebase/app'
import 'firebase/storage'
import Compressor from 'compressorjs'
import waterMarkSource from '../assets/waterMark.png'
var watermark = require('watermarkjs')

const resizeFile = (file) => new Promise(resolve => {
  new Compressor(file, {
    quality: 0.8,
    maxWidth: 1800,
    minWidth: 1800,
    success: (result) => {
      resolve(result)
    },
    error: (error) => {
      resolve(null)
    }
  })
})

const addWaterMark = async blob => {
  const options = {
    init: function (img) {
      console.log('imgConfig', img)
      img.crossOrigin = ''
    }
  }

  try {
    const resultWaterAdded = await watermark([blob, waterMarkSource], options).blob(watermark.image.upperLeft(0.8))
    return resultWaterAdded
  } catch (error) {
    console.log('addWaterMarkError', error)
    return null
  }
}

const storageRef = firebase.storage().ref()
const baseStorageUrl = 'https://firebasestorage.googleapis.com/v0/b'
const bucket = storageRef.bucket

export const uploadPicture = async (path, file, isPrimary = false) => {
  try {
    console.log('size original', `${file.size / 1000} kb`)
    var name = isPrimary ? `primary_${file.name}` : file.name
    const compresed = await resizeFile(file)
    console.log('size compresed', `${compresed.size / 1000} kb`)
    var compresdWithMark = await addWaterMark(compresed)
    console.log('size added mark', `${compresdWithMark.size / 1000} kb`)
    compresdWithMark = await resizeFile(compresdWithMark)
    console.log('size after added mark', `${compresdWithMark.size / 1000} kb`)
    await storageRef.child(`${path}/${name}`).put(compresdWithMark)
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

/* eslint-disable handle-callback-err */
/* eslint-disable no-new */
import firebase from 'firebase/app'
import 'firebase/storage'
import Compressor from 'compressorjs'
import { getList } from 'core/articles'

const meta = {
  cacheControl: 'public, max-age=604800'
}

const getFilePath = url => {
  var filePath = decodeURIComponent(url)
  filePath = filePath.split('/o/')[1]
  filePath = filePath.split('?alt=media')[0]
  return filePath
}

const resizeFile = (file) => new Promise(resolve => {
  new Compressor(file, {
    quality: 0.9,
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
    await storageRef.child(`${path}/${name}`).put(compresed, meta)
    const fullPathEncoded = encodeURIComponent(`${path}/${name}`)
    return `${baseStorageUrl}/${bucket}/o/${fullPathEncoded}?alt=media`
  } catch (error) {
    console.error(error)
    return null
  }
}

export const drop = async url => {
  try {
    var filePath = getFilePath(url)
    await storageRef.child(filePath).delete()
    return true
  } catch (error) {
    return false
  }
}

window.updateMetada = async () => {
  const data = await getList(10000)()
  var list = []
  data.forEach(article => {
    const picture = getFilePath(article.picture)
    const pictures = article.pictures ? article.pictures.map(picture => getFilePath(picture)) : []
    list = [...list, picture, ...pictures]
  })

  for (const item of list) {
    console.log('updating', item)
    const result = await storageRef.child(item).updateMetadata(meta)
    console.log(result)
  }
}

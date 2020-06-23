import DB, { snapShotParser } from './index'

export const getList = async _param => {
  try {
    const snapshot = await DB.collection('articles').get()
    return snapShotParser(snapshot)
  } catch (error) {
    console.log('__error__', error)
    return []
  }
}

export const add = async data => {
  try {
    const { title, price, category, gender, picture, pictures, description } = data
    const result = await DB.collection('articles').add({
      title, price, category, gender, picture, pictures, description, date: new Date()
    })
    return result.id
  } catch (error) {
    console.log('_error_', error)
    return null
  }
}

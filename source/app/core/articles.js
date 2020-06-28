import DB, { snapShotParser } from './index'
import { filterObject } from 'helpers/validate'

export const getList = async _param => {
  try {
    const snapshot = await DB.collection('articles').get()
    return snapShotParser(snapshot)
  } catch (error) {
    console.log('__error__', error)
    return []
  }
}

export const getListAll = (limit = 5) => {
  var last = null
  var finished = false

  return async () => {
    if (finished) return []
    try {
      let query = DB.collection('articles')
      if (last) query = query.startAfter(last)
      if (limit) query = query.limit(limit)
      const snapshot = await query.get()
      last = snapshot.docs[snapshot.docs.length - 1]
      if (snapshot.docs.length !== limit) finished = true
      return snapShotParser(snapshot)
    } catch (error) {
      console.log('__error__', error)
      return []
    }
  }
}

export const add = async data_ => {
  const allow = ['title', 'price', 'gender', 'description']
  const data = filterObject(data_, allow)
  try {
    const result = await DB.collection('articles').add({ ...data, date: new Date() })
    return result.id
  } catch (error) {
    console.log('_error_', error)
    return null
  }
}

export const update = async (id, data_) => {
  const allow = ['title', 'price', 'gender', 'description', 'pictures', 'picture']
  const data = filterObject(data_, allow)

  try {
    await DB.doc(`articles/${id}`).update({ ...data, date: new Date() })
    return id
  } catch (error) {
    console.log('_error_', error)
    return null
  }
}

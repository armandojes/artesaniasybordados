import { db, snapShotParser } from 'core/index'
import { filterObject } from 'helpers/validate'

export const add = async data => {
  const items = data.items.map(item => filterObject(item, ['picture', 'category', 'price', 'gender', 'id', 'quantity', 'title']))
  const dateToSave = {
    userId: data.userId,
    total: data.total,
    info: data.info,
    items,
    date: new Date()
  }
  const { id } = await db.collection('sales').add(dateToSave)
  console.log(id)
}

export const get = async (id) => {
  const snap = await db.doc(`sales/${id}`).get()
  return snapShotParser(snap)
}

export const setPayed = async id => {
  await db.doc(`sales/${id}`).update({
    status: 'payed'
  })
}

export const setDeliered = async id => {
  await db.doc(`sales/${id}`).update({
    status: 'delivered'
  })
}

export const setPending = async id => {
  await db.doc(`sales/${id}`).update({
    status: 'pending'
  })
}

export const setSent = async (id, shippingInfo = {}) => {
  await db.doc(`sales/${id}`).update({
    status: 'sent',
    shippingInfo
  })
}

export const getList = (limit = 20) => {
  var last = null
  var finished = false

  return async () => {
    if (finished) return []
    try {
      let query = db.collection('sales').orderBy('date', 'desc')
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

export default {
  add,
  getList,
  setPayed,
  setDeliered,
  setPending,
  setSent
}

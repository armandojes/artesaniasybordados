import { db, snapShotParser } from 'core/index'

export const add = async (userId, data) => {
  await db.doc(`users/${userId}`).update({
    cart: data
  })
  await new Promise(resolve => setTimeout(resolve, 1000))
}

export const onCartChange = (userId, handler) => {
  const unSubscribe = db.doc(`users/${userId}`).onSnapshot(snapshot => {
    try {
      const data = snapShotParser(snapshot)
      console.log('data', data)
      if (data.cart) handler(data.cart)
      else handler([])
    } catch (error) {
      handler([])
      console.log('error', error)
    }
  })
  return unSubscribe
}

export default {
  add
}

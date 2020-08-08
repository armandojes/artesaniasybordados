import { db, snapShotParser } from 'core/index'
import iconSrc from '../assets/icon.png'

export const purchaseSent = async (userId, purchaseId) => {
  try {
    await deleteSamePurchaseId(userId, purchaseId)
    await setNotification(userId, true)
    const { id } = await db.collection(`users/${userId}/notifications`).add({
      isViewed: false,
      userId,
      pathname: `compra/${purchaseId}`,
      purchaseId,
      type: 'purchaseSent',
      content: `Tu compra ${purchaseId} esta en camino.`,
      icon: iconSrc
    })
    return id
  } catch (error) {
    console.log('purchaseSentError', error)
    return null
  }
}

export const purchasePayed = async (userId, purchaseId) => {
  try {
    await deleteSamePurchaseId(userId, purchaseId)
    await setNotification(userId, true)
    const { id } = await db.collection(`users/${userId}/notifications`).add({
      isViewed: false,
      userId,
      pathname: `compra/${purchaseId}`,
      purchaseId,
      type: 'purchasePayed',
      content: `Hemos recibido el pago de tu compra ${purchaseId}, estamos preparando tu paquete.`,
      icon: iconSrc
    })
    return id
  } catch (error) {
    console.log('purchasePayedError', error)
    return null
  }
}

export const purchaseDelivered = async (userId, purchaseId) => {
  try {
    await deleteSamePurchaseId(userId, purchaseId)
    await setNotification(userId, true)
    const { id } = await db.collection(`users/${userId}/notifications`).add({
      isViewed: false,
      userId,
      pathname: `compra/${purchaseId}`,
      purchaseId,
      type: 'purchaseDelivered',
      content: `Hemos entregado tu paquete ${purchaseId}`,
      icon: iconSrc
    })
    return id
  } catch (error) {
    console.log('purchaseDeliveredError', error)
    return null
  }
}

export const deleteSamePurchaseId = async (userId, purchaseId) => {
  try {
    const snapshsot = await db.collection(`users/${userId}/notifications`).where('purchaseId', '==', purchaseId).get()
    await Promise.all(snapshsot.docs.map(async document => {
      await document.ref.delete()
    }))
    return true
  } catch (error) {
    return null
  }
}

export const setNotification = async (userId, payload) => {
  await db.doc(`users/${userId}`).update({
    isNotificationActive: payload
  })
}

export const onNotificationChange = (userId, handler) => {
  const unSubscribe = db.doc(`/users/${userId}`).onSnapshot(snapshot => {
    const data = snapShotParser(snapshot)
    handler(data.isNotificationActive || false)
  })
  return unSubscribe
}

export default {
  purchaseSent,
  purchasePayed,
  purchaseDelivered,
  onNotificationChange
}

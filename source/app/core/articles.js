import db, { snapShotParser } from './index'
import { filterObject } from 'helpers/validate'
import { drop as dropFile } from './storage'
import { categories, genders, subCategories } from '../constants'

export const setDisable = async articleId => {
  try {
    const { id, ...data } = await getSingle(articleId)
    await db.doc(`articles/${articleId}`).delete()
    await db.doc(`disabledArticles/${articleId}`).set(data)
    return true
  } catch (error) {
    console.log('setDisableError', error)
    return false
  }
}

export const setEnable = async articleId => {
  try {
    const { id, ...data } = await getSingleDisabled(articleId)
    await db.doc(`disabledArticles/${articleId}`).delete()
    await db.doc(`articles/${articleId}`).set(data)
    return true
  } catch (error) {
    console.log('setEnableError', error)
    return false
  }
}

export const getSingle = async id => {
  const snapshot = await db.doc(`articles/${id}`).get()
  return snapShotParser(snapshot)
}

export const getSingleDisabled = async id => {
  const snapshot = await db.doc(`disabledArticles/${id}`).get()
  return snapShotParser(snapshot)
}

export const getList = (limit = 10, filters = {}) => {
  var last = null
  var finished = false

  return async () => {
    if (finished) return []
    try {
      let query = db.collection('articles')
      if (!filters.keywords) query = query.orderBy('date', 'desc')
      if (filters.category) query = query.where('category', '==', filters.category)
      if (filters.subcategory) query = query.where('subcategory', '==', filters.subcategory)
      if (filters.gender) query = query.where('gender', '==', filters.gender)

      if (filters.keywords) {
        const searchKeywords = filters.keywords.trim().split(' ').map(word => word.toLowerCase())
        searchKeywords.forEach(keyword => {
          query = query.where(`keywords.${keyword}`, '==', true)
        })
      }

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

export const getListDisableds = (limit = 10) => {
  var last = null
  var finished = false

  return async () => {
    if (finished) return []
    try {
      let query = db.collection('disabledArticles')
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

// create a new article
// return id or null
export const add = async data_ => {
  // check if the id is not at disabledArticles
  var idCreated = null
  while (!idCreated) {
    const docRef = db.collection('articles').doc()
    const doesExistAtDisableArticles = await getSingleDisabled(docRef.id)
    const doesExistAtArticles = await getSingle(docRef.id)
    if (!doesExistAtDisableArticles && !doesExistAtArticles) idCreated = docRef.id
  }

  var keywords = {}
  data_.title.trim().split(' ').forEach(word => { keywords[word.toLowerCase()] = true })
  const allow = ['weight', 'title', 'price', 'gender', 'description', 'category', 'subcategory', 'quantity', 'sizes']
  const data = filterObject(data_, allow)
  data.price = parseInt(data.price)
  data.quantity = parseInt(data.quantity)
  data.weight = parseInt(data.weight)

  try {
    await db.doc(`articles/${idCreated}`).set({ ...data, date: new Date(), keywords })
    return idCreated
  } catch (error) {
    console.log('_error_', error)
    return null
  }
}

export const update = async (id, data_) => {
  var keywords = {}
  data_.title.trim().split(' ').forEach(word => { keywords[word.toLowerCase()] = true })
  const allow = ['weight', 'title', 'price', 'gender', 'description', 'pictures', 'picture', 'category', 'subcategory', 'quantity', 'sizes']
  const data = filterObject(data_, allow)
  data.price = parseInt(data.price)
  data.quantity = parseInt(data.quantity)
  data.weight = parseInt(data.weight)

  try {
    await db.doc(`articles/${id}`).update({ ...data, date: new Date(), keywords })
    return id
  } catch (error) {
    console.log('_error_', error)
    return null
  }
}

export const drop = async data => {
  try {
    await db.doc(`articles/${data.id}`).delete()
    await Promise.all(data.pictures.map(picture => dropFile(picture)))
    await dropFile(data.picture)
    return true
  } catch (error) {
    return false
  }
}

const createFakeArticles = async () => {
  const categories_ = Object.keys(categories)
  const subCategories_ = Object.keys(subCategories)
  const genders_ = Object.keys(genders)

  for (const gender of genders_) {
    for (const category of categories_) {
      for (const subcategory of subCategories_) {
        console.log('__will_create__', `prueba => ${gender} => ${category} => ${subcategory}`)
        const idCreated = await add({
          weight: 100,
          pictures: [],
          title: `prueba => ${gender} => ${category} => ${subcategory}`,
          price: 2000,
          gender,
          quantity: 10,
          category,
          subcategory,
          description: `
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ‘lorem ipsum’ will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          
          Where does it come from?
          
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet…”, comes from a line in section 1.10.32.
          `
        })
        await update(idCreated, {
          picture: 'https://http2.mlstatic.com/lote-de-6-blusas-kimonas-bordadas-chiapas-D_NQ_NP_801532-MLM40332406734_012020-O.webp',
          pictures: [],
          title: `prueba => ${gender} => ${category} => ${subcategory}`,
          price: parseInt(2000),
          quantity: parseInt(20),
          weight: parseInt(100)
        })
      }
    }
  }
}

if (ENV === 'development') window.create = createFakeArticles

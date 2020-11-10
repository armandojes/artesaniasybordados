import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getSingle } from 'core/articles'
import useObjectState from 'hooks/useState'
import useFetch from 'hooks/useFetch'
import View from './view'
import Layout from 'components/layout_user'
import Container from 'components/container'
import LoginModal from './login'
import { useSelector, useDispatch } from 'react-redux'
import { add } from 'flux/cart'
import { setNotification } from 'flux/notifications'

const Article = props => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [state, setState] = useObjectState({ loading: true, data: {} })
  const [options, setOptions] = useObjectState({ quantity: 1 })
  const [isLoginModalOpne, setLoginModal] = useState(false)
  const session = useSelector(state => state.session)

  var pictures = []
  if (!state.loading && state.data.pictures) pictures = [state.data.picture, ...state.data.pictures]

  useFetch(async () => {
    const data = await getSingle(id)
    console.log('response', data)
    setState({ data, loading: false })
  }, [])

  const handleAddToCart = event => {
    if (!session) return setLoginModal(true)
    dispatch(add({ ...state.data, price: state.data.price, quantity: options.quantity, size: options.size || null }))
    dispatch(setNotification({ message: `${options.quantity} ${state.data.title} agregado al carrito` }))
  }

  // set initial options
  useEffect(() => {
    if (!!state.data.sizes && !!state.data.sizes.length) {
      setOptions({ size: state.data.sizes[0] })
    }
  }, [state.loading])

  // scrollTotop
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <Layout>
      <Container $page>
        {(!session || session === 'loading') && (
          <LoginModal
            open={isLoginModalOpne}
            onClose={event => setLoginModal(false)}
          />
        )}
        <View
          onAddToCart={handleAddToCart}
          options={options}
          setOptions={setOptions}
          data={{
            ...state.data,
            price: state.data.price
          }}
          loading={state.loading}
          pictures={pictures}
        />
      </Container>
    </Layout>
  )
}

export default Article

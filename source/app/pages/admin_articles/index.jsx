import React, { useEffect, useMemo } from 'react'
import Admin from 'components/admin'
import Container from 'components/container'
import { TitlePage } from 'components/main'
import { Grid } from '@material-ui/core'
import { getList, drop, setDisable, getListDisableds, setEnable } from 'core/articles'
import useObjectState from 'hooks/useState'
import Skeleton from 'components/skeletonGrid'
import Card from './card'
import { setAlert } from 'flux/alert'
import { useDispatch } from 'react-redux'
import session from 'components/session'
import { setNotification } from 'flux/notifications'
import Menu from './menu'

const List = () => {
  const limit = 5
  const dispatch = useDispatch()
  const [state, setState] = useObjectState({
    currentList: 'all',
    items: [],
    finished: false
  })

  const fetchNextpage = useMemo(() => state.currentList === 'disabled' ? getListDisableds() : getList(), [state.currentList])

  const handlefetch = async () => {
    setState({ loading: true })
    const items = await fetchNextpage()
    setState({
      items: [...state.items, ...items],
      finished: items.length < limit,
      loading: false
    })
  }

  useEffect(() => {
    handlefetch()
  }, [fetchNextpage])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return _event => window.removeEventListener('scroll', handleScroll)
  })

  const handleScroll = _event => {
    if (state.loading) return false
    const scrolled = window.scrollY
    const viewportHeight = window.innerHeight
    const fullHeight = document.getElementById('render_target').clientHeight
    if ((scrolled + viewportHeight + 100) < fullHeight) return false
    console.log('loading: false')
    if (state.finished) return false
    handlefetch()
  }

  const handleDelete = data => {
    dispatch(setAlert({
      description: '¿Seguro quieres borrar este articulo?',
      action: async () => {
        await drop(data)
        const itemsFiltered = state.items.filter(currentItem => currentItem.id !== data.id)
        setState({ items: itemsFiltered })
        dispatch(setNotification({ message: 'El articulo se ha eliminado' }))
      }
    }))
  }

  const handleDisable = async ({ id }) => {
    dispatch(setAlert({
      description: '¿Seguro quieres deshabilitar este articulo? los articulos deshabilitados no seran visibles para los clientes',
      action: async (dispatch) => {
        await setDisable(id)
        const itemsFiltered = state.items.filter(currentItem => currentItem.id !== id)
        setState({ items: itemsFiltered })
        dispatch(setNotification({ message: 'El articulo se ha deshabilitado' }))
      }
    }))
  }

  const handleEnable = ({ id }) => {
    const itemsFiltered = state.items.filter(currentItem => currentItem.id !== id)
    setEnable(id)
    setState({ items: itemsFiltered })
    dispatch(setNotification({ message: 'El articulo se ha habilitado' }))
  }

  const handleListChange = val => {
    setState({ items: [], finished: false, currentList: val })
  }

  return (
    <Admin>
      <Container $page>
        <TitlePage>Mis articulos</TitlePage>
        <Menu onChange={handleListChange} value={state.currentList} />
        <Grid container spacing={2}>
          {state.items.map(item => (
            <Grid key={item.id} item xs={6} sm={4} md={3}>
              <Card
                {...item}
                isDisabled={state.currentList === 'disabled'}
                handleDelete={handleDelete}
                onDisable={handleDisable}
                onEnable={handleEnable}
              />
            </Grid>
          ))}
        </Grid>
        {state.loading && !state.items.length && (
          <Skeleton />
        )}
      </Container>
    </Admin>
  )
}

export default session(List, true)

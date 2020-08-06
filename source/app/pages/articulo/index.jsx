import React from 'react'
import { useParams } from 'react-router'
import { getSingle } from 'core/articles'
import useObjectState from 'hooks/useState'
import useFetch from 'hooks/useFetch'
import View from './view'

const Article = props => {
  const { id } = useParams()
  const [state, setState] = useObjectState({ loading: true, data: {} })
  const [options, setOptions] = useObjectState({})
  const pictures = state.loading ? [] : [state.data.picture, ...state.data.pictures]

  useFetch(async () => {
    const data = await getSingle(id)
    console.log('response', data)
    setState({ data, loading: false })
  }, [])

  return (
    <View
      options={options}
      setOptions={setOptions}
      data={state.data}
      loading={state.loading}
      pictures={pictures}
    />
  )
}

export default Article

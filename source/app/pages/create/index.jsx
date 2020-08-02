import React, { useState } from 'react'
import Admin from 'components/admin'
import Container from 'components/container'
import Form from './form'
import Loading from './loading'
import Success from './success'
import Session from 'components/session'

const Create = props => {
  const [view, setView] = useState('form')
  const [message, setMessage] = useState('')
  const [id, setId] = useState('')

  return (
    <Admin>
      <Container page>
        {view === 'form' && (
          <Form setView={setView} setMessage={setMessage} setId={setId} />
        )}
        {view === 'loading' && (
          <Loading message={message} />
        )}
        {view === 'success' && (
          <Success id={id} />
        )}
      </Container>
    </Admin>
  )
}

export default Session(Create, true)

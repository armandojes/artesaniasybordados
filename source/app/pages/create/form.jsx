import React, { useState } from 'react'
import Stepper from './stepper'
import { Grid, Button, Container, Box } from '@material-ui/core'
import useObjectState from 'hooks/useState'
import GeneralData from './generalData'
import Description from './description'
import Multimedia from './multimedia'
import { requires } from 'helpers/validate'
import propTypes from 'prop-types'
import { add, update } from 'core/articles'
import { uploadPicture, drop } from 'core/storage'
import { useLocation } from 'react-router-dom'
import { FullWidthCentered } from 'components/main'

const Form = props => {
  const location = useLocation()
  const steps = ['Datos generales', 'Descripcion', 'Multimedia', 'Confirmacion']
  const initialState = location.state
  var indexUploading = 1
  const [state, setState] = useObjectState(initialState || {})
  const [currentStep, setCurrentStep] = useState(0)
  const fileToUpload = state.pictures ? state.pictures.filter(picture => typeof picture !== 'string') : []
  var totalToUpload = state.pictures ? (fileToUpload.length) : 0
  if (state && typeof state.picture === 'object') totalToUpload++

  const handleUpdateMessage = () => {
    if (totalToUpload >= indexUploading) props.setMessage(`Subiendo imagenes ${indexUploading} de ${totalToUpload}`)
    indexUploading++
  }

  const handleNext = _event => {
    setCurrentStep(currentStep + 1)
  }

  const handleback = _event => setCurrentStep(currentStep - 1)

  const handleSave = async _event => {
    const datasRequire = ['title', 'gender', 'price', 'description', 'picture', 'pictures']
    const errors = requires(state, datasRequire)
    if (errors) {
      window.alert('hay un error')
      return setState({ errors, errorMessage: 'existen campos vacios' })
    }

    var articleId = initialState ? initialState.id : null
    if (!initialState) {
      articleId = await add(state)
      props.setId(articleId)
    } else {
      props.setId(initialState.id)
    }

    // delete pictures if exist
    if (initialState) {
      const filesToDelete = initialState.pictures.filter(src => !state.pictures.includes(src))
      await Promise.all(filesToDelete.map(src => drop(src)))
    }

    // delete principal picture
    if (initialState && typeof state.picture === 'object') {
      await drop(initialState.picture)
    }

    const picturesUrl = initialState ? initialState.pictures.filter(src => state.pictures.includes(src)) : []
    console.log('fileToUpload 1', fileToUpload)
    for (let index = 0; index < fileToUpload.length; index++) {
      console.log('fileToUpload 2', fileToUpload)
      handleUpdateMessage()
      const currentFile = fileToUpload[index]
      const url = await uploadPicture(articleId, currentFile)
      picturesUrl.push(url)
    }

    // upload principal photo
    var pictureUrl = initialState ? initialState.picture : null
    if (typeof state.picture === 'object') {
      pictureUrl = await uploadPicture(articleId, state.picture, true)
      handleUpdateMessage()
    }

    await update(articleId, {
      ...state,
      picture: pictureUrl,
      pictures: picturesUrl.filter(url => !!url)
    })

    props.setView('success')
  }

  return (
    <FullWidthCentered>
      <Container maxWidth='md'>
        <form>
          <Stepper steps={steps} activeStep={currentStep} />

          <Box pt={5} pb={5}>
            {currentStep === 0 && (
              <GeneralData state={state} setState={setState} />
            )}
            {currentStep === 1 && (
              <Description state={state} setState={setState} />
            )}
            {currentStep === 2 && (
              <Multimedia state={state} setState={setState} />
            )}
          </Box>

          <Grid container justify='flex-end' spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Button disabled={!currentStep} size='large' color='primary' variant='outlined' fullWidth onClick={handleback}>Atras</Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {(currentStep + 1) < steps.length && (
                <Button size='large' color='primary' variant='contained' fullWidth onClick={handleNext}>Siguente</Button>
              )}
              {(currentStep + 1) >= steps.length && (
                <Button size='large' color='primary' variant='contained' fullWidth onClick={handleSave}>Publicar</Button>
              )}
            </Grid>
          </Grid>

        </form>
      </Container>
    </FullWidthCentered>
  )
}

Form.propTypes = {
  setView: propTypes.func,
  setMessage: propTypes.func,
  setId: propTypes.func
}

export default Form

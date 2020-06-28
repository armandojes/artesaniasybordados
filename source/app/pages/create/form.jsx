import React, { useState } from 'react'
import Stepper from './stepper'
import { Grid, Button } from '@material-ui/core'
import useObjectState from 'hooks/useState'
import GeneralData from './generalData'
import Description from './description'
import Multimedia from './multimedia'
import { requires } from 'helpers/validate'
import propTypes from 'prop-types'
import { add, update } from 'core/articles'
import { uploadPicture } from 'core/storage'

const Form = props => {
  const steps = ['Datos generales', 'Descripcion', 'Multimedia', 'Confirmacion']
  const [state, setState] = useObjectState({})
  const [currentStep, setCurrentStep] = useState(0)
  const totalToUpload = state.pictures ? (state.pictures.length + 1) : 0
  var indexUploading = 1

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
    props.setView('loading')
    const picturesUrl = []
    const articleId = await add(state)
    props.setId(articleId)

    for (let index = 0; index < state.pictures.length; index++) {
      handleUpdateMessage()
      const currentFile = state.pictures[index]
      const url = await uploadPicture(articleId, currentFile)
      picturesUrl.push(url)
    }

    const pictureUrl = await uploadPicture(articleId, state.picture, true)
    handleUpdateMessage()
    await update(articleId, {
      picture: pictureUrl,
      pictures: picturesUrl.filter(url => !!url)
    })

    props.setView('success')
  }

  return (
    <form>
      <Stepper steps={steps} activeStep={currentStep} />

      {currentStep === 0 && (
        <GeneralData state={state} setState={setState} />
      )}
      {currentStep === 1 && (
        <Description state={state} setState={setState} />
      )}
      {currentStep === 2 && (
        <Multimedia state={state} setState={setState} />
      )}

      <Grid container justify='center' spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button size='large' color='primary' variant='outlined' fullWidth onClick={handleback}>Atras</Button>
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
  )
}

Form.propTypes = {
  setView: propTypes.func,
  setMessage: propTypes.func,
  setId: propTypes.func
}

export default Form

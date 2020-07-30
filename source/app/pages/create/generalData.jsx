import TextField from 'components/inputs/group'
import React from 'react'
import { Grid } from '@material-ui/core'
import { object, func } from 'prop-types'
import { categories, subCategories, genders } from '../../constants'

const GeneralData = props => {
  return (
    <Grid container justify='center' spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField margin='none' label='Titulo' name='title' state={props.state} setState={props.setState} limit={50} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField margin='none' label='Precio' name='price' state={props.state} setState={props.setState} filter='number' limit={10} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField margin='none' label='Cantidad' name='quantity' state={props.state} setState={props.setState} filter='number' limit={10} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField margin='none' label='Genero' name='gender' state={props.state} setState={props.setState} type='select' options={genders} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField margin='none' label='Categoria' name='category' state={props.state} setState={props.setState} type='select' options={categories} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField margin='none' label='Sub categoria' name='subcategory' state={props.state} setState={props.setState} type='select' options={subCategories} />
      </Grid>
    </Grid>
  )
}

GeneralData.propTypes = {
  state: object,
  setState: func
}

export default GeneralData

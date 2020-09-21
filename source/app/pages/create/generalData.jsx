import TextField from 'components/inputs/group'
import React, { useState } from 'react'
import { Grid, Chip } from '@material-ui/core'
import { object, func } from 'prop-types'
import { categories, subCategories, genders } from '../../constants'
import styled from 'styled-components'

const ChipStyled = styled(Chip)`
  margin-right: 10px;
`

const GeneralData = props => {
  const [input, setInput] = useState('')

  const handleChange = event => {
    const value = event.target.value.toString()
    const lastCharacter = value.substr(value.length - 1)
    if (lastCharacter === ',') {
      if (props.state.sizes) props.setState({ sizes: [...props.state.sizes, input] })
      else props.setState({ sizes: [input] })
      setInput('')
    } else {
      setInput(event.target.value)
    }
  }

  const handleDelete = indexTodelete => {
    const newSizes = props.state.sizes.filter((_, index) => index !== indexTodelete)
    if (newSizes.length) props.setState({ sizes: newSizes })
    else props.setState({ sizes: null })
  }

  return (
    <Grid container justify='center' spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField label='Titulo' name='title' state={props.state} setState={props.setState} limit={50} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField label='Precio' name='price' state={props.state} setState={props.setState} filter='number' limit={10} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField label='Cantidad' name='quantity' state={props.state} setState={props.setState} filter='number' limit={10} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField label='Peso en gramos' name='weight' state={props.state} setState={props.setState} filter='number' limit={10} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField label='Genero' name='gender' state={props.state} setState={props.setState} type='select' options={genders} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField label='Categoria' name='category' state={props.state} setState={props.setState} type='select' options={categories} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField label='Sub categoria' name='subcategory' state={props.state} setState={props.setState} type='select' options={subCategories} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField label='Tallas' name='sizes' value={input} onChange={handleChange} />
      </Grid>
      <Grid item xs={12} md={6}>
        {props.state.sizes && props.state.sizes.map((size, index) => (
          <ChipStyled
            color='primary'
            onDelete={event => handleDelete(index)}
            key={index}
            label={size}
          />
        ))}
      </Grid>
    </Grid>
  )
}

GeneralData.propTypes = {
  state: object,
  setState: func
}

export default GeneralData

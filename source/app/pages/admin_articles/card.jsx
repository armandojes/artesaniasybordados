import React from 'react'
import { string, oneOfType, number } from 'prop-types'
import { Paper, Menu } from 'components/main'
import Picture from 'components/Picture'
import { Typography, MenuItem } from '@material-ui/core'
import styled from 'styled-components'

const PaperStyled = styled(Paper)`
  height: 100%;
  box-sizing: border-box;
  position: relative;
`
const MenuStyled = styled(Menu)`
  position: absolute;
  right: 10px;
  top: 15px;
`
const ArticleCard = props => {
  return (
    <PaperStyled>
      <MenuStyled>
        <MenuItem>Eliminar</MenuItem>
        <MenuItem>Editar</MenuItem>
      </MenuStyled>
      <Picture src={props.picture} id={props.id} />
      <Typography variant='h6'>{props.price}</Typography>
      <Typography variant='h6'>{props.title}</Typography>
    </PaperStyled>
  )
}

ArticleCard.propTypes = {
  title: string,
  picture: string,
  id: string,
  price: oneOfType([string, number])
}

export default ArticleCard

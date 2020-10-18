import React from 'react'
import { string, number, func, bool } from 'prop-types'
import { Paper, Menu } from 'components/main'
import Picture from 'components/Picture'
import { Typography, MenuItem } from '@material-ui/core'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import currency from 'helpers/currency'

const ArticleCard = props => {
  const { handleDelete, onDisable, onEnable, ...data } = props
  const history = useHistory()

  return (
    <PaperStyled>
      <MenuStyled>
        {!props.isDisabled && (
          <>
            <MenuItem onClick={() => history.push(`/articulo/${data.id}`)}>Ver detalles</MenuItem>
            <MenuItem onClick={() => handleDelete(data)}>Eliminar</MenuItem>
            <MenuItem onClick={() => history.push('/admin/create', data)}>Editar</MenuItem>
            <MenuItem onClick={() => onDisable(data)}>Deshabilitar</MenuItem>
          </>
        )}
        {props.isDisabled && (
          <>
            <MenuItem onClick={() => history.push(`/articulo/${data.id}`)}>Ver detalles</MenuItem>
            <MenuItem onClick={() => onEnable(data)}>Habiliar</MenuItem>
          </>
        )}
      </MenuStyled>
      <Picture src={data.picture} id={data.id} />
      <Typography variant='h6'>{data.title}</Typography>
      <Typography>{currency.toPrice(data.price)}</Typography>
    </PaperStyled>
  )
}

ArticleCard.propTypes = {
  title: string,
  picture: string,
  id: string,
  price: number,
  handleDelete: func,
  onDisable: func,
  isDisabled: bool,
  onEnable: func
}

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

export default ArticleCard

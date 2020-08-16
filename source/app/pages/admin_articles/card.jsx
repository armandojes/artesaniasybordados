import React from 'react'
import { string, oneOfType, number, func } from 'prop-types'
import { Paper, Menu } from 'components/main'
import Picture from 'components/Picture'
import { Typography, MenuItem } from '@material-ui/core'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import currency from 'helpers/currency'
import { transformPrice } from 'helpers/calculatePrice'

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
const Span = styled.span`
  color: #000;
  margin-right: 15px;
`

const ArticleCard = props => {
  const { handleDelete, ...data } = props
  const history = useHistory()

  return (
    <PaperStyled>
      <MenuStyled>
        <MenuItem onClick={() => history.push(`/articulo/${data.id}`)}>Ver detalles</MenuItem>
        <MenuItem onClick={() => props.handleDelete(data)}>Eliminar</MenuItem>
        <MenuItem onClick={() => history.push('/admin/create', { ...data })}>Editar</MenuItem>
      </MenuStyled>
      <Picture src={data.picture} id={data.id} />
      <Typography variant='h6'>{data.title}</Typography>
      <Typography color='primary' variant='subtitle1'><Span>precio basee</Span>{currency.toPrice(data.price)}</Typography>
      <Typography color='primary' variant='subtitle1'><Span>precio revendedores</Span>{currency.toPrice(transformPrice(data.price, 'reseller'))}</Typography>
      <Typography color='primary' variant='subtitle1'><Span>precio cliente</Span>{currency.toPrice(transformPrice(data.price, 'client'))}</Typography>
    </PaperStyled>
  )
}

ArticleCard.propTypes = {
  title: string,
  picture: string,
  id: string,
  price: oneOfType([string, number]),
  handleDelete: func
}

export default ArticleCard

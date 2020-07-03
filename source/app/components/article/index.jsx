import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { string, number, oneOfType } from 'prop-types'
import styled from 'styled-components'
import { Paper } from 'components/main'
import { Link } from 'react-router-dom'
import Picture from 'components/Picture'
import { toPrice } from 'helpers/currency'

const Article = props => {
  return (
    <LinkStyled to={`/article/${props.id}`}>
      <CardStyled variant='outlined'>
        <Picture src={props.picture} component='img' />
        <Box p={1}>
          <Typography variant='subtitle1'>{props.title}</Typography>
          <Typography color='primary' variant='h6'>{toPrice(props.price)}</Typography>
        </Box>
      </CardStyled>
    </LinkStyled>
  )
}

Article.propTypes = {
  picture: string,
  title: string,
  price: oneOfType([string, number]),
  id: string
}

const CardStyled = styled(Paper)`
  transition: all 300ms;
  padding: 0px;
  height: 100%;
  &:hover {
    transform: scale(1.03);
    box-shadow: 5px 5px 20px #808080a8;
  }
`
const LinkStyled = styled(Link)`
  color: initial;
  text-decoration: none;
`
export default Article

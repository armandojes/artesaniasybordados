import React from 'react'
import { CardActionArea, CardContent, CardMedia } from '@material-ui/core'
import { string, number } from 'prop-types'
import styled from 'styled-components'
import { Paper, Text } from 'components/main'
import { Link } from 'react-router-dom'

const Article = props => {
  return (
    <LinkStyled to={`/article/${props.id}`}>
      <CardStyled variant='outlined'>
        <CardActionArea>
          <CardMediaStyled image={props.picture} component='img' />
          <CardContent>
            <Text fontSize='1.1em'>
              {props.title}
            </Text>
            <Text fontSize='1.1em'>
              $ {props.price}
            </Text>
          </CardContent>
        </CardActionArea>
      </CardStyled>
    </LinkStyled>
  )
}

Article.propTypes = {
  picture: string,
  title: string,
  price: number,
  id: string
}

export default Article

const CardStyled = styled(Paper)`
  transition: all 300ms;
  padding: 0px;
  &:hover {
    transform: scale(1.03);
    box-shadow: 5px 5px 20px #808080a8;
  }
`
const LinkStyled = styled(Link)`
  color: initial;
  text-decoration: none;
`

const CardMediaStyled = styled(CardMedia)`
  height: 200px;
`

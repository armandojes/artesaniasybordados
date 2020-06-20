import React from 'react'
import { Header as HeaderP, Primary, Seconday, ActionsContainer, Item, Title, MenuHeader, LinkStyled } from './styled'
import Container from 'components/container'
import { ShoppingCart, Call } from '@material-ui/icons'
import { Text } from 'components/main'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HeaderP>
      <Primary>
        <Container>
          <ActionsContainer>
            <Item>
              <Call />
              <Text>9671198782</Text>
            </Item>
            <Item>
              <ShoppingCart />
            </Item>
          </ActionsContainer>
        </Container>
      </Primary>
      <Seconday>
        <Container>
          <Title>Artesanias Chiapas</Title>
          <MenuHeader>
            Categoria
            <LinkStyled to='/' as={Link}>Galeria de artesanias</LinkStyled>
          </MenuHeader>
        </Container>
      </Seconday>
    </HeaderP>
  )
}

export default Header

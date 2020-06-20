import styled from 'styled-components'

export const Header = styled.header`
  color: #fff;
  font-size: 1.2em;
`
export const Primary = styled.div`
  background: #e10198;
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
`

export const Seconday = styled.div`
  background: #5a2d82;
  padding: 5px 0px;
`
export const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
export const Item = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  & svg {
    margin-right: 10px;
  }
`
export const Title = styled.h1`
  text-align: center;
  padding: 0px;
  margin: 0px;
`

export const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const LinkStyled = styled.div`
  color: inherit;
  text-decoration: none;
`

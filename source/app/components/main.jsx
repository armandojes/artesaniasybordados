import styled from 'styled-components'

export const Text = styled.div`
  font-size: ${props => props.fontSize ? props.fontSize : '1em'};
  text-align: ${props => props.align || 'left'}
`
export const Paper = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
`
export const SectionTitle = styled('h2')`
  font-size: 1.3em;
  text-align: ${props => props.align || 'left'};
`
export const FullWidthCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`
export const FlexCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.minHeight || '0px'}
`

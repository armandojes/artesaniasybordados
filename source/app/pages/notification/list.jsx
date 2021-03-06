/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import { Grid, Divider } from '@material-ui/core'
import { Paper } from 'components/main'
import styled from 'styled-components'
import { toString } from 'helpers/date'
import { useHistory } from 'react-router'
import { setViewed } from 'core/notification'
import { NotificationsActive } from '@material-ui/icons'

const ItemContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px;
  background: ${props => !props.$isViewed ? '#deeffd7a' : '#fff'};
  cursor: pointer;
`

const PictureStyled = styled(NotificationsActive)`
  width: 45px;
  margin-right: 15px;
  color: ${props => props.$active ? 'red' : 'gray'};
`
const DataContainer = styled.div`
  display: block;
  flex-grow: 1;
  line-height: 1.4em;
  font-size: .9em;
`

const DateContent = styled.div`
  font-size: .9em;
  color: #448dfa;
  font-weight: bold;
`

const List = props => {
  const history = useHistory()

  const handleRedirect = (pathname, userId, notificId) => event => {
    history.push(pathname)
    setViewed(userId, notificId)
  }

  return (
    <Paper id='fullheight'>
      <Grid container spacing={1}>
        {props.items.map((item, index) => (
          <Fragment key={index}>
            <Grid item xs={12}>
              <ItemContent onClick={handleRedirect(`/${item.pathname}`, item.userId, item.id)} $isViewed={item.isViewed}>
                <PictureStyled $active={!item.isViewed} />
                <DataContainer>
                  <div>
                    {item.content}
                  </div>
                  <DateContent>
                    {toString(item.date.toDate())}
                  </DateContent>
                </DataContainer>
              </ItemContent>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </Paper>
  )
}

export default List

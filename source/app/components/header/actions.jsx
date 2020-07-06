import React from 'react'
import styled from 'styled-components'
import { ButtonBase, IconButton, Typography, Avatar as AvatarBase, Grid } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { Button, Link } from 'components/main'
import { useSelector } from 'react-redux'

const UserContent = styled(ButtonBase)`
  background: #e7f3ff!important;
  border-radius: 50px!important;
  padding: 3px 5px!important;
  padding-right: 15px!important;
  margin-right: 10px!important;
`
const Avatar = styled(AvatarBase)`
  width: 30px!important;
  height: 30px!important;
  margin-right: 10px;
`

const Actions = props => {
  const { logged, name } = useSelector(state => state.session)

  if (!logged) {
    return (
      <Grid container justify='flex-end' alignItems='center' spacing={1}>
        <Grid item>
          <Link to='/login'>
            <Button size='medium'>Iniciar session</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to='/register'>
            <Button size='medium'>Registrate</Button>
          </Link>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container justify='flex-end' alignItems='center'>
      <UserContent>
        <Avatar size='small'>A</Avatar>
        <Typography color='primary' variant='subtitle1'>{name.split(' ')[0]}</Typography>
      </UserContent>
      <IconButton>
        <Menu />
      </IconButton>
    </Grid>
  )
}

export default Actions

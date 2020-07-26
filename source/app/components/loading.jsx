import React from 'react'
import { Backdrop, CircularProgress, Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

const Loading = () => {
  const { active, message } = useSelector(state => state.loading)

  return (
    <Backdrop open={active} style={{ zIndex: 9999 }}>
      <Box style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress style={{ color: '#fff', width: '80px', height: '80px', marginBottom: '80px' }} />
        <Typography variant='h6' style={{ color: '#fff' }}>{message}</Typography>
      </Box>
    </Backdrop>
  )
}

export default Loading

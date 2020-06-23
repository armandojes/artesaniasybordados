import React from 'react'
import { Skeleton as SkeletonBase } from '@material-ui/lab'
import { Grid } from '@material-ui/core'

const Skeleton = _props => (
  <Grid container justify='center' spacing={4} style={{ marginTop: '20px' }}>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SkeletonBase animation='wave' variant='rect' height={200} />
      <SkeletonBase animation='wave' variant='text' height={40} />
      <SkeletonBase animation='wave' variant='text' height={40} />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SkeletonBase animation='wave' variant='rect' height={200} />
      <SkeletonBase animation='wave' variant='text' height={40} />
      <SkeletonBase animation='wave' variant='text' height={40} />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SkeletonBase animation='wave' variant='rect' height={200} />
      <SkeletonBase animation='wave' variant='text' height={40} />
      <SkeletonBase animation='wave' variant='text' height={40} />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SkeletonBase animation='wave' variant='rect' height={200} />
      <SkeletonBase animation='wave' variant='text' height={40} />
      <SkeletonBase animation='wave' variant='text' height={40} />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SkeletonBase animation='wave' variant='rect' height={200} />
      <SkeletonBase animation='wave' variant='text' height={40} />
      <SkeletonBase animation='wave' variant='text' height={40} />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SkeletonBase animation='wave' variant='rect' height={200} />
      <SkeletonBase animation='wave' variant='text' height={40} />
      <SkeletonBase animation='wave' variant='text' height={40} />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SkeletonBase animation='wave' variant='rect' height={200} />
      <SkeletonBase animation='wave' variant='text' height={40} />
      <SkeletonBase animation='wave' variant='text' height={40} />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SkeletonBase animation='wave' variant='rect' height={200} />
      <SkeletonBase animation='wave' variant='text' height={40} />
      <SkeletonBase animation='wave' variant='text' height={40} />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SkeletonBase animation='wave' variant='rect' height={200} />
      <SkeletonBase animation='wave' variant='text' height={40} />
      <SkeletonBase animation='wave' variant='text' height={40} />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SkeletonBase animation='wave' variant='rect' height={200} />
      <SkeletonBase animation='wave' variant='text' height={40} />
      <SkeletonBase animation='wave' variant='text' height={40} />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SkeletonBase animation='wave' variant='rect' height={200} />
      <SkeletonBase animation='wave' variant='text' height={40} />
      <SkeletonBase animation='wave' variant='text' height={40} />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SkeletonBase animation='wave' variant='rect' height={200} />
      <SkeletonBase animation='wave' variant='text' height={40} />
      <SkeletonBase animation='wave' variant='text' height={40} />
    </Grid>
  </Grid>
)

export default Skeleton

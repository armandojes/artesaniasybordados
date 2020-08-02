import { useMediaQuery } from '@material-ui/core'

const useResponsive = () => {
  const xl = useMediaQuery(theme => theme.breakpoints.up('xl'))
  const lg = useMediaQuery(theme => theme.breakpoints.up('lg'))
  const md = useMediaQuery(theme => theme.breakpoints.up('md'))
  const sm = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const xs = useMediaQuery(theme => theme.breakpoints.up('xs'))

  return values => {
    if (xl && values.xl) return values.xl
    if (lg && values.lg) return values.lg
    if (md && values.md) return values.md
    if (sm && values.sm) return values.sm
    if (xs && values.xs) return values.xs
    return values.xs
  }
}

export default useResponsive

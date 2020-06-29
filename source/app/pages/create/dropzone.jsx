import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Typography } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { limitPictures } from 'config'
import propTypes from 'prop-types'

const DropZoneComp = (props) => {
  const { pictures = [] } = props.state
  const picturesToMerge = props.name === 'pictures' ? pictures : []
  const preNames = picturesToMerge.map(pic => pic.name)

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg',
    onDrop: (acceptedFiles) => {
      const FilteresRepited = acceptedFiles.filter(file => !preNames.includes(file.name))
      const transformedFiles = FilteresRepited.map(file => {
        console.log('transformedFiles', file)
        file.preview = URL.createObjectURL(file)
        return file
      })
      const picturesMerged = [...picturesToMerge, ...transformedFiles]
      const filesLimited = picturesMerged.filter((_file, index) => (index + 1) <= limitPictures)
      props.setState({ [props.name]: props.multiple ? filesLimited : transformedFiles[0] })
    }
  })

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <DragContainer p={2}>
          <Typography align='center' variant='h6'>Arrastra los archivos o presiona para seleccionar</Typography>
          <Typography align='center' variant='subtitle2'>
            Puedes agregar {limitPictures} fotos
          </Typography>
        </DragContainer>

      </div>
    </>
  )
}

DropZoneComp.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  name: propTypes.string,
  multiple: propTypes.bool
}

const DragContainer = styled(Box)({
  backgroundColor: '#F9F7FC',
  borderRadius: 10,
  borderStyle: 'dashed',
  borderWidth: 1,
  borderColor: '#1E0E6F',
  transition: '0.3s',
  '&:hover': {
    backgroundColor: '#E0D7EE',
    borderStyle: 'solid',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
    cursor: 'pointer'
  }
})

export default DropZoneComp

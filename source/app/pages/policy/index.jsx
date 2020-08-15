import React, { useEffect } from 'react'
import LayoutUser from 'components/layout_user'
import Container from 'components/container'
import { Typography, Box, Container as ContainerMaterial } from '@material-ui/core'
import { Paper } from 'components/main'
import styled from 'styled-components'

const Paragraph = styled.div`
  margin-bottom: 20px;
  line-height: 1.5em;
  div {
    font-weight: bold;
  }
`

const Politics = props => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <LayoutUser>
      <Container>
        <ContainerMaterial maxWidth='md' disableGutters>
          <Box pt={3} pb={3}>
            <Box mb={2}>
              <Typography variant='h5'>Política de privacidad</Typography>
            </Box>
            <Paper>
              <Box p={{ xs: 4, md: 8 }}>
                <Paragraph>
                  Artesanía Chiapas valora a sus usuarios y está comprometida a salvaguardar su confidencialidad. En el desempeño de dicho compromiso, Artesanía Chiapas ha desarrollado esta "Declaración de Confidencialidad", que describe las políticas y prácticas de regalos artesanales en lo que se refiere a recolección y divulgación de información personal en su página web
                </Paragraph>
                <Paragraph>
                  <div>Fines de los Datos Personales recabados</div>
                  Sus datos personales serán utilizados para fines de seguimiento, actualización y confirmación en cuanto a productos y servicios contratados; con fines promocionales y de contratación; con fines financieros y crediticios; dar cumplimiento a obligaciones contraídas; evaluar la calidad del servicio; realizar estudios sobre hábitos de consumo y preferencias.
                </Paragraph>
                <Paragraph>
                  <div>Datos recabados y medios de obtención de Datos Personales</div>
                  Los datos personales que recabamos de usted, con los fines descritos en el presente aviso de privacidad, son recabados de manera personal, cuando usted nos los proporciona directamente; por vía de nuestro sitio en Internet cuando ingresa sus datos o utiliza nuestros servicios en línea, cuando los proporciona de manera telefónica en nuestro centro de atención. Los datos personales que recabamos de forma directa cuando usted mismo nos los proporciona por diversos medios, como cuando los proporciona para participar en promociones, ofertas o cuando contrata con nosotros algún producto o servicio. Los datos que recabamos de manera directa y vía internet, son los siguientes: Nombre y apellidos, Género (masculino o femenino), fecha de nacimiento, teléfono, correo electrónico y dirección física. Toda vez que la Ley permite otras fuentes de allegarnos de información como lo son directorios telefónicos, de servicios y laborales, los datos que por dichos medios podemos obtener son nombre y apellidos, teléfono, correo electrónico y dirección física.
                </Paragraph>
                <Paragraph>
                  <div>Limitaciones al uso de datos</div>
                  Usted puede cancelar su suscripción para recibir promociones, ofertas y servicios de manera telefónica, por correo electrónico y vía correo postal haciendo llegar una carta escrita en idioma español donde indique su solicitud y los datos necesarios como lo son Nombre completo (nombre o nombres y apellido o apellidos) copia simple de su identificación oficial o en medios electrónicos versión digitalizada de la misma (escaneo), número de socio o de cuenta (en caso de tener uno), teléfono y dirección física o electrónica a la dirección para fines de notificaciones relacionadas al caso al correo contacto@artesaniaschiapas.com
                </Paragraph>
                <Paragraph>
                  <div>Modificaciones al presente aviso de privacidad</div>
                  Las modificaciones que se efectúen se pondrán a disposición del público a través de algunos o todos los siguientes medios: anuncios visibles en nuestros establecimientos, vía nuestra página de internet, vía correo electrónico a la dirección más reciente que tengamos de usted, por medio de publicaciones en periódicos de circulación nacional, revistas, carteles, grabaciones sonoras o personalmente por medio de nuestros encargados al momento de acudir a cualquiera de nuestras instalaciones. Información en Internet: Hacemos de su conocimiento que cuando accede a nuestro Portal en Internet es recibida por nuestra parte información referente a sus cookies y web beacons para obtener información como lo es su tipo de navegador y sistema operativo
                </Paragraph>
              </Box>
            </Paper>
          </Box>
        </ContainerMaterial>
      </Container>
    </LayoutUser>
  )
}

export default Politics

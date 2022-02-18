
import React from 'react'
import styled from '@emotion/styled'

const Texto = styled.div`
  background-color: #B7322C;
  color: #FFF;
  padding: 15px;
  font-size: 22px;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
`

const Alerta = ({children}) => {
  return (
    <Texto>
      {children}
    </Texto>
  )
}

export default Alerta

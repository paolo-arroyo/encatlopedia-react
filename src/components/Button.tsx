import { Button as defaultButton } from 'react-bootstrap'
import { styled } from 'styled-components'

export const Button = styled(defaultButton)`
    width: 100%;
    background: black;
    color: white;
    border: none;
    &:hover {
        background: #2afa8b;
        color: black;
    }
`

export const Back = styled(Button)`
    width: 200px;
`
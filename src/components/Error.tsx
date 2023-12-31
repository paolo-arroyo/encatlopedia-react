import { useContext } from 'react'
import { ErrorContext } from '../contexts/ErrorContext'
import { Alert } from 'react-bootstrap'
import { styled } from 'styled-components'

const ErrorAlert = styled(Alert)`
    background: #ff8fb1;
    border: 1px solid #f54278;
    text-align: center;
    font-weight: bold;
    border-radius: 0;
    color: black;
    padding: 5px 0px;
`
const ErrorMessage = () => {
    const { errorMsg } = useContext(ErrorContext)
    return (
        <>
         { errorMsg && <ErrorAlert> {errorMsg} </ErrorAlert> }
        </>
    )
}
export default ErrorMessage
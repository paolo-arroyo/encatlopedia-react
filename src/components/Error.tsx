import { useContext } from 'react'
import { ErrorContext } from '../contexts/ErrorContext'
import { Alert } from 'react-bootstrap'
import { styled } from 'styled-components'

const ErrorAlert = styled(Alert)`
    background: #ff8fb1;
    border: 1px solid #f54278;
`
const ErrorMessage = () => {
    const { errorMsg } = useContext(ErrorContext)

    return (
        <>
         { errorMsg !== '' && <ErrorAlert /> }
        </>
    )
}
export default ErrorMessage
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

export interface ErrorContextInterface {
    errorMsg: string,
    setErrorMsg: Dispatch<SetStateAction<string>>
}

export const ErrorContext = createContext<Partial<ErrorContextInterface>>({})

type ErrorProviderProps = {
    children: ReactNode
}

export const ErrorProvider = ({children}: ErrorProviderProps) => {
    const [ errorMsg, setErrorMsg ] = useState('')
    return (
        <ErrorContext.Provider value={{ errorMsg, setErrorMsg }}>
            {children}
        </ErrorContext.Provider>
    )
}
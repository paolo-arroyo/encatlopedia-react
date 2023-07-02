import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

export interface ErrorContextInterface {
    errorMsg: string | null,
    setErrorMsg: Dispatch<SetStateAction<string|null>>
}

export const ErrorContext = createContext<Partial<ErrorContextInterface>>({})

type ErrorProviderProps = {
    children: ReactNode
}

export const ErrorProvider = ({children}: ErrorProviderProps) => {
    const [ errorMsg, setErrorMsg ] = useState<string | null>(null)
    return (
        <ErrorContext.Provider value={{ errorMsg, setErrorMsg }}>
            {children}
        </ErrorContext.Provider>
    )
}
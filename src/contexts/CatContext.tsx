import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

export type BreedType = {
    id: string,
    name: string,
    temperament: string,
    origin: string,
    country_code: string,
    life_span: string,
    description: string,
    indoor: boolean,
    wikipedia_url: string,
    weight: {
        imperial: string,
        metric: string
    },
    scores: {
        adaptability: number,
        affection_level: number,
        child_friendly: number,
        dog_friendly: number,
        stranger_friendly: number,
        energy_level: number,
        grooming: number,
        health_issues: number,
        intelligence: number,
        shedding_level: number,
        social_needs: number,
    },
    children: React.ReactNode
  }

  export interface CatContextInterface {
    breeds: BreedType[],
    setBreeds: Dispatch<SetStateAction<BreedType[]>>
  }

  export const CatContext = createContext<Partial<CatContextInterface>>({})
  
  type CatProviderProps = {
    children: ReactNode
  }

  export const CatProvider = ({children}: CatProviderProps) => {
    const [ breeds, setBreeds ] = useState<BreedType[]>([])

    return (
        <CatContext.Provider value={{ breeds, setBreeds }}>
            {children}
        </CatContext.Provider>
    )
  }
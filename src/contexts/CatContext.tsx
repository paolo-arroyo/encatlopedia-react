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

export type CatImage = {
    id: string,
    url: string,
    width: number,
    height: number
}

export type CatData = {
    id: string | undefined,
    url: string,
    width: number,
    height: number,
    breeds: BreedType[]
}

export interface CatContextInterface {
    breeds: BreedType[],
    setBreeds: Dispatch<SetStateAction<BreedType[]>>,
    showCats: CatImage[],
    setShowCats: Dispatch<SetStateAction<CatImage[]>>,
    selected: string,
    setSelected: Dispatch<SetStateAction<string>>,
    showMore: boolean,
    setShowMore: Dispatch<SetStateAction<boolean>>,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    catData: CatData,
    setCatData: Dispatch<SetStateAction<CatData>>,
}

export const CatContext = createContext<Partial<CatContextInterface>>({})

type CatProviderProps = {
  children: ReactNode
}

export const CatProvider = ({children}: CatProviderProps) => {
  const [ breeds, setBreeds ] = useState<BreedType[]>([])
  const [ selected, setSelected ] = useState('')
  const [ showCats, setShowCats ] = useState<CatImage[]>([])
  const [ showMore, setShowMore ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ catData, setCatData ] = useState<CatData>({
    id: '',
    url: '',
    width: 0,
    height: 0,
    breeds: []
})

  return (
      <CatContext.Provider value={{ 
        breeds, setBreeds, 
        showCats, setShowCats,
        selected, setSelected,
        showMore, setShowMore,
        loading, setLoading,
        catData, setCatData
      }}>
          {children}
      </CatContext.Provider>
  )
}


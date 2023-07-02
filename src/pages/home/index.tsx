import React, { useState, useEffect} from 'react'
import { Form } from 'react-bootstrap'
import CatDisplay from '../../components/CatDisplay'
import axios from 'axios'

// Type Declarations (Breed Data, Cat Images)
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
    id: string,
    url: string,
    width: number,
    height: number,
    breeds: BreedType[]
}


export type CatProps = {
    showCats: CatImage[],
    breed: string,
    getMoreCats: (e:any) => void,
    showMore: boolean
}

const Home = () => {
    const [ breeds, setBreeds ] = useState<BreedType[]>([]) //Array containing breed data
    const [ selected, setSelected ] = useState('') //Breed selector string
    const [ showCats, setShowCats ] = useState<CatImage[]>([]) //List of cat images to display
    const [ showMore, setShowMore] = useState(true) //Control visibility of 'Load More' button

    //API Constants
    const BREEDS_URL = "https://api.thecatapi.com/v1/breeds/"

    const BreedHook = () => {
        try {
            axios.get(BREEDS_URL).then(response => {
                setBreeds(response.data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(BreedHook, [])

    const getCats = (breed: string) => {
        let catUrl = `https://api.thecatapi.com/v1/images/search/?breed_ids=${breed}&limit=10`
        try {
            axios.get(catUrl).then(response => {
                setShowCats(response.data)
            })
            setShowMore(true)
        } catch (error) {
            setShowCats([])
        }
    }

    const getMoreCats = (e:any) => {
        e.target.innerText = "Loading More ..."
        let catUrl = `https://api.thecatapi.com/v1/images/search/?breed_ids=${selected}&limit=10`

        //Try: Make another GET request, add all in response to existing list of cat images, and filter out duplicates.
        try {
            axios.get(catUrl).then(response => {
                let newCats = showCats.concat(response.data)
                let uniqueCats = newCats.filter((cat,index,self) => { return (self.findIndex((v) => v.id === cat.id) === index)})
                if (uniqueCats.length === showCats.length) {
                    setShowMore(false)
                }
                setShowCats(uniqueCats)
                e.target.innerText = "Load More"
            })
        } catch (error) {
            console.log(error)
            e.target.innerText = "Load More"
        }
    }
    const handleSelect = (e:any) => {
        getCats(e.target.value)
        setSelected(e.target.value)
    }
  return (
    <div>
        <h1> Encatlopedia </h1>
        <Form.Select aria-label="Select Cat Breed" onChange={handleSelect}>
            <option> Select Breed </option>
            {breeds.map(breed => {
                return (
                    <option key={breed.id} value={breed.id}>{breed.name}</option>
                )
            })}
        </Form.Select>
        <CatDisplay showCats={showCats} breed={selected} getMoreCats={getMoreCats} showMore={showMore} />
    </div>
  )
}

export default Home
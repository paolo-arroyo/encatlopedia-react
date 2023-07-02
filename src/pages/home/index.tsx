import React, { useState, useEffect} from 'react'
import { Card, Form } from 'react-bootstrap'
import BreedType from '../../App'
import axios from 'axios'

//API Constants
const BREEDS_URL = "https://api.thecatapi.com/v1/breeds/"

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
    }
  }

const Home = () => {
    const [ breeds, setBreeds ] = useState<BreedType[]>([])

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
    console.log(breeds)
  return (
    <div>
        <h1> Encatlopedia </h1>
        <Form.Select aria-label="Select Cat Breed">
            <option> Select Breed </option>
        </Form.Select>
    </div>
  )
}

export default Home
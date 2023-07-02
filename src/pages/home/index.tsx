import { useEffect, useContext } from 'react'
import { Form } from 'react-bootstrap'
import CatDisplay from '../../components/CatDisplay'
import { CatContext } from '../../contexts/CatContext'
import axios from 'axios'
import { css } from '@emotion/react';

const BREEDS_URL = "https://api.thecatapi.com/v1/breeds/"

const Home = () => {
    const { 
        breeds, setBreeds, 
        showCats, setShowCats,
        selected, setSelected,
        showMore, setShowMore,
    } = useContext(CatContext)
    useEffect(() => {
        try {
            axios.get(BREEDS_URL).then(response => {
                setBreeds?.(response.data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [setBreeds])

    const getCats = (breed: string) => {
        let catUrl = `https://api.thecatapi.com/v1/images/search/?breed_ids=${breed}&limit=10`
        try {
            axios.get(catUrl).then(response => {
                setShowCats?.(response.data)
            })
            setShowMore?.(true)
        } catch (error) {
            setShowCats?.([])
        }
    }

    const getMoreCats = (e: any) => {
        e.target.innerText = "Loading More ..."
        let catUrl = `https://api.thecatapi.com/v1/images/search/?breed_ids=${selected}&limit=10`

        //Try: Make another GET request, add all in response to existing list of cat images, and filter out duplicates.
        try {
            axios.get(catUrl).then(response => {
                let newCats = showCats?.concat(response.data)
                let uniqueCats = newCats?.filter((cat,index,self) => { return (self.findIndex((v) => v.id === cat.id) === index)})
                if (uniqueCats?.length === showCats?.length) {
                    setShowMore?.(false)
                }
                if(uniqueCats !== undefined) {
                    setShowCats?.(uniqueCats)
                }
                e.target.innerText = "Load More"
            })
        } catch (error) {
            console.log(error)
            e.target.innerText = "Load More"
        }
    }
    const handleSelect = (e:any) => {
        getCats(e.target.value)
        setSelected?.(e.target.value)
    }

  return (
    <div>
        <h1> Encatlopedia </h1>
        <Form.Select aria-label="Select Cat Breed" onChange={handleSelect}>
            <option> Select Breed </option>
            {breeds?.map(b => {
                return (
                    <option key={b.id} value={b.id}>{b.name}</option>
                )
            })}
        </Form.Select>
        {showCats && selected && showMore && <CatDisplay showCats={showCats} breed={selected} getMoreCats={getMoreCats} showMore={showMore} />}
        
    </div>
  )
}

export default Home
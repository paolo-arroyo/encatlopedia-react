import { useEffect, useContext } from 'react'
import { Select } from '../../components/Select'
import CatDisplay from '../../components/CatDisplay'
import { CatContext } from '../../contexts/CatContext'
import axios from 'axios'
import { ErrorContext } from '../../contexts/ErrorContext'

const BREEDS_URL = "https://api.thecatapi.com/v1/breeds/"

const Home = () => {
    const { 
        breeds, setBreeds, 
        showCats, setShowCats,
        selected, setSelected,
        showMore, setShowMore,
    } = useContext(CatContext)

    const { setErrorMsg } = useContext(ErrorContext)
    useEffect(() => {
        axios.get(BREEDS_URL).then(response => {
            setBreeds?.(response.data)
        }).catch(error => {
            setErrorMsg?.('Apologies but we could not load new cats for you at this time! Miau!')
            setTimeout(() => {
                setErrorMsg?.('')
            }, 3000)
        })
    }, [setBreeds, setErrorMsg])

    const getCats = (breed: string) => {
        let catUrl = `https://api.thecatapi.com/v1/images/search/?breed_ids=${breed}&limit=10`
            axios.get(catUrl).then(response => {
                setShowCats?.(response.data)
                setShowMore?.(true)
            }).catch(error => {
                setErrorMsg?.('Apologies but we could not load new cats for you at this time! Miau!')
                setTimeout(() => {
                    setErrorMsg?.('')
                }, 3000)
            })
    }

    const getMoreCats = (e: any) => {
        e.target.innerText = "Loading More ..."
        let catUrl = `https://api.thecatapi.com/v1/images/search/?breed_ids=${selected}&limit=10`

        //Try: Make another GET request, add all in response to existing list of cat images, and filter out duplicates.
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
        }).catch(error => {
            setErrorMsg?.('Apologies but we could not load new cats for you at this time! Miau!')
            e.target.innerText = "Load More"
            setTimeout(() => {
                setErrorMsg?.('')
            }, 3000)
        })
    }
    const handleSelect = (e:any) => {
        getCats(e.target.value)
        setSelected?.(e.target.value)
    }

  return (
    <div>
        <h1> Encatlopedia </h1>
        <h6> Breed: </h6>
        <Select aria-label="Select Cat Breed" onChange={handleSelect}>
            <option> Select Breed </option>
            {breeds?.map(b => {
                return (
                    <option key={b.id} value={b.id}>{b.name}</option>
                )
            })}
        </Select>
        {showCats && selected && showMore !== undefined && <CatDisplay showCats={showCats} breed={selected} getMoreCats={getMoreCats} showMore={showMore} />}
        
    </div>
  )
}

export default Home
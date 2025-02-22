import axios from 'axios'
import { useEffect, useState } from 'react'


function SearchBar() {


    const [name, setName] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [filteredSuggestions, setfilterSuggestions] = useState<string[]>([])
    const [selectedNames, setSelectedNames] = useState<string[]>([])


    const handleInputChange = (e) => {
        setName(e.target.value)
        filterNamesByTypedName(e.target.value)
    }

    const getNames = async () => {

        try {
            const res = await axios.get('https://run.mocky.io/v3/4b2fda4f-612c-43be-8e55-41d3690f9ea5')

            if (res.status === 200) {
                setSuggestions(res.data.names)

            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        getNames()

    }, [])

    const filterNamesByTypedName = (value: string) => {

        const filterdArray = suggestions?.filter((item) => (item.toLowerCase().startsWith(value)))
        console.log(filterdArray)
        setfilterSuggestions(filterdArray)


    }
    const setSletedItems = (value: string) => {

        setSelectedNames((prevState) => {
            const updatedState = [...prevState]
            updatedState.push(value)
            const filterdArray = filteredSuggestions?.filter((item) => (!updatedState.includes(item)))
            setfilterSuggestions(filterdArray)
            return updatedState
        })


    }

    const removeFromSelectedNames = (selectedItem: string) => {
        const filterdArray = selectedNames?.filter((item) => selectedItem !== item)
        setSelectedNames(filterdArray)
        const filterdArrayForSuggestions = [...filteredSuggestions]
        filterdArrayForSuggestions.push(selectedItem)
        setfilterSuggestions(filterdArrayForSuggestions)
    }
    return (
<>
<h1> Search Names </h1>
<div className='container' >

<div className="input-group">
    <div className="selected-names">
        <ul className='pills-list' >
            {
                selectedNames?.map((item, id) => {
                    return (
                        <li className='pills' key={id} > <span> {item} </span> <img onClick={() => removeFromSelectedNames(item)} className='close-icon' src="close-icon.png" alt="" />   </li>
                    )
                })
            }
        </ul>

    </div>
    <input value={name} onChange={handleInputChange} placeholder='Search..' type="text" className="search-box" />
    {
        (filteredSuggestions?.length > 0 && name) &&
        <div className="suggestions">
            <ul>
                {
                    filteredSuggestions?.map((item, id) => {
                        return (
                            <li className='name-list' key={id} onClick={(e) => { setSletedItems(item) }}  > {item} </li>
                        )
                    })
                }
            </ul>
        </div>
    }
</div>
</div>
</>
    )
}

export default SearchBar

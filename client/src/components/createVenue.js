import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import API from '../utils/API'

const CreateVenue = () => {
    const [address] = useState([])
    const [newVenueName, setNewVenueName] = useState("")
    const [newVenue, setNewVenue] = useState({
            "venueName": newVenueName,
            "venueAddress": address
    })
    let history = useHistory();

    const createVenue = (event) => {
        const target = event.target.name
        const value = event.target.value
        setNewVenue({...newVenue, [target]: value})
    }
    
    const postNewVenue = async (event) => {
        event.preventDefault();
        try {
            createAddress()
            //  await API.createVenueByName(newVenue.venueName, newVenue)
                console.log(newVenue)
             alert(newVenue.venueName + " was created")
             history.push("/venuepage")
        }catch(err){
            console.log(err)
        }
    }

    const createVenueName = (event) => {
        const value = event.target.value
        setNewVenueName(value)
        
    }

    // const addLink = () => {
    //     let newArtist = artist
    //     newArtist.bandLinks.push({
    //         siteName: document.getElementById('linkSelection').value,
    //         siteUrl: trimURL(document.getElementById('siteUrl').value)
    //     })
    //     setArtist({
    //         ...artist,
    //         newArtist});
    // }
    
    const createAddress = () => {
        let venueAddress = address
        address.push(
            document.getElementById('0').value,
            document.getElementById('1').value,
            document.getElementById('2').value
        )
        setNewVenue({...newVenue, venueAddress})
    }

    return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
    <div className="formcontent p-2">
    <h1 className="text-center">Create Venue Review</h1>
    <form>
        <div className="form-group d-flex flex-column">
            <label htmlFor="venueName">Venue Name:</label>
            <input type="text" id="venueName" name="venueName" onChange={createVenueName && createVenue}></input>
        </div>
        <div className="form-group">
        <label htmlFor="venueAddress">Venue Address:</label>
        <div className="d-flex flex-column">
        <input type="text" id="0" name="0" placeholder="Street Address 1"></input>
        <input type="text" id="1" name="1" placeholder="Street Address 2"></input>
        <input type="text" id="2" name="2" placeholder="City, State"></input>
        </div>
        </div>
        <button type="submit" value={"Submit"} className="artistCreateButton" onClick={postNewVenue}>Submit</button>
        </form>
        </div>
    </div>
    
     )
}

export default CreateVenue;
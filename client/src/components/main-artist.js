import React, { useEffect, useState } from 'react';
import ReviewsTable from "./artist-ReviewsTable"
import Artist from "./artist-artistBody"
import API from "../utils/API";

const BandPage = () => {
  const [artist, setArtist] = useState ([])
  const [isLoading, setisLoading] = useState(true)
  const [reviews, setReviews] = useState([])

useEffect(() => {
  const fetchArtist = async () => {
    const result = await API.getUser("60298124ba192320784b1d79")
    const userArtist = result.data
      setArtist(userArtist)
      setisLoading(false)
  }
  fetchArtist()
}, []);

useEffect(() => {
  const fetchReviews = async () => {
    const reviews = await API.getReviewByBand("60298124ba192320784b1d79")
    setReviews(reviews.data)
    setisLoading(false)
  }
  fetchReviews();
}, []);

    return (
    <div className="d-flex flex-column mt-2 p-2 align-items-center">
    <Artist artist={artist} isloading={isLoading}/>
    <div className="d-flex flex-column flex-wrap">
    <h1><u>Artist Reviews</u></h1>
    <ReviewsTable reviews={reviews} isloading={isLoading}/>
    </div>
    <hr></hr>
    </div>
     )
}
    
export default BandPage;
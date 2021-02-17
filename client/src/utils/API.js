/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const API = {
    // GET BAND BY USER ID
    getBandByUserId(id){
        return axios.get(`/api/dbRoutes/user/${id}`)
    },
    // GET USER INFO BY ID
    getBand(id){
        return axios.get(`/api/dbRoutes/band/${id}`)
    },
    // CREATE NEW band
    createBand(bandData){
        return axios.post('/api/dbRoutes/band/', bandData)
    },
    // UPDATE Band INFO
    updateBandData(id, bandData){
        return axios.put(`/api/dbRoutes/band/${id}`, bandData)
    },
    // DELETE Band BY ID
    deleteBand(id){
        return axios.delete(`/api/dbRoutes/band/${id}`)
    },
    // GET VENUE BY ID
    getVenueById(id){
        return axios.get(`api/dbRoutes/venue/${id}`)
    },
    // GET VENUE BY NAME
    getVenueByName(name){
        return axios.get(`/api/dbRoutes/venue/name/${name}`)
    },
    // GET ALL VENUES
    getVenues(){
        return axios.get(`/api/dbRoutes/venue/`)
    },
    // CREATE NEW VENUE FROM FOURSQUARE SEARCH BY ID
    createVenueById(id){
        return axios.post(`/api/dbRoutes/venue/${id}`)
    },
    // CREATE NEW VENUE BY NAME IF NOT FOUND IN FOURSQUARE SEARCH
    createVenueByName(name, venueData){
        return axios.post(`/api/dbRoutes/venue/${name}`, venueData)
    },
    // POST NEW REVIEW TO VENUE
    postVenueReview(reviewData){
        return axios.put(`/api/dbRoutes/venue/${reviewData}`)
    },
    searchFourSquare(queryData){
        return axios.post(`/api/fourSquareRoutes/${queryData}/`)
    },
    createReview(id, reviewData){
        return axios.post(`/api/dbRoutes/reviews/${id}`, reviewData)
    },
    updateReview(id){
        return axios.put(`/api/dbRoutes/reviews/${id}`)
    },
    deleteReview(id){
        return axios.delete(`/api/dbRoutes/reviews/${id}`)
    },
    getReviewByBand(bandId){
        return axios.get(`/api/dbRoutes/reviews/band/${bandId}`)
    },
    getReviewByVenue(venueId){
        return axios.get(`/api/dbRoutes/reviews/venue/${venueId}`)
    },
    recaptchaUserVerify(responseToken){
        return axios.post(`/api/userverify/${responseToken}`)
            .then(response => {
                return response ? console.log('You are human!') : console.log('No Robots allowed!');
            }
        )
    }
};

export default API;
import axios from 'axios';

const API = {
    // GET USER INFO BY ID
    getUser(id){
        return axios.get(`/api/dbRoutes/band/${id}`)
    },
    // CREATE NEW band
    createUser(userData){
        return axios.post(`/api/dbRoutes/band/${userData}`)
    },
    // UPDATE USER INFO
    updateUserData(userData){
        return axios.put(`/api/dbRoutes/band/${userData}`)
    },
    // DELETE USER BY ID
    deleteUser(id){
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
    createVenueByName(name){
        return axios.post(`/api/dbRoutes/venue/${name}`)
    },
    // POST NEW REVIEW TO VENUE
    postVenueReview(reviewData){
        return axios.put(`/api/dbRoutes/venue/${reviewData}`)
    },
    searchFourSquare(queryData){
        return axios.post(`/api/fourSquareRoutes/${queryData}/`)
    },
    createReview(){
        return axios.post('/api/dbRoutes/reviews')
    },
    updateReview(id){
        return axios.put(`/api/dbRoutes/reviews/${id}`)
    },
    deleteReview(id){
        return axios.delete(`/api/dbRoutes/reviews/${id}`)
    },
    getReviewByBand(name){
        return axios.get(`/api/dbRoutes/reviews/venue/${name}`)
    },
    getReviewByVenue(name){
        return axios.get(`/api/dbRoutes/reviews/venue/${name}`)
    }
};

export default API;
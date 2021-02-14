import React from 'react';
import Rating from 'react-rating'

const BandPage = () => {

    return (
    <div className="d-flex flex-column mt-2 p-2">
    <div className="d-flex flex-row flex-wrap align-items-start">
    <img alt="bandphoto" className="img-fluid" src="https://via.placeholder.com/420"></img>
    <div className="d-flex flex-column p-2 flex-wrap">
        <h1>BANDNAME</h1>
        <h2>City, State</h2>
        <h3>Description:</h3>
        <p>This is where the description goes</p>
        <a href="#">Contact Email</a>
        <a href="#">Artist Link 1</a>
        <a href="#">Artist Link 2</a>
        <a href="#">Artist Link 3</a>
        <a href="#">Artist Link 4</a>  
    </div>
    </div>
    <div className="d-flex flex-column flex-wrap justify-content-center">
    <h1 className="text-center"><u>Artist Reviews</u></h1>
   <table className="table table-dark table-striped table-bordered">
    <thead>
        <tr>
        <th className="text-center">Date</th>
        <th className="text-center">Venue Name</th>
        <th className="text-center">Rating</th>
        <th className="text-center">Venue Average</th>
        <th className="text-center">Review</th>
        </tr>
    </thead>
  <tbody>
    <tr> {/*first review */}
      <td>02/11/20</td> {/*REVIEW DATE*/}
      <td>Crocodile Rock</td> {/*VENUE NAME*/}
      <td><Rating initialRating={2.5} emptySymbol="fa fa-star-o fa-2x" readonly fullSymbol="fa fa-star fa-2x" /></td> {/*VENUE RATING*/}
      <td><Rating initialRating={2.5} emptySymbol="fa fa-star-o fa-2x" readonly fullSymbol="fa fa-star fa-2x" /></td> {/*VENUES AVERAGE RATING*/}
      <td>This was TRASH</td>
    </tr>
  </tbody>
</table>
    </div>
    <hr></hr>
    </div>
     )
}
    
export default BandPage;
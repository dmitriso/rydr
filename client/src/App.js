import React from 'react';
import NavBar from './components/navbar'
import Home from './components/main-home'
import LogIn from './components/main-login'
import CreateArtist from './components/createArtist'
import BandPage from './components/main-artist'
import VenuePage from './components/main-venuepage'
import CreateReview from './components/createReview';
import './components/styles/main.css'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserRoutes from './hocs/UserRoutes'
import NonUserRoutes from './hocs/NonUserRoutes'
import CreateVenue from './components/createVenue';


function App() {
  
  return (
    <Router>
      <NavBar />
    <Switch>
    <Route path="/" exact component={Home}/>
    <NonUserRoutes path="/login" component={LogIn}/>
    <NonUserRoutes path="/createartist" component={CreateArtist}/>
    <UserRoutes path="/bandpage" component={BandPage}/>
    <UserRoutes path="/venuepage" component={VenuePage} />
    <UserRoutes path="/createReview" component={CreateReview} />
    <UserRoutes path="/createVenue" component={CreateVenue} />
    <UserRoutes path="/bandpage" component={BandPage}/>
    </Switch>
    </Router>
  );
}

export default App;

const db = require('../models');
const JWT = require('jsonwebtoken');
const router = require('express').Router();


// DEFINING METHODS FOR THE DB CONTROLLER TO REFERENCE IN DB ROUTES
module.exports = {
    // Create user and band document. Add User._id the Band.userId
    async createUser(req,res) {
        try {
            const { userName, password, bandName, location } = req.body;
            // Create the user document
            const user = await db.User.create({ userName: userName, password: password});
            // Create the band document and add the User._id
            const band = await db.Band.create({ bandName: bandName, userId: user._id, location: location });
            // Add the Band._id to User.bandId
            await db.User.findByIdAndUpdate(user._id, { $set: {bandId: band._id}}, {new: true});
            res.json(band);
        } catch (err) { res.json(err) }
    },
    // GETS USER BY USERNAME
    getUser: function(req,res) {
        db.User
        .findOne({userName: req.body.userName})
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.status(422).json(err)
        })
    },
    // ROUTE TO GET THE BAND AFTER USER LOGS IN AND IS AUTHENTICATED
    getBandByUserId: function (req, res) {
        db.Band
            .find({
                userId: req.params.id
            })
            .then(dbModel => {
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err))
    },
    // FIND Band BY ID
    findByIdBand: function (req, res) {
        db.Band
            .findById(req.params.id).populate("postedReviews")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // CREATE NEW Band
    createBand: function (req, res) {
        console.log(req.body)
        db.Band
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // UPDATE Band INFO
    updateBand: function (req, res) {
        db.Band
            .findByIdAndUpdate( req.params.id, req.body, {new:true})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // DELETE Band ACCOUNT
    removeBand: function (req, res) {
        db.Band
            .findById({
                _id: req.params.id
            })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // FIND ALL VENUES IN DB
    findAllVenue: function (req, res) {
        db.Venue
            .find(req.query).populate('venueReviews')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // FIND VENUE BY ID
    findByIdVenue: function (req, res) {
        db.Venue
            .findById(req.params.id).populate('venueReview')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // FIND VENUE BY NAME
    findByVenueName: function (req, res){
        const name = req.params.name
        db.Venue
        .find({venueName: name}).collation( { locale: 'en', strength: 1 }).populate('venueReviews')
        .then(dbModel => {
            res.json(dbModel)})
        .catch(err => res.status(422).json(err));
    },
    // FIND VENUE BY LOCATION
    findByVenueLocation: function (req, res){
        db.Venue
        .find({})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    // CREATE VENUE
    createVenue: function (req, res) {
        db.Venue
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // NOTE -- venue will need to come in w/ the body as it's _id
    async createReview(req, res){
        try {
            // Add review to review model
            const review = await db.Review.create({ ...req.body, author: req.params.id });
            // Push the review id to the band document
            await db.Band.findByIdAndUpdate(req.params.id, { $push: { postedReviews: review._id } }, { new: true });
            // Push the review id to the venue document
            await db.Venue.findByIdAndUpdate(req.body.venue, { $push: { venueReviews: review._id } }, { new: true });
            res.json(review)
        } catch (err) { res.status(422).json(err) }
    },
    // UPDATE REVIEW FOR USE IN FUTURE APPLICATION
    updateReview: function (req, res){
        db.Review
        .findByIdAndUpdate(req.params.id, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    // GET REVIEWS BY BAND ID
    getReviewByBand: function (req, res){
        db.Review
        .find({author: req.params.authorId})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    // GET REVIEWS BY VENUE ID
    getReviewByVenue: function(req, res){
        db.Review
        .find({venue: req.params.venueId})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    // FOR FUTURE USE DELETE REVIEW FROM DB
    removeReview: function (req, res) {
    db.Review
        .findById({
            _id: req.params.id
        })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    // AUTH ROUTE TO LOGIN USER IN AND THEN SIGN A TOKEN TO THE USER FOR FURTHER AUTH
    userLogin: function(req, res){
     if (req.isAuthenticated()) {
                const {_id, userName} = req.user;
                const token = signToken(_id);
                JWT.verify(token, process.env.PASSPORT_SECRET_KEY, function (err, decoded) {
                     if (!err) {
                         console.log('Verify: Async test 1: Audience decoded: ' + decoded.aud)
                     } else {
                         console.log("Verify: Async test 1: " + err.message);
                     }})
                res.cookie("access_token", token, {httpOnly: true, sameSite:true}); 
                return res.status(200).json({isAuthenticated : true, token:token,  user : userName, id:_id});
             }else{
                 res.status(401).json({err, message:"not authenticated"})
             }
    },
    // AUTH ROUTE TO LOG THE USER OUT CLEAR THE DATA AND COOKIE
    userLogout: function(req, res){
        res.clearCookie('access_token');
            return res.json({user:{userName : ""},success : true});
    },
    // SECOND LAYER OF AUTH TO SEE IF THE TOKEN IS AUTHENTIC
    userAuthenticate: function(req, res){
        const {userName, _id} = req.user
            return res.status(200).send({isAuthenticated : true, user : userName, id: _id});
    },
    async updateLinks(req, res){
        console.log(req.body)
            db.Band.updateOne(
        { _id: req.params.id, "bandLinks.siteName": req.body.siteName },
        { $set: { "bandLinks.$.siteUrl" : req.body.siteUrl } }
        ).then(data =>{
            console.log(data)
            return res.status(200).send(data);
        })
    },
    getLinks: function (req, res){
        console.log(req.params.id)
        // { $set: { "bandLinks.$.siteUrl" : req.body.siteUrl } }
            db.Band
            .findOne({_id:req.params.id, "bandLinks.siteName": req.body.siteName })
            .then(data =>{
                return res.status(200).send(Data)
            })
            .catch(err => res.status(422).json(err))
    },
    deleteLink: function(req, res){
        db.Band
        .findByIdAndUpdate(req.body.bandId, {$pull:{bandLinks:{_id:req.body.id}}}, {new:true})
        .then(dbModel => res.status(200).json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};

// FUNCTION THAT CREATES THE JWT TOKEN FOR USER
const signToken = userID => {
    return JWT.sign({
        iss: "Rydr",
        sub: userID,
        aud: "rydr.com"
    }, process.env.PASSPORT_SECRET_KEY, {
        expiresIn: "1h"
    });

}

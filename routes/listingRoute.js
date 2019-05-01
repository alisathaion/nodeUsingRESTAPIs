var express = require('express');//load express
const Listing = require('../models/listing');//load module
var router = express.Router();

const listings = [];

//send data shows in page index.ejs
router.get('/',(req,res) => {
    res.render('index',{ title : "Real-Estate Listing" });
});

//send data shows in page orderlist.ejs
router.get('/listinglist', function(req, res){
    res.render('listinglist',{ title : "Listing Lists" });
});

//send data shows in page document.ejs
router.get('/document', function(req, res){
    res.render('document',{ title : "Documentation" });
});

//for search
var search = "";
router.post('/listinglist', function(req, res){
    search = req.body.searchByNameAndPhone;
});


//API or REST Endpoints are defined below
router.get('/api/listings', (req, res) => {
    const serachLists = [];
    if(search == ""){
        res.json(listings);
    }
    else{
        for(var i = 0; i < listings.length; i++)
        {
            var city = listings[i].city;
            var propName = listings[i].propertyType;
            if(city.toLowerCase().trim() === search.toLowerCase().trim() || propName.toLowerCase().trim() === search.toLowerCase().trim())
            {
                serachLists.push(listings[i]);
            }
        } 
        res.json(serachLists);
    }
});


router.post('/api/listings', (req, res) => {

    if (!req.body.propertyName || !req.body.address || !req.body.city || !req.body.price) {
        return res.status(400).json({msg : "Invalid listing information"});
    }

    let listing = new Listing(req.body);
    listings.push(listing);

   
    res.json({status : "success", message : "Added Listing"});

});



module.exports = router;

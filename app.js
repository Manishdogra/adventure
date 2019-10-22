var express = require("express");
var app = express();
 var bodyParser = require("body-parser");
 var mongoose = require("mongoose");
 var campground =require("./models/campground");
 
//  seedDB = require("./seeds")
 
 //seedDB();
mongoose.connect("mongodb://localhost:27017/camp", { useNewUrlParser: true   });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// var campground = mongoose.model("campground", campgroundSchema);
  campground.create(	
	{
		name: "triund",
		image: "https://user-images.githubusercontent.com/5571589/33692688-871a3abc-dabc-11e7-88f4-38f8dc3919ee.png",
		price: "Rs.2000",
		description:  "This is a huge hill, no bathrooms, no  water, only mountains and trek. Beutiful Triund"
	},
	function(err,campground){

		if(err)
		{
			console.log(err);
		} else {
			console.log("newly created campground");
			console.log(campground);
		}
	}
);




app.get("/", function (req, res) {
	res.render("landing");
});
// INDEX - show all campgrounds
app.get("/campgrounds", function (req, res) {
	// get all campgrounds from DB
	campground.find({}, function (err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", { campgrounds: allCampgrounds });
		}
	});


});

// CREATE - add new campground to DB
app.post("/campgrounds", function (req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var description = req.body.description;
	var newCampground = { name: name, image: image, price: price, description: description }
	//create a new campground and save to database
	campground.create(newCampground, function (err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});

});


//NEW - show form to create new campground
app.get("/campgrounds/new", function (req, res) {
	res.render("new.ejs");
});


// SHOW - show more info about one campground
app.get("/campgrounds/:id", function (req, res) {
	
	
	// find the campground with provided id
	campground.findById(req.params.id).populate("comments").exec( function (err, foundCampGround) {
		if (err) {
			console.log(err);
		} else {
			console.log(foundCampGround);
			
			
			// render show template with that campground
			res.render("show", { campground: foundCampGround });

		}
	});
});
app.listen(3000, function () {
	console.log(" The camp review server has started");
});


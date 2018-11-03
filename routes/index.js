var express = require('express');
var router = express.Router();

var Notes = require('../models/notes');
var Users = require('../models/user');
       //var Notes ho kei farak pardaina


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Make A Note' });
});
router.get('/login',function(req,res){          //PATH FOR LOGIN
	res.render('login');
});
router.get('/signup',function(req,res){        //PATH FOR SIGNUP
	res.render('signup');
});

/* post */
router.post('/signup',function(req,res){      // DISPLAYS IN TERMINAL //DATA OF SIGNUP IS STORED/SAVED IN DATABASE
	console.log('request.....', req.body);
	var user = new Users({
		username: req.body.username,
		password: req.body.password
	});

	var promise=user.save()
	promise.then((user) => {                  //VALUE RETURNED AFTER SAVING
		console.log('user signed up with values',user);
	});
});


router.post('/login',function(req,res){
 // DISPLAYS DATA OF LOGIN IN TERMINAL  AND user.find FINDS THE DATA WHICH ALREADY EXISTS IN TERMINAL
	if(req.body.username && req.body.password){

	Users.findOne({
	   username:req.body.username,                               //USER EXPORTED
	   password:req.body.password},
	    function(err, user){
		   console.log('logged in user is...',user);
		     res.redirect('/addnote');
		   });
}
     else{ console.log('not  a valid Id ');}
});



router.get('/addnote',function(req,res){
	res.render('addnote');
});
router.post('/addnote',function(req,res){    //addnote post //  THEN ADD TO terminal ==> save
	console.log('request', req.body);
		var note = new Notes({
		title: req.body.title,
		subject: req.body.subject
	})

	var promise=note.save()
	    promise.then((note)=> {
            console.log('saved in a db with values', note);
            Notes.find().exec(function(err,notes){
            res.render('viewnote', {notes})
            });
	});
});


 router.get('/deletenote/:id', function(req, res) {
  Notes.findOneAndRemove({_id: req.params.id}, function(err, note) {
    console.log('deleted note is', note);
    res.redirect('/viewnote')
  });
})


 router.get('/viewnote', function (req, res) {
  Notes.find().exec(function(err, notes) {
    res.render('viewnote', {notes})
  });
})




module.exports = router;

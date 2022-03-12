const router = require('express').Router();
const auth = require('../validation/validateJwt');

router.get('/', auth, (req,res) =>{
 res.status(200).json({
   post: {title: "Dark in the forest", description: "Dark in the forest is a movie which had been released back in 1970", warning: "If you are abel to see this post without athentication, then that is bad"}
 }); 
});

module.exports = router;
var express = require('express');
var router = express.Router();

function begin(tmp=[]){
    if(tmp.length===25) return tmp;
    tmp.push("");
    return begin(tmp);
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query);
  if(req.query.act && req.query.act==="displace"){
      var displaced = begin();
      displaced = displaced.map((val, index) => {
          return index;
      });
      res.json({
          "position": displaced
      })
  }
  else res.json({
      "position":begin()
  });
});

module.exports = router;

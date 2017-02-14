/*jshint node: true*/

var express = require('express'),
    fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    app = express(),
    port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');
// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  // ejs render automatically looks in the views folder
  res.render('index');
})

app.get('/scrape', function (req, res) {
  // Let's scrape Anchorman 2
url = 'http://www.imdb.com/title/tt1229340/';

  request (url, function (error, response, html){
    if (!error) {
    var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      $('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.title = title;
        json.release = release;
      })

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
    }

/*
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })
    */
    res.send(json)


  //  res.send('Check your console!')
  })
})

app.get('/colissimo',function(req,res){
  url = 'http://www.colissimo.fr/portail_colissimo/suivreResultat.do?parcelnumber=9L17009616750';

  request(url,function(error,response,html){
    if(!error){
      var $ = cheerio.load(html);

      var result,head;
      var json ={result:"", head:""};

      $('.dataArray').filter(function(){
        var data = $(this);

        result = data.children().text().trim();
        head = data.children().last().children().last().text().trim();


        json.result = result;
        json.head = head;
      })
    }
/*
    fs.writeFile('colissimo.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })
    */

   res.send(json)
    //res.send('hey look your output')
  })
})

app.get('/ups',function(req,res){
  url = 'https://wwwapps.ups.com/WebTracking/track';

  request(url,function(error,response,html){
    if(!error){
      var $ = cheerio.load(html);

      var result,head;
      var json ={test :"",result:"", head:""};

      $('#collapse3').filter(function(){
        var data = $(this);
        console.log(data);
        test = data;
        result = data.children().text().trim();
        head = data.children().last().children().last().text().trim();

        json.test=test;
        json.result = result;
        json.head = head;
      })
    }
/*
    fs.writeFile('colissimo.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })
    */

   res.send(json)
    //res.send('hey look your output')
  })
})
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

exports = module.exports = app;

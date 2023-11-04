var express = require('express'); // importing express
var path = require('path'); // importing path
var app = express(); // making app instance
const exphbs = require('express-handlebars'); // importing express-handlebars
const port = process.env.port || 3000; // port is 3000 
const sample = require('./ite5315-A1-Car_sales.json');
const sales = require('./SuperSales.json');

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, 'public')));  // enabling the static assets

// app.engine('.hbs', exphbs.engine({ extname: '.hbs' })); // template engine


app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  helpers: {
    chd: function (options) {
      if(options==0){
        return false;
      }else{
        return true;
      }
    },
      strong: function(options){
          return '<strong> <h1>' + options.fn(this) + '</h1> </strong>';
      },
      chd1: function(options){
        if(options==0){
          return "Zero";
        }else{
          return options;
        }
      },
      chd2 :function(options){
        if(options==0){
          return "High";
        }else{
          return "Low";
        }
      }
  },
  
  defaultLayout: 'main'
}));



app.set('view engine', 'hbs');

app.get('/', function(req, res) { // root route
  res.render('index', { title: 'Express' });
});

app.get('/users', function(req, res) { // users route
  res.send('respond with a resource');
});

app.get('/data',function(req,res){
  console.log(sample);
      res.render('all_invoice', { data: "Json data is loaded" });


})

app.get('/data/invoiceNo/:n',function(req,res){
  n = req.params.n
  console.log(sample.carSales.length);
  if(n>=0 && n<sample.carSales.length){
      console.log(sample.carSales[req.params.n].InvoiceNo);
      num = sample.carSales[req.params.n].InvoiceNo;
      res.render('all_invoice', { data: num });
  }else{
      res.render('all_invoice', { data: "Invalid Index" });
  }
})

app.get('/search/invoiceNo',function(req,res,next){
  res.render('search_invoice_form', { });
})

app.post('/search/invoiceNo',urlencodedParser,function(req,res){
  username = req.body.username;
  console.log(username);
  data1 = {}
  for(i=0;i<sample.carSales.length;i++){
      if(username==sample.carSales[i].InvoiceNo){
          data1 = sample.carSales[i];
      }
  }
 
  res.render('invoice_data',{data1:data1});
})

app.get('/search/Manufacturer/',function(req,res){
  res.render('search_manufacturer_form', { });

})

app.post('/search/Manufacturer/',urlencodedParser,function(req,res){
  console.log(req.body);
  username = req.body.manufacturer;
  console.log(req.body);
  // console.log(username);
  data2 = []
  for(i=0;i<sample.carSales.length;i++){
      if((sample.carSales[i].Manufacturer).includes(username)){
          data1 = sample.carSales[i];
          data2.push(data1)
      }
  }
  res.render('manufacturer_data', {data:data2 });
})

app.get('/viewData',function(req,res){
  data1 = sales;
  // res.send(data1);
  res.render('car_sales', {data:data1 });
})

app.get('/viewDataRatingZero',function(req,res){
  data1 = sales;
  // res.send(data1);
  res.render('car_sales_rating_zero', {data:data1 });
})


app.get('/viewDataRatingZeroToZero',function(req,res){
  data1 = sales;
  // res.send(data1);
  res.render('car_sales_rating_zero_to_zero', {data:data1 });
})
app.get('*', function(req, res) { // Wrong route
  res.render('error', { title: 'Error', message:'Wrong Route' });
});

app.listen(port, () => { // port listening 
  console.log(`Example app listening at http://localhost:${port}`)
})
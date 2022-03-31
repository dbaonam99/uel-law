require('dotenv').config()

const express = require('express')
const http = require("http");
const app = express(); 
const server = http.createServer(app);
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");  

var bannerRoutes = require('./routes/banner'); 
var homeRoutes = require('./routes/home'); 
var quoteRoutes = require('./routes/quote'); 
var introduceRoutes = require('./routes/introduce'); 
var archiveRoutes = require('./routes/archive'); 
var sponsorRoutes = require('./routes/sponsor'); 
var teamRoutes = require('./routes/team'); 
var emailRoutes = require('./routes/email'); 
var contactRoutes = require('./routes/contact'); 
var imageRoutes = require('./routes/image'); 
var newsRoutes = require('./routes/news'); 
var libraryRoutes = require('./routes/library'); 
var todosRoutes = require('./routes/todos'); 
var userRoutes = require('./routes/user'); 

mongoose.connect(
  process.env.MONGO_URL, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: 'Law',
    useFindAndModify: false
  }
);

var cors = require('cors');
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(express.static('public'))

app.use(function(req, res, next) {
  res.header('application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
 
app.use("/banner", bannerRoutes); 
app.use("/home", homeRoutes);
app.use("/quote", quoteRoutes);
app.use("/introduce", introduceRoutes);
app.use("/archive", archiveRoutes);
app.use("/sponsor", sponsorRoutes);
app.use("/team", teamRoutes);
app.use("/email", emailRoutes);
app.use("/contact", contactRoutes);
app.use("/image", imageRoutes);
app.use("/news", newsRoutes);
app.use("/library", libraryRoutes);
app.use("/todos", todosRoutes);
app.use("/users", userRoutes);

app.use(cors());
app.options('*', cors());

const host = '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, function() {
  console.log("Server started.......");
});

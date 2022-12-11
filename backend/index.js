require('dotenv').config()

const express = require('express')
const http = require("http");
const app = express(); 
const server = http.createServer(app);
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");  

const bannerRoutes = require('./routes/banner'); 
const homeRoutes = require('./routes/home'); 
const quoteRoutes = require('./routes/quote'); 
const introduceRoutes = require('./routes/introduce'); 
const archiveRoutes = require('./routes/archive'); 
const sponsorRoutes = require('./routes/sponsor'); 
const teamRoutes = require('./routes/team'); 
const emailRoutes = require('./routes/email'); 
const contactRoutes = require('./routes/contact'); 
const imageRoutes = require('./routes/image'); 
const newsRoutes = require('./routes/news'); 
const libraryRoutes = require('./routes/library'); 
const todosRoutes = require('./routes/todos'); 
const userRoutes = require('./routes/user'); 

mongoose.connect(
  process.env.MONGO_URL, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: 'Law',
    useFindAndModify: false
  }
);

const cors = require('cors');
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
  console.log("Server started........");
});
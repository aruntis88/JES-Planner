const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')



require('dotenv').config()
// import routes
const userRoutes = require('./routes/user')
const companyRoutes = require("./routes/company")
const customerRoutes = require("./routes/customer")
const resourceRoutes = require("./routes/resource")
const customerResourceRoutes = require("./routes/customerResource")
const taskRoutes = require("./routes/task")

// app
const app = express()

// db
mongoose
    .connect('mongodb://localhost/employeeTaskApp', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log(`Mongoose Connected`));


// middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// routes middleware
app.use('/', userRoutes)
app.use('/', companyRoutes)
app.use('/', customerRoutes)
app.use('/', resourceRoutes)
app.use('/', customerResourceRoutes)
app.use('/', taskRoutes)



  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes  html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

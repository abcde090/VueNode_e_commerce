const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


const User = require('./models/user')

dotenv.config();
const app = express()

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected')
    }
})
// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


// Get data
app.get("/", (req, res) => {
    res.json("Hello amazon clone");
});

// Post data
app.post("/", (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save((err) => {
        if (err) {
            res.json(err);
        } else {
            res.json("successfully saved")
        }
    }); 
});

// apis
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const ownerRoutes = require('./routes/owner');

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ownerRoutes);

app.listen(3001, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Listen on port", 3001);
    } 
});
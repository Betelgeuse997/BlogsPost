require('dotenv').config();
const express = require("express");
// const config = require("./config.js");
const mongoose = require("mongoose");
const blogsRoute = require("./routes/blogsRoute.js");
const cors = require("cors");
const userAuth = require("./routes/userAuth.js");


const app = express();
const path = require('path');

app.use(express.json());

app.use(cors());

// app.use(
    
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','PUT','POST','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
    
// );
app.use('/', userAuth);
app.use('/', blogsRoute);

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../frontend/dist");

app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../frontend/dist/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})

mongoose.connect(process.env.mongoDBURL)
    .then(() => {
        console.log('Connected to Database');
        app.listen(process.env.PORT, () => {
            console.log(`Listening to port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
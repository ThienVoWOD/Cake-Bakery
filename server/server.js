const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//require('./routes/user')(app);
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/product'));
app.use('/api', require('./routes/category'));
app.use("/api", require("./routes/order"));

app.listen(process.env.PORT,() => {
    console.log(`Server is listening to port ${process.env.PORT}`)
})

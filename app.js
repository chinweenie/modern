const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const users = require("./routes/api/users");
const uploads = require("./routes/uploads");
const fetches = require("./routes/fetches");
const bodyParser = require('body-parser');
const passport = require('passport');
const cloudinary = require('cloudinary');
const fileUploadMiddleware = require('./file-upload-middleware');
const multer = require('multer');

app.use(passport.initialize());
//We also need to setup a configuration file for Passport (add this after the previous line):
require('./config/passport')(passport);


mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));


const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

cloudinary.config({
    cloud_name: 'yuichiu416',
    api_key: '636885234849389',
    api_secret: 'uvYf_ru2LHsH5iXmiJ9_1BXNHBQ',
})

const storage = multer.memoryStorage()
const upload = multer({ storage })

app.post('/files', upload.single('file'), fileUploadMiddleware);

app.use("/", uploads);
app.use('/', fetches); 

app.use("/api/users", users);
app.all('*', (req, res) => {
    console.log("Unknown route, bad request");
    return res.sendStatus(404);
});
app.listen(port, () => console.log(`Server is running on port ${port}`));
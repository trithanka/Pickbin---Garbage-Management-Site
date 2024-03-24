const express = require("express");
const app = express();
const pug = require("pug");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
// const nodemon=require("nodemon")

mongoose.connect('mongodb://0.0.0.0:27017/user');

const userSchema = new mongoose.Schema({
    // name: String,
    phone_no: String,
    email: String,
    password: String
})

const complaintSchema = new mongoose.Schema({
    name: String,
    email: String,
    location: String,
    houseno: Number,
    address: String,
    type: String,
    quantity: String
})

const adminSchema = new mongoose.Schema({
    name: String,
    phone_no: String,
    email: String,
    password: String
})

const complain = mongoose.model('complain', complaintSchema);

const detail = mongoose.model('detail', userSchema);

const admin = mongoose.model('admin', adminSchema);

app.set('view engine', 'pug')
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('Login.pug');
})

app.get('/login', (req, res) => {
    // const con='successfully registered'
    // const prop={'confirm':con}
    res.render('Login.pug');
})
app.get('/login1', (req, res) => {
    const con = 'successfully registered'
    const prop = { 'confirm': con }
    res.render('Login.pug', prop);
})

app.get('/register', (req, res) => {
    res.render('Register.pug');
})

// app.get('/fillup',(req,res)=>{
//     res.render('Fillup.pug');
// })

app.get('/fillup', (req, res) => {
    res.render('Fillup2.pug');
})


app.get('/thankyou', (req, res) => {
    res.render('Thankyou.pug');
})

app.get('/home', (req, res) => {
    res.render('Home.pug');
})

app.get('/aboutus', (req, res) => {
    res.render('Aboutus.pug');
})

app.get('/loginadmin', (req, res) => {
    res.render('adminlogin.pug');
})

app.get('/registeradmin', (req, res) => {
    res.render('adminregister.pug');
})

app.get('/contactus', (req, res) => {
    res.send('Error 404');
})

app.get('/redlogin', (req, res) => {
    res.render('redlogin.pug');
})

// app.get('/checkout', (req, res) => {
//     res.render('checkout.pug');
// });

app.get('/help', (req, res) => {
    res.render('help.pug');
});

app.listen(80, () => {
    console.log('successfully hosted..');
})

//save data from registration user
app.post('/detail', async (req, res) => {
    const myData = new detail(req.body);
    await myData.save().then(() => {
        res.redirect('/login1')
    }).catch(() => {
        res.send('Data is not Save')
    })
})

//save data from fillup
app.post('/complaint', async (req, res) => {
    const myCom = new complain(req.body);
    await myCom.save().then(() => {
        res.redirect('/thankyou')

    }).catch(() => {
        res.send('Your Complain is not saved')
    })
})

//authetication for user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await detail.findOne({ email });
    const pass = await detail.findOne({ password });
    if (!user || !pass) {
        return res.json({ error: "user not found" });
    } else {
        // res.render('Fillup2.pug')
        res.render('Home.pug')
    }
})

//save data from admin registration
app.post('/adminreg', async (req, res) => {
    const myData = new admin(req.body);
    await myData.save().then(() => {
        res.redirect('/loginadmin')
    }).catch(() => {
        res.send('Data is not Save')
    })
})

// authetcation for admin
app.post('/adminlog', async (req, res) => {
    const { email, password } = req.body;
    const user = await admin.findOne({ email });
    const pass = await admin.findOne({ password });
    if (!user || !pass) {
        return res.json({ error: "user not found" });
    } 
    

})


app.get('/admin', async function (req, res) {

    const complaints = await complain.find();
    const details = await detail.find()
    // Render the Pug template and pass the data as a local variable

    const data = await complain.aggregate([
        {
          $group: {
            _id: "$location",
            count: { $sum: 1 }
          }
        }
      ]);
    
    // const countData = await complain.aggregate([
    // {
    //     $group: {
    //     _id: "$email",
    //     count: { $sum: 1 }
    //     }
    // }
    // ]);
        
    res.render('admin', { complaints: complaints, details: details ,data:data});

});



























// var MongoClient = require('mongodb').MongoClient;
// MongoClient.(function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("user");
//   dbo.collection('detail').aggregate([
//     { $lookup:
//        {
//          from: 'complain',
//          localField: 'email',
//          foreignField: 'email',
//          as: 'alldetails'
//        }
//      }
//     ]).toArray(function(err, res) {
//     if (err) throw err;
//     console.log(JSON.stringify(res));
//     db.close();
//   });
// });
// console.log(MongoClient.EventEmitter)


































// app.post('/login',(req,res)=>{
//     var email = req.body.email;
//     var password = req.body.password;

//     var data = {
//         "email" : email,
//         "password" : password
//     }

//     mongoose.collecton('logininfo').insertOne(data,(err,collection)=>{
//         if(err){
//             throw err;
//         }
//         console.log("Login Successful");
//     });

//     return res.redirect('Fillup.pug')
// })
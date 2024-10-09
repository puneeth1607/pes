const express = require('express')
const PORT = process.env.PORT || 5000; // Change 5000 to 5001
const app = express()

const UserModel = require('./config/database');
const { hashSync } = require('bcrypt');
app.set('view engine', 'ejs')

//middleware
app.use(express.urlencoded({ extended: true})) // parse application/x-www-form-urlencoded



app.get('/', (req, res) => {
    // res.send('Hello World! This is the server running on port 5000.')
    res.render('index', {title: 'Home Page'})
})

//create some routs
app.get('/login', (req, res) => {
        // res.send('Login Page')
        res.render('login', {title: 'Login Page'})
    }
)

app.get('/register', (req, res) => {
        // res.send('Register Page')
        res.render('register', {title: 'Register Page'})
    }
)

app.post('/login', (req,res)=>{
    // console.log(req.body)
    // res.send('Login data updated')
    res.redirect('/protected') // redirect to protected page after successful login
})

app.post('/register', (req,res)=>{
    // console.log(req.body)
    // res.send('Register data updated')
    // res.redirect('/') // redirect to home page after successful registration
    // console.log(req.body.name); // Log the request body to debug
    let User = new UserModel(
        {
            username: req.body.username,
            password: hashSync( req.body.password , 10)
        }
    )
    User.save().then( 
        User => {console.log('User saved')  // Log the success message
            // res.send({ success: true, message: 'Registration down successfully' }); 
            res.redirect('/login')
    } // Redirect to home page after successful registration
    )
    
    .catch(
        error => {
            console.error('Error saving user:', error);
            // Handle the error (you can send a response or redirect to an error page)
            res.status(500).send({ success: false, message: 'Registration failed' });
        }
    )
})





app.get('/logout', (req, res) => {
        // res.send('Logout Page')
        res.redirect('/') // redirect to home page after successful logout
    }
)

app.get( '/protected', (req, res) => {
        res.send('This is a protected page');
    }       

)

app.listen(PORT, (req,res) => {console.log('Server running on port 5000')
    }
)
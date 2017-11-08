const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
// set template engine
app.set('view engine', 'hbs');


// registering my middleware {or any 3rd party}
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         //currentYear: new Date().getFullYear(),
//         welcomeMessage: 'We will be in operation soon'
//     });
// });

// static middleware
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Lukas',
    //     likes: [
    //         'biking',
    //         'piching'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        //currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my super page'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        //currentYear: new Date().getFullYear()
    });
});

// app.get('/maintenance', (req, res) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         //currentYear: new Date().getFullYear(),
//         welcomeMessage: 'We will be in operation soon'
//     })
// });

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error handling this route'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
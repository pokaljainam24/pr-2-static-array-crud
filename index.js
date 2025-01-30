const express = require('express');
const port = 8024;
const app = express();

app.set('view engine', 'ejs');

let users = [];

app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    console.log(req.body);
});

app.post('/create', (req, res) => {
    users.push(req.body);
    return res.redirect(res.get('Referrer') || '/');
})

app.get('/delete/user/:id', (req, res) => {

    const { id } = req.params;
    console.log({ id, users });

    users = users.filter((user) => user.id !== id);
    return res.redirect(res.get('Referrer') || '/');

})

app.get('/edit/user/', (req, res) => {
    let { id } = req.query;

    let user = users.filter(user => user.id === id)[0];
    console.log(user);

    return res.render('./edit', { user });
})

app.post('/edit/user/', (req, res) => {
    let { id, Username, Email, Password, Phone } = req.body;

    users = users.map(user => {
        if (user.id === id) {
            user.Username = Username
            user.Email = Email
            user.Password = Password
            user.Phone = Phone
        }
        return user;
    });
    return res.redirect('/');
});

app.get('/viewdata', (req, res) => {
    return res.render("viewdata", { users });
});

app.get('/', (req, res) => {
    res.render('crud', { users });
});

app.listen(port, (err) => {
    if (!err) {
        console.log("Server Is Working Properly...");
        console.log("http://localhost:" + port);
    }
})
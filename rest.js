const express = require('express')
const getData = require('./mongo.js')


const app = express()
app.use(express.json())

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: (err.status || 500),
            message: err.message,
        }
    })
})

app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/api/all', (req, res) => {
    getData().then(data =>{
        res.send(data);
    })
});

app.get('/api/authors/:name', (req, res) => {
    const authName = req.params.name
    if(authName.length == 0){
        res.send('Author name must be typed!')
    }
   
    getData({name: authName}).then(data =>{
        res.header("Content-Type",'application/json');
        if (data.length == 0){
            res.status(404).send('no author found!')
        }else{
            res.send(data)
        }
    })
});

app.get('/api/quotes/:quote', (req, res) => {
    const quoteName = req.params.quote
    if(quoteName.length == 0){
        res.send('At least a piece of a quote must be typed!')
    }
   
    getData({quote: new RegExp(quoteName, 'i')}).then(data =>{
        res.header("Content-Type",'application/json');
        if (data.length == 0){
            res.status(404).send('no author found!')
        }else{
            res.send(data)
        }
    })
});



const port = process.env.PORT || 3000
app.listen(port, ()=>{console.log(`app listen at port ${port}`)})
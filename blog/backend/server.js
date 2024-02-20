const express = require('express');
const articleApi = require('./routes/article')
const authorApi = require('./routes/author')
const cors = require('cors')

require('./config/connect')

const app = express();
app.use(express.json());//can read the json data
app.use(cors());
app.use('/article',articleApi);
app.use('/author',authorApi);

app.use('/getimage',express.static('./uploads'));


app.listen(3000,()=>{
    console.log('server work')
})
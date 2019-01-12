const express = require('express')
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task.router');


const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('server/public'));

//routes
app.use('/task', taskRouter);





app.listen(PORT, () => {
    console.log('listening on port:', PORT);

});

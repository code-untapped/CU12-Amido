const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.set('port', process.env.PORT || 8840);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    // TODO: Check for NODE_ENV development
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/getAmidoCustomerData', function(req, res, next) {
    TimeNow = new Date();
    msg = '\n Get Amido Customer Data request received at: ' + TimeNow + '\n';
    console.log(msg)

    const DATA_SOURCE = 'downloads/searchCustomers.json';

    fs.readFile(DATA_SOURCE, function read(err, data) {
        if (err) {
            throw err;
        }

        let content = JSON.parse(data);
        console.log(content)
    
        res.writeHead(200, {'Content-Type': 'JSON'});
        res.end(JSON.stringify(content));
    });
});


app.listen(app.get('port'), () => {
    console.log('Amido Customer Service listening on : http://localhost:%s', app.get('port'));
});

module.exports = app;
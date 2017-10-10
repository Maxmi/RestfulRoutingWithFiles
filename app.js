const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/json' }));

//need to add error handling to all routes, 
//if user tries to fetch/update/delete non-existing file - send 404 error 

//adding new file, content sent in body of POST request
//need to make filename created dynamically 
app.post('/api/quotes', (req, res) => {
  //get nextID
  const data = JSON.parse(fs.readFileSync('./nextID.json'));
  // console.log(data);
  const nextID = Number(data.ID);
  // console.log(nextID);
  
  //generate file name 
  const file = './' + nextID + '.json'; 
  
  //write data into file 
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2));
  res.send('Successfully created the file ' + file);
  
  //update nextID file 
  let newNextID = {
    ID: Number(nextID) + 1
  };  
  fs.writeFile('nextID.json', JSON.stringify(newNextID), (err) => {
    if(err) throw err;
    console.log('Updated nextID');
  });
});


//reading an individual file, file name is dynamic
app.get('/api/quotes/:id', (req, res) => {
  const file = require('./' + req.params.id + '.json');  
  res.send(file);
});



//updating a file
app.put('/api/quotes/:id', (req, res) => {
  const file = './' + req.params.id + '.json';
  fs.writeFileSync(file, JSON.stringify(req.body));
  res.send('Successfully updated the file ' + req.params.id + '.json');
});


//deleting a file 
app.delete('/api/quotes/:id', (req, res) => {
  const file = './' + req.params.id + '.json';
  fs.unlinkSync(file);
  res.send('Successfully deleted the file ' + req.params.id + '.json');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is listening on port 3000');
});
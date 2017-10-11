const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const _ = require('lodash');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

//error handling function
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

//helper function to read a file
const tryToReadFile = (fileName, next, hasCallback, res) => {
  let initialData;
  try {
    initialData = fs.readFileSync(fileName);
    if(hasCallback) {
      res.send(initialData);
    }
  } catch (err) {
    if(err.code === 'ENOENT') {
      next(_.extend(err, {
        status: 404
      }));
    } else {
      throw err;
    }
  }
   return initialData;
}


//adding new file, content sent in body of POST request
app.post('/api/quotes', (req, res, next) => {
  
  const initialData = tryToReadFile('./next_ID.json', next);
  //get nextID
  const data = JSON.parse(initialData);
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
app.get('/api/quotes/:id', (req, res, next) => {
  tryToReadFile(`${req.params.id}.json`, next, true, res);
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
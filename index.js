const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;


app.get('/', (req, res) =>{
    res.send('Simple Node Server Running');
});

app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'sakib', email: 'sakib@gmail.com' },
    { id: 2, name: 'rakib', email: 'rakib@gmail.com' },
    { id: 3, name: 'korim', email: 'korim@gmail.com' }
];




const uri = "mongodb+srv://saiful082:K3YeKm94dYiauQ2o@cluster0.m92agsd.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const  userCollection = client.db('simpleNode').collection('users');
    // const user = {name: 'Rakibul Islam', email: 'rakibul082@gmail.com'}
    // const result = await userCollection.insertOne(user);
    // console.log(result);

    app.get('/users', async (req, res) =>{
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    })


    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      console.log(result);
      user._id = result.insertedId;
      res.send(user);
  })

  } 
  finally {
      
  }
}
run().catch( error => console.log(error));




// app.get('/users', (req, res) =>{
//     if(req.query.name){
//         const search = req.query.name;
//         const filtered = users.filter(user => user.name.toLocaleLowerCase().indexOf(search))
//         res.req(filtered);
//     }   

//     else {
//         res.send(users);
//     }
   
// })




// app.post('/users', (req, res) => {
//     console.log('Post Api called');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);
// })


app.listen(port, () => {
    console.log(`Simple not server running on port. ${port}`);
})
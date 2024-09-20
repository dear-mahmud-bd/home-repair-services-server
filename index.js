const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;




// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.augbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();





        // Database Collection
        const serviceCollection = client.db('RENOXY_DB').collection('all_services');
        const bookingCollection = client.db('RENOXY_DB').collection('all_bookings');


        // Get most popular services...
        app.get('/popular-services', async (req, res) => {
            const cursor = serviceCollection.find().sort({ serviceTotalOrder: -1 }).limit(4);
            const result = await cursor.toArray();
            res.send(result);
        });

        // Get all services ...
        app.get('/services', async (req, res) => {
            const serviceName = req.query.service_name;
            let query = {};
            if (serviceName) {
                query.serviceName = { $regex: serviceName, $options: 'i' };
            }
            const cursor = serviceCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // Get specific user services ...
        app.get('/user-services', async (req, res) => {
            const userEmail = req.query.user_email;
            const query = { serviceProviderEmail: userEmail };
            const cursor = serviceCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // Get a specific service ...
        app.get('/services/:_id', async (req, res) => {
            const id = req.params._id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: 'Invalid ID format. ID must be a 24-character hexadecimal string.' });
            }
            const query = { _id: new ObjectId(id) };
            const result = await serviceCollection.findOne(query);
            res.send(result);
        })

        // Add a specific service in database ...
        app.post('/services', async (req, res) => {
            const newService = req.body;
            // console.log(newService);
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        })

        // Update a service from specific user
        app.put('/services/:_id', async (req, res) => {
            const id = req.params._id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedService = req.body;
            // console.log(updatedService);
            const service = {
                $set: {
                    serviceProviderName: updatedService.serviceProviderName,
                    // serviceProviderEmail: updatedService.serviceProviderEmail, // No need to email (JWT)
                    serviceProviderImage: updatedService.serviceProviderImage,
                    serviceName: updatedService.serviceName,
                    serviceImage: updatedService.serviceImage,
                    serviceLocation: updatedService.serviceLocation,
                    seasonality: updatedService.seasonality,
                    servicePrice: updatedService.servicePrice,
                    serviceDescription: updatedService.serviceDescription,
                }
            };
            const result = await serviceCollection.updateOne(filter, service, options);
            res.send(result);
        })

        // Delete specific user service ...
        app.delete('/services/:_id', async (req, res) => {
            const id = req.params._id;
            console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        })



        // Add a specific service in database ...
        app.post('/bookings', async (req, res) => {
            const newBooking = req.body;
            console.log(newBooking);
            const result = await bookingCollection.insertOne(newBooking);
            res.send(result);
        })

        // Get all bookings for service holder ...
        app.get('/holder-bookings', async (req, res) => {
            const userEmail = req.query.user_email;
            const query = { serviceHolderEmail: userEmail };
            const cursor = bookingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // Get all bookings for service provider ...
        app.get('/provider-bookings', async (req, res) => {
            const userEmail = req.query.user_email;
            const query = { serviceProviderEmail: userEmail };
            const cursor = bookingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // Update booking status with service provider ...
        app.patch('/bookings-status/:_id', async (req, res) => {
            const id = req.params._id;
            // console.log(id);
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: false };
            const updatedStatus = req.body;
            const setStatus = {
                $set: {
                    status: updatedStatus.status,
                }
            };
            console.log(updatedStatus.status, setStatus);
            const result = await bookingCollection.updateOne(filter, setStatus, options);
            res.send(result);
        });




        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server Connected Successfully for RENOXY')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


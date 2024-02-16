const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDatabase = require('./database')
const cookieParser = require('cookie-parser');

dotenv.config()

connectDatabase()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// route imports
const medicineRoute = require('./routes/medicineRoutes')
const orderRoute = require('./routes/orderRoutes')
const userRoute = require('./routes/userRoutes')
app.use(medicineRoute)
app.use(orderRoute)
app.use(userRoute)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
})
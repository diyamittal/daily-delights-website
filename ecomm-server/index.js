const express=require("express");
const cors = require("cors");
require('dotenv').config();
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product')
const Location = require('./db/Location')
const Order = require('./db/Order')
const bcrypt = require('bcryptjs')
const app= express();
const paymentController = require('./controllers/paymentController.js')
const mongoose = require('mongoose');
//const Jwt = require('jsonwebtoken');
//const jwtKey = 'e-comm';

const port = process.env.PORT || 5000;

//const verifyToken = require('./middleware/auth')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://daily-delights-website-frontend.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});
app.use(express.json());

app.post("/register", async(req, res)=>{
    const existingUser = await User.findOne({email: req.body.email});
    if(existingUser){
        return res.status(400).json({error: 'User already exist'});
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = new User({...req.body, password: hashedPassword});
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post("/login", async (req, res)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne({email: req.body.email});
        if(user && await bcrypt.compare(req.body.password, user.password)){
            user = user.toObject();
            delete user.password;
            res.send(user);
        } else {
            res.send({result: 'No User Found'})
        }
    } else {
        res.send({result: 'No User Found'})
    }
})

app.post("/add-product", async (req, res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})

app.get("/products", async(req, res)=>{
    let products = await Product.find();
    if(products.length>0){
        res.send(products)
    }
    else{
        res.send({result:"No Products found"})
    }
})

app.post("/add-location", async (req, res)=>{
    let location = new Location(req.body);
    let result = await location.save();
    res.send(result)
})

app.post("/add-order", async (req, res)=>{
    let order = new Order(req.body);
    let result = await order.save();
    res.send(result)
})

app.get("/orders/:userId", async (req, res)=>{
    let orders = await Order.find({ "userId._id": req.params.userId }).sort({ createdAt: -1 });
    res.send(orders)
})

app.delete("/products", async (req, res)=>{
    try{
        const result = await Product.deleteMany({})
    }
    catch(error){
        console.log("error");
    }
})

app.delete("/products/:id", async (req, res)=>{
    try {
        const result = await Product.deleteOne({id: req.params.id});
        if (result.deletedCount === 1) {
            res.send({ message: "Product deleted successfully" });
        } else {
            res.status(404).send({ error: "Product not found" });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ error: "Internal server error" });
    }
})

app.listen(port);
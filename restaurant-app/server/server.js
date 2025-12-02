const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/restaurant")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const OrderSchema = new mongoose.Schema({
    customerId: String,
    items: Array,
    totalPrice: Number,
    status: String,
    orderDate: String
});

const Order = mongoose.model("orders", OrderSchema);


app.get("/orders", async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

app.post("/orders", async (req, res) => {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: "Order created", order: newOrder });
});

app.put("/orders/:id", async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Order updated" });
});

app.delete("/orders/:id", async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));

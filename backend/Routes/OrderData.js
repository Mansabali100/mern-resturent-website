const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/orderData', async (req, res) => {
    try {
        const { email, order_data, order_date } = req.body;

        
        order_data.unshift({ Order_date: order_date });

        const existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
          
            await Order.create({
                email,
                order_data: [order_data]
            });
        } else {
        
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

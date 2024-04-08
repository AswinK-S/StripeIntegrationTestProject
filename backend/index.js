const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

const stripe = require("stripe")(process.env.Secret_key)

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json()) // to parse the incoming requests with JSON 

app.post('/checkout', async (req, res) => {

    try {
        console.log('in checkout');
        console.log(req.body, 'body kkkk');
        const email = req.body.email
        console.log('email---',email);

        const customer = await stripe.customers.create({
            email:email
        })
        const customerId = customer.id;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: (item.price) * 100
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
          
            billing_address_collection: 'required',
            customer: customerId, // Use the customerId here
            customer_update: {
                address: 'auto',
                name: 'auto'
            }
        })
        res.status(200).json({ url: session.url })
    } catch (error) {
        console.log('err', error.message);
        res.status(500).json({ error: error.message })
    }
})



app.listen(3000, () => {
    console.log(`server running on http://localhost:3000`);
})
import { useState } from "react"
import {loadStripe} from '@stripe/stripe-js'

function Home() {

    const itemName = 'item'
    const itemPrice = 500

    const [finalAmount, setFinalAmount] = useState(itemPrice)
    const [quantity, setQuantity] = useState(1)

    const decrement = () => {
        if (quantity < 1) {
            setQuantity(1)
            setFinalAmount(itemPrice)
        } else if (quantity >= 1) {
            setQuantity(quantity - 1)
            setFinalAmount(finalAmount - itemPrice)
        }
    }

    const increment = () => {
        setQuantity(quantity + 1)
        setFinalAmount(finalAmount + itemPrice)
    }

    const checkout = async () => {
        try {

            const stripe = await loadStripe('pk_test_51P2UV2SEGRYT9lZHg0EcsOSis0gLsLpaKIv9jGemUZuGWoVeBogRpDoBgG8k9udr3TcOZ60jG4mEIIdMYKdRux3Q00KT7sEVMV')
            const response = await fetch('http://localhost:3000/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    items: [
                        {
                            id: 1,
                            quantity: quantity,
                            price: itemPrice,
                            name: itemName,
                        },
                    ],
                    email:'test@gmail.com'
                })
            })

            const data = await response.json()
            window.location = data.url
        } catch (error) {
            console.log('response err--', error.message);
        }
    }

    return (
        <>
            <div className="flex justify-center h-screen items-center">
                <div className="flex justify-center items-center h-96">
                    <img className="h-full border" src="https://5.imimg.com/data5/SELLER/Default/2023/3/296178163/GX/GL/SD/186724856/vivo-mobile-phone-1000x1000.jpg" alt="Mobile Phone" />
                    <div className="border h-full flex flex-col items-center ml-5 p-5 ">
                        <h1 className="text-black mb-5 mt-10">Vivo</h1>
                        <h4 className="text-black  mb-5 ">price: {itemPrice}</h4>

                        <p className="mb-2">quantity</p>
                        <div className="flex gap-5 items-center">
                            <button className="bg-sky-600 h-10 w-10 text-white" aria-label="Decrease quantity" onClick={decrement}>-</button>
                            <span className="text-black">{quantity}</span>
                            <button className="bg-sky-600 h-10 w-10 text-white" aria-label="Increase quantity" onClick={increment}>+</button>
                        </div>

                        <div className="flex flex-col items-center mb-5 mt-5">
                            <h4 className="text-black  mb-5 ">price: {finalAmount}</h4>

                            <button className="bg-green-600 text-white text-sm p-3" aria-label="Increase quantity" onClick={checkout}>Checkout</button>

                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Home
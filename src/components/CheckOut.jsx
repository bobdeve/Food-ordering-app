import React, { useContext } from 'react'
import { Modal } from './UI/Modal'
import UserProgressContext from '../store/UserProgressContext'
import { Button } from './UI/Button'
import CartContext from '../store/CartContext'
import { Input } from './UI/Input'

import { useHttp } from './Hooks/useHttp'
import { Error } from './UI/Error'
import { UpdateOrder } from './UpdateOrder'


// Configuration object for the HTTP request
const requestConfig = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' } // Setting content type to JSON
}
const requestConfigdelete = {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' } // Setting content type to JSON
}

// CheckOut component for handling the checkout process
export const CheckOut = () => {
    // Accessing context values for user progress and cart items
    const { progress, hideCheckOut } = useContext(UserProgressContext)
    const { items, clearCart } = useContext(CartContext)
    
    // Using the custom useHttp hook to handle the POST request
    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig)
   
   
   
   
    const cartTotal = items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    // Handler to hide the checkout modal
    const handleHideCheckout = () => {
      hideCheckOut()
    }

    // Handler to finish the checkout process, clearing the cart and data
    const handleFinish = () => {
   // Close the checkout modal
      clearCart()    // Clear the cart
      clearData()    // Clear the request data (if any)
      hideCheckOut()
      location.reload()
    
    }

    // Handler for form submission
    const handleSubmit = (event) => {
       event.preventDefault() // Prevent the default form submission
       
       // Convert form data to a JSON object
       const fd = new FormData(event.target)
       const customerData = Object.fromEntries(fd.entries())
      // deleteDataBase(JSON.stringify({}))

       // Send the request with the order data
       
       sendRequest(
        JSON.stringify({
          order: {
            items: items,
            customer: customerData
          }
        })
       )
      

       // Reset the form after submission
       event.target.reset()
    }

    // Define actions to show in the modal based on the request state
    let actions = (
      <>
        <Button onClick={handleHideCheckout} type="button" textOnly>Close</Button>
        <Button>Submit Order</Button>
      </>
    )

    // If the request is being sent, show a loading message instead of actions
    if (isSending) {
      actions = <span>Sending order data...</span>
    }

    // If data is received and there is no error, show a success message
    if (data && !error) {
      return (
        <Modal open={progress === 'checkout'} onClose={handleHideCheckout}>
          <h2>Success!</h2>
          <p>Your order was submitted successfully</p>
          <p>We will get back to you with more details via email within the next few minutes</p>
          <p className='modal-actions'>
            <Button onClick={handleFinish}>Okay</Button>
          </p>
          <div className='modal-actions'>
            <UpdateOrder/>
          </div>
        </Modal>
      )
    }

    // Render the checkout modal with a form to input customer details
    return (
      <Modal className="cart" open={progress === "checkout"} onClose={handleHideCheckout}>
        <form onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: {cartTotal}</p>
          <Input label="Full Name" type="text" id="name"/>
          <Input label="E-Mail Address" type="email" id="email"/>
          <Input label="Street" type="text" id="street"/>
          <div className='control-row'>
            <Input label="Postal Code" type="text" id="postal-code"/>
            <Input label="City" type="text" id="city"/>
          </div>
          {error && <Error title="Failed to submit order" message={error}/>} {/* Note: typo fixed from 'nessage' to 'message' */}
          <p className='modal-actions'>{actions}</p>
        </form>
      </Modal>
    )
}

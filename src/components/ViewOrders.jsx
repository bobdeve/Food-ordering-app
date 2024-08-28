import React, { useContext, useEffect } from 'react'
import { useHttp } from './Hooks/useHttp'
import { Modal } from './UI/Modal'
import UserProgressContext, { UserProgressContextProvider } from '../store/UserProgressContext'
import { Button } from './UI/Button'


const requestConfig ={}
export const ViewOrders = () => {
    const {progress,hideOrder} = useContext(UserProgressContext)
     const {data:loadMeals,isLoading,error,sendRequest} = useHttp('http://localhost:3000/fetchorder', requestConfig )

   
      
    
     if(!loadMeals || loadMeals.length === 0) {
        return <Modal className='cart' open={progress === 'order'} onClose={progress === 'order'? hideOrder:null}>
          <h1>No Order to show</h1>
          <Button onClick={hideOrder}>Close</Button>


        </Modal>
     }


  
    
  return (
    <Modal className="cart" open={progress === 'order'} 
    onClose={progress === 'order'? hideOrder:null} >
        <h2>Recent history</h2>
        <button className='float-btn' onClick={hideOrder}>X</button>
        <div>
    
      <h2>Orders</h2>
      {loadMeals?.map(order => (
        <div className='order-list' key={order.id}>
          <h3>Order ID: {order.id}</h3>
          <ul>
            {order.items.map((item,index) => (
              <li key={item.id}>
            
                <img  className='summary-pic' src={`http://localhost:3000/${item.image}`} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <h3>{order.customer.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
       
    </Modal>
  )
}

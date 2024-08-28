import React, { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import { Button } from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'


export const Header = () => {
  const {items} = useContext(CartContext)
  const {showCart,showOrder} = useContext(UserProgressContext)
  const totalCartItems = items.reduce((total, item) => total + item.quantity, 0)
  const handleShowCart =()=>{
    showCart()
  }
  return (
    <header id='main-header'>
        <div id="title">
            <img src={logoImg} alt="" />
            <h1>Food Ordering App</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart} >Cart ({totalCartItems})</Button>
            <Button textOnly onClick={showOrder} >view order history</Button>
        </nav>
    </header>
  )
}

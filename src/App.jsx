import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { fetchAvailableMeals } from "./http";
import { Meals } from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import { Cart } from "./components/Cart";
import { CheckOut } from "./components/CheckOut";
import { ViewOrders } from "./components/ViewOrders";
import { UpdateOrder } from "./components/UpdateOrder";






function App() {
 
   console.log("rendering...");
  
  return (
    <UserProgressContextProvider>
    <CartContextProvider>
       <Header/>
       <Meals/>
       <Cart/>
       <CheckOut/>
       <ViewOrders/>
      
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;

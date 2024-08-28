import { act, createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

const cartReducer =(state,action)=>{
  console.log(action)
  if(action.type === "ADD_ITEM"){
    const exisitingCartIndex = state.items.findIndex((item) => item.id  === action.item.id)
    const updatedItems = [...state.items]

    if(exisitingCartIndex > -1){
      const exisitingItem = state.items[exisitingCartIndex]
      const updatedItem = {
        ...exisitingItem,
         quantity: exisitingItem.quantity + 1
      }
      updatedItems[exisitingCartIndex] = updatedItem
    }
    else {
      updatedItems.push({...action.item, quantity : 1})
     
    }
    return {...state, items: updatedItems}
    

    

  }
  if(action.type === 'REMOVE_ITEM') {
    const exisitingCartIndex = state.items.findIndex((item) => item.id === action.id)
    const updatedItems = [...state.items]
    const exisitingItem = state.items[exisitingCartIndex]
    if(exisitingItem.quantity === 1) {
      updatedItems.splice(exisitingCartIndex,1)
    }
    else {
      const updatedItem = { ...exisitingItem, quantity: exisitingItem.quantity - 1}
      updatedItems[exisitingCartIndex] = updatedItem
    }
    return { ...state, items: updatedItems}
  }
   if (action.type === 'CLEAR_CART') {
     return { ...state, items:[]}

   }

  return state

}



export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
   console.log(cart)
  const addItem=(item) => {
    dispatchCartAction({type: "ADD_ITEM",item})
  }
  const removeItem =(id)=>{
    dispatchCartAction({type:"REMOVE_ITEM",id})
  }
  const clearCart =()=> {
    dispatchCartAction({type:"CLEAR_CART"})
  }
  const cartContextV = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };
  // console.log(cartContextV)
  return <CartContext.Provider value={cartContextV}>{children}</CartContext.Provider>;
};

export default CartContext;

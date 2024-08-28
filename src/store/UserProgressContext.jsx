import { createContext, useState } from "react";



const UserProgressContext = createContext({
    progress:'',
    showCart: () => {},
    hideCart: () => {},
    showCheckOut: () => {},
    hideCheckOut: () => {},
    showOrder: () => {},
    hideOrder: () => {},
})

export const UserProgressContextProvider =({children}) => {
    const [userProgress,setUserProgress] = useState('')
    const showCart=() => {
        setUserProgress('cart')

    }
    const hideCart=() => {
        setUserProgress('')

    }
    const showCheckOut=() => {
        setUserProgress('checkout')

    }
    const hideCheckOut=() => {
        setUserProgress('')

    }
    const showOrder=() => {
        setUserProgress('order')
    }
    const hideOrder=() => {
        setUserProgress('')
    }
    const userProgressCtx ={
        progress: userProgress,
        showCart,
        hideCart,
        showCheckOut,
        hideCheckOut,
        hideOrder,
        showOrder
    }
  

  return (  <UserProgressContext.Provider value={userProgressCtx}>
    {children}
  </UserProgressContext.Provider> )
}
export default UserProgressContext
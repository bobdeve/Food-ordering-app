import React, { useContext } from "react";
import { Modal } from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import { Button } from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const { items, removeItem, addItem } = useContext(CartContext);
  const { progress, hideCart, showCheckOut } = useContext(UserProgressContext);
  const cartTotal = items.reduce(
    (totalprice, item) => totalprice + item.quantity * item.price,
    0
  );

  const handleCloseCard = () => {
    hideCart();
  };
  const goToCheckOut = () => {
    showCheckOut();
  };

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleCloseCard : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <CartItem
              key={item.id}
              {...item}
              onDecrease={() => removeItem(item.id)}
              onIncrease={() => addItem(item)}
            />
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCard} textOnly>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={goToCheckOut}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

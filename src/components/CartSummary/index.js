// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

export default () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const {length} = cartList
      let cost = 0
      cartList.forEach(ele => {
        cost += ele.price * ele.quantity
      })

      return (
        <div className="summery-main-container">
          <div className="summery-display">
            <h1 className="summery-price">
              Order Total: <span className="highlite">{cost}/-</span>
            </h1>
            <p className="summery-quantity">{length} Items in cart</p>
            <button className="checkout-button" type="button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

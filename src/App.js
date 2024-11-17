import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(
      prevState => {
        const item = prevState.cartList.find(ele => ele.id === product.id)
        if (item === undefined) {
          return {cartList: [...prevState.cartList, product]}
        }
        const quantity = product.quantity + item.quantity
        return {
          cartList: [
            ...prevState.cartList.filter(ele => ele.id !== product.id),
            {...product, quantity},
          ],
        }
      },
      //   TODO: Update the code here to implement addCartItem
    )
  }

  removeAll = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(pv => {
      const item = pv.cartList.find(ele => ele.id === id)
      // console.log('item:', item, typeof item.quantity)
      return {
        cartList: [
          ...pv.cartList.filter(ele => ele.id !== id),
          {...item, quantity: item.quantity + 1},
        ],
      }
    })
  }

  decrementCartItemQuantity = id => {
    this.setState(pv => {
      const item = pv.cartList.find(ele => ele.id === id)
      return {
        cartList: [
          ...pv.cartList.filter(ele => ele.id !== id),
          {...item, quantity: item.quantity - 1},
        ],
      }
    })
  }

  removeCartItem = id => {
    this.setState(pv => ({cartList: pv.cartList.filter(ele => ele.id !== id)}))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAll,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

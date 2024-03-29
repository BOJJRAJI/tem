import {Component} from 'react'
import Cookies from 'js-cookie'
import CartItem from '../CartItem'

import './index.css'

class CartListView extends Component {
  state = {cartList: []}

  componentDidMount() {
    this.getCartItems()
  }

  getCartItems = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
    const response = await fetch(
      'https://main-backend-1.onrender.com/user/cartitems',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      this.setState({cartList: data})
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <ul className="cart-list">
        {cartList.map(eachCartItem => (
          <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
        ))}
      </ul>
    )
  }
}

export default CartListView

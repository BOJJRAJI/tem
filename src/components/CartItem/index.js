import {Component} from 'react'
import {Link} from 'react-router-dom'
import {message} from 'antd'
import Cookies from 'js-cookie'

import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class CartItem extends Component {
  state = {showQuantity: 0, id: 0, cartItem: {}}

  componentDidMount() {
    const {cartItemDetails} = this.props
    const convertedData = {
      id: cartItemDetails.id,
      title: cartItemDetails.title,
      brand: cartItemDetails.brand,
      price: cartItemDetails.price,
      rating: cartItemDetails.rating,
      totalReviews: cartItemDetails.totalReviews,
      description: cartItemDetails.description,
      availability: cartItemDetails.availability,
      quantity: cartItemDetails.quantity,
      imageUrl: cartItemDetails.image_url,
    }
    this.setState({
      showQuantity: cartItemDetails.quantity,
      id: cartItemDetails.id,
      cartItem: convertedData,
    })
  }

  onRemoveCartItem = async () => {
    const {id} = this.state
    const apiUrl = `https://main-backend-1.onrender.com/itemdelete/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const config = {
        className: 'pop-messages',
        content: data,
      }
      setTimeout(() => {
        message.success(config)
      }, 3000)
      window.location.reload(false)
    } else {
      const config = {
        className: 'pop-messages',
        content: 'Unable To Delete',
      }
      setTimeout(() => {
        message.error(config)
      }, 3000)
    }
  }

  render() {
    const {cartItem, showQuantity} = this.state

    const {id, title, brand, quantity, price, imageUrl} = cartItem

    return (
      <li className="cart-item">
        <Link to={`/cart/item/${id}`} className="link-item-cart">
          <img className="cart-product-image" src={imageUrl} alt={title} />
        </Link>
        <div className="cart-item-details-container">
          <Link to={`/cart/item/${id}`} className="link-item-cart">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
          </Link>
          <div className="cart-quantity-container">
            <p className="cart-quantity">Quantity: {showQuantity}</p>
          </div>

          <div className="total-price-remove-container">
            <p className="cart-total-price">Rs {price * quantity}/-</p>
            <button
              className="remove-button"
              type="button"
              onClick={this.onRemoveCartItem}
            >
              Remove
            </button>
          </div>
        </div>
        <button
          className="delete-button"
          type="button"
          onClick={this.onRemoveCartItem}
        >
          {' '}
          <AiFillCloseCircle color="#616E7C" size={20} />
        </button>
      </li>
    )
  }
}

export default CartItem

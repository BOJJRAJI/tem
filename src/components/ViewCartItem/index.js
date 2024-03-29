import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {message} from 'antd'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ViewCartItem extends Component {
  state = {
    cartItemData: {},
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getCartItemData()
  }

  getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  getCartItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://main-backend-1.onrender.com/cart/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      this.setState({
        cartItemData: updatedData,
        quantity: fetchedData.quantity,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onUpdateCartItem = async () => {
    const {cartItemData, quantity} = this.state
    const {id} = cartItemData
    const quantityData = {
      quantity,
    }
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://main-backend-1.onrender.com/cartupdate/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(quantityData),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const config = {
        className: 'pop-messages',
        content: data,
      }
      setTimeout(() => {
        message.success(config)
      }, 3000)
    } else {
      const config = {
        className: 'pop-messages',
        content: data,
      }
      setTimeout(() => {
        message.error(config)
      }, 3000)
    }
  }

  renderProductDetailsView = () => {
    const {cartItemData, quantity} = this.state
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = cartItemData
    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value">{availability}</p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">{brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={this.onDecrementQuantity}
                data-testid="minus"
              >
                {' '}
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={this.onIncrementQuantity}
                data-testid="plus"
              >
                {' '}
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <Link to="/cart">
              <button
                type="button"
                className="button add-to-cart-btn"
                onClick={this.onUpdateCartItem}
              >
                UPDATE TO CART
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default ViewCartItem

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {message} from 'antd'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Cart extends Component {
  state = {cartList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCartItems()
  }

  getCartItems = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
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
      if (data.length === 0) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
          cartList: [],
        })
      } else {
        this.setState({cartList: data, apiStatus: apiStatusConstants.success})
      }
    } else {
      this.setState({cartList: []})
      const config = {
        className: 'pop-messages',
        content: 'Unable Fetch Cart Data',
      }
      setTimeout(() => {
        message.success(config)
      }, 3000)
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => <EmptyCartView />

  removeAllCartItems = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }
    const response = await fetch(
      'https://main-backend-1.onrender.com/emptycart',
      options,
    )

    if (response.ok === true) {
      const data = await response.json()
      const config = {
        className: 'pop-messages',
        content: data,
      }
      setTimeout(() => {
        message.success(config)
      }, 3000)
      window.location.reload(false)

      this.setState({cartList: []})
    } else {
      const config = {
        className: 'pop-messages',
        content: 'Unable To Make Cart Empty',
      }
      setTimeout(() => {
        message.error(config)
      }, 3000)
    }
  }

  renderProductDetailsView = () => {
    const {cartList} = this.state
    let total = 0
    cartList.forEach(item => {
      const p = item.price * item.quantity
      total += p
    })
    return (
      <div className="cart-content-container">
        <h1 className="cart-heading">My Cart</h1>
        <div className="remove-all-container">
          <button
            className="remove-all-button"
            type="button"
            onClick={this.removeAllCartItems}
            data-testid="remove"
          >
            Remove All
          </button>
        </div>
        <CartListView />
        {/* : Add your code for Cart Summary here */}
        <div className="remove-all-container">
          <div className="cart-summery-container">
            <h1 className="summery-heading">
              Order Total: <span className="summery-span">Rs {total}/-</span>
            </h1>
            <p className="summary-para">{cartList.length} items in cart</p>
            <button className="checkout-button" type="button">
              Checkout
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderAllProducts = () => {
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
        <div className="cart-container">{this.renderAllProducts()}</div>
      </>
    )
  }
}

export default Cart

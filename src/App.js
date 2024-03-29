import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Products from './components/Products'
import Start from './components/Start'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import ProductItemDetails from './components/ProductItemDetails'
import ViewCartItem from './components/ViewCartItem'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Start} />
      <Route exact path="/account/login" component={Login} />
      <Route exact path="/account/register" component={Register} />
      <ProtectedRoute exact path="/home" component={Home} />
      <ProtectedRoute exact path="/products" component={Products} />
      <ProtectedRoute
        exact
        path="/products/:id"
        component={ProductItemDetails}
      />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/cart/item/:id" component={ViewCartItem} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App

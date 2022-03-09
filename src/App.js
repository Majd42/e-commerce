import React, {useState, useEffect} from 'react'
import Products from './components/Products/Products'
import Navbar from './components/Navbar/Navbar'
import { commerce } from './lib/commerce'
import Cart from './components/Cart/Cart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Checkout from './components/CheckoutForm/Checkout/Checkout'


const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('')

const fetchProducts =async()=>{
  const { data } = await commerce.products.list();
  
  setProducts(data);
}

const fetchCart = async() => {
  setCart(await commerce.cart.retrieve());
}

const handleAddToCart =async (productId, quantity)=>{
  const item = await commerce.cart.add(productId,quantity);
  setCart(item.cart);
  console.log(cart)
}

const handleUpdateCart = async (productId, quantity) => {
  const {cart} =await commerce.cart.update(productId, { quantity })

  setCart(cart);
}

const handleRemoveFromCart = async (productId) => {
  const {cart} =await commerce.cart.remove(productId)

  setCart(cart);
}

const handleEmptyCart = async () => {
  const {cart} = await commerce.cart.empty();


  setCart(cart);
}
 
const refreshCart = async() =>{
  const newCart = await commerce.cart.refresh();
  setCart(newCart)
}


const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
  try {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)

    setOrder(incomingOrder)
    refreshCart();
  } catch (error) {
    setErrorMessage(error.data.error.errorMessage)
  }
}




useEffect(()=>{
  fetchProducts();
  fetchCart();
},[])

const cartCount = cart.total_items;
  return (
    <BrowserRouter>
      <div>
        <Navbar cartTotalItems={cartCount}/>
        <Routes>
          <Route path='/' element={<Products  products={products} onAddToCart={handleAddToCart} />} />
          <Route path='/cart' element={<Cart cart={cart} 
            handleUpdateCart={handleUpdateCart} 
            handleEmptyCart ={handleEmptyCart}
            handleRemoveFromCart ={handleRemoveFromCart}
          />} />
          <Route path='/checkout' element={<Checkout order={order} onCaptureCheckout = {handleCaptureCheckout} error={errorMessage} cart={cart}/>} />  
        </Routes>
        
      </div>
    </BrowserRouter>
  )
}

export default App

        
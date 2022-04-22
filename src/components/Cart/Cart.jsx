import React from 'react'
import {Grid, Typography, Button, Container} from '@mui/material'
import './styles.css'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'
const Cart = ({cart ,handleUpdateCart, handleRemoveFromCart, handleEmptyCart}) => {

  const EmptyCart = () => {
    return (
      <Typography  variant='subtitle1'> 
        Your Cart is Empty,<Link to='/'> Start Adding some</Link> Items!
      </Typography>
    )
  }
  
  const FilledCart = () => {
    return ( 
      <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item  key={item.id} xs={12} sm={6} md={4}>
            <CartItem item={item} handleRemoveFromCart ={handleRemoveFromCart} handleUpdateCart={handleUpdateCart} />
          </Grid>
        ))}
      </Grid>
      <div className='cart-details'>
          <Typography variant='h6'>
            Total Price : {cart.subtotal.formatted_with_symbol  }
          </Typography>
          <div className='interact'>
            <Button component={Link} to='/checkout' variant='contained' color='secondary'>
              Checkout
            </Button>
            <Button  variant='outlined' color='error'  onClick={() =>handleEmptyCart()}> 
              Empty Cart
            </Button>
          </div>
      </div>
      </>
      
     
    )
  }
if (!cart.line_items) return ('Loading...')
  return (
    <Container spacing={3}>
      <div className='toolbar'/>
      <Typography variant='h4' sx={{mb:2, mt:2}} className='title' >Your Shipping Cart</Typography>
      {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}

      
    </Container>
  )
}

export default Cart
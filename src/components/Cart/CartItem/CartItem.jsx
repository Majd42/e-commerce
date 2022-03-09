import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import './styles.css'



const CartItem = ({item, handleUpdateCart, handleRemoveFromCart}) => {

  
    
  return (
    <Card>
        <CardMedia component='img' image={item.image.url} alt={item.name} className='media'/>
        <CardContent className='card-content'>
            <Typography variant='h4'>{item.name}</Typography>
            <Typography variant='h5'>{item.price.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions className='card-actions'>
            <div className='buttons' >
                <Button type="button" size="small" onClick={()=>handleUpdateCart(item.id,item.quantity-1)} >_</Button>
                <Typography >{item.quantity}</Typography>
                <Button type="button" size="small" onClick={() => handleUpdateCart(item.id,item.quantity+1)} >+</Button>
            </div>
            <Button variant='contained' color='secondary' type='button' onClick={()=>handleRemoveFromCart(item.id)}>Remove</Button>
        </CardActions>
    </Card>
  )
}

export default CartItem
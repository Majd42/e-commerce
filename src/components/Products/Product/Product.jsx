import React from 'react'
import {Card, CardMedia, CardActions, Typography, CardContent, IconButton } from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import './styles.css'


const Product = ({product, onAddToCart}) => {
    
    // return(
    //     <CardMedia component='img' image={product.image.url} height='194' />
    // )
  
  return (
    <Card className='root'>
        <CardMedia component='img' className='media' image={product.image.url} title={product.name} height='194' />
        <CardContent>
            <div className='card-content'>
                <Typography variant='h5' gutterBottom>
                    {product.name}
                </Typography> 
                <Typography variant='h5'>
                    {product.price.formatted_with_symbol}
                </Typography> 
            </div>
            <Typography dangerouslySetInnerHTML ={{__html:product.description}} variant='body2' color="textSecondary"/>
                
        </CardContent>
        <CardActions disableSpacing className='card-actions'>
            <IconButton onClick={()=> onAddToCart(product.id, 1)}>
                <AddShoppingCart/>
            </IconButton>
        </CardActions>
    </Card>
  )
}   

export default Product
import React from 'react'
import Product from './Product/Product';
import { Grid, Typography } from '@mui/material'
import './styles.css'


const Products =({products, onAddToCart}) => {
   return(
    <main className='content'> 
        <div className='toolbar'/>
        <Grid container justifyContent='center' spacing={4}>
            {products.map((product)=>(
                <Grid item key={product.id} xs={12} md={4} lg={3} sm={6} >
                    <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
            ))}
        </Grid>
    
    </main>     
   )
}

export default Products
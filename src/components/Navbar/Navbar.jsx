import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Typography, Menu ,MenuItem } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import logo from '../../assets/commerce.png'
import './styles.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Navbar = ({cartTotalItems}) => {
    const location = useLocation();
  return (
    <>
    <p>Hello</p>
    <AppBar position='fixed' className='appbar' color='inherit'  >
        <Toolbar>
            <Typography component={Link} to='/' variant='h6' className='title' color='inherit'>
                <img src={logo} alt ='someImage' height='25px' className='image '/>
                Commerce.js
            </Typography>
            <div className='grow'/>
            <div className='button'>
                {location.pathname==='/' &&
                <IconButton component={Link} to='/cart' aria-label='show items' color='inherit'>
                    <Badge badgeContent={cartTotalItems} color='error'>
                        <ShoppingCart/>
                    </Badge>
                </IconButton>}
            </div>
             
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Navbar
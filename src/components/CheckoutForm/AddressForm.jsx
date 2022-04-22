import { Token } from '@mui/icons-material'
import { Button, Grid, InputLabel, MenuItem, TextField, Typography, Select, CircularProgress } from '@mui/material'
import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { commerce } from '../../lib/commerce'

const AddressForm = ({next, checkoutToken}) => {
  const [data, setData] = useState({
    firstName : '',
    lastName : '',
    address : '',
    email : '', 
    city : '',
    zip : '',
  })

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingDomistics, setShippingDomistics] = useState([]);
  const [shippingDomistic, setShippingDomistic] = useState('');

 
  
  const fetchShippingCountries = async(checkoutTokenId) =>{
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
    
    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }


  const fetchShippingSubdivisions = async(country) => {
    const {subdivisions} = await commerce.services.localeListSubdivisions(country)

    console.log(subdivisions)
    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingOptions = async(checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})

    setShippingDomistics(options)
    setShippingDomistic(options[0])
  }

  useEffect(()=> {
    fetchShippingCountries(checkoutToken.id)
    
  }, [])

  useEffect(()=> {
    if (shippingCountry) fetchShippingSubdivisions(shippingCountry)
  },[shippingCountry])


  useEffect(()=>{
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id,shippingCountry, shippingSubdivision)
  },[shippingSubdivision])

  const handleChange = (prop) => (e) => {
    setData({...data, [prop] : e.target.value})
    
  }



  
    
    const countreis = Object.entries(shippingCountries).map(([code, name]) => ({id : code, label: name}))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id : code, label: name}))
    const  options = shippingDomistics.map((sO)=>({id: sO.id , label : `${sO.description} - (${sO.price.formatted_with_symbol})`}))

    

  return (

    <>
    <div />
    <Typography variant='h6' textAlign='center' sx={{mt:2 , mb:2}} gutterBottom>Shipping Address</Typography>
      <form onSubmit={() =>{next({...data,shippingCountry, shippingSubdivision, shippingDomistic})}}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} >
            <TextField name='firstName' fullWidth variant='standard' required label='First Name' onChange={handleChange('firstName')}/>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField name= 'lastname' fullWidth  variant='standard' required label='Last Name' onChange={handleChange('lastName')}/>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField name='address' fullWidth variant='standard' required label='Address' onChange={handleChange('address')}/>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField name='email' fullWidth variant='standard' required label='Email' onChange={handleChange('email')}/>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField name='city' fullWidth variant='standard' required label='City' onChange={handleChange('city')}/>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField name='zip' fullWidth variant='standard' required label='ZIP/Protal Code' onChange={handleChange('zip')}/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Countries</InputLabel>
            <Select value={shippingCountry } fullWidth onChange={(e) =>setShippingCountry(e.target.value)}>
              {countreis.map((country) => (

              <MenuItem key={country.id} value={country.id}> 
                {country.label}
              </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Subdivisions</InputLabel>
            <Select value={shippingSubdivision } fullWidth onChange={(e) =>setShippingSubdivision(e.target.value)}>
              {subdivisions.map((subdivision) => (

              <MenuItem key={subdivision.id} value={subdivision.id}> 
                {subdivision.label}
              </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Options</InputLabel>
            <Select value={shippingDomistic } fullWidth onChange={(e) =>setShippingDomistic(e.target.value)}>
              {options.map((option) => (

              <MenuItem key={option.id} value={option.id}> 
                {option.label}
              </MenuItem>
              ))}
            </Select>
          </Grid>

        </Grid>
        
      <div className='btns'>
        <Button component={Link} to='/cart' variant="outlined"  >
          Back To Cart
        </Button>
        <Button variant="contained" type='submit'>
          Next
        </Button>
      </div>
      </form>
    </>
  )
}

export default AddressForm
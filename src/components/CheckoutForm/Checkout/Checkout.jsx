import { Button, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './styles.css'
import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'
import { commerce } from '../../../lib/commerce'

const steps = ['Shipping Address' , 'Payment Form']

const Checkout = ( {cart, error, onCaptureCheckout, order }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken , setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})

    const Confirmation = () => {
        return(
            <Button>Confirm</Button>
        )
        
    }

    const nextStep = () =>{setActiveStep((prevActiveStep) => prevActiveStep+1)}
    const backStep = () =>{setActiveStep((prevActiveStep) => prevActiveStep-1)}
    
    const next = (data) => {
        setShippingData(data)
        nextStep();
        
    }
    
        useEffect(() =>{
        const generateToken = async()=>{
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type : 'cart'})
                
                setCheckoutToken(token)
            } catch (error) {
                
            }
        }
        generateToken();
    } ,[cart])

    const Form = ()=> activeStep===0 ? <AddressForm next={next} checkoutToken={checkoutToken}/> : <PaymentForm nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} backStep={backStep} checkoutToken={checkoutToken} shippingData= {shippingData}/>

    
 
  return (
    <> 
    <div className='toolbar' />
    <main className='layout'>
        <Paper className='paper' >

            <Typography variant='h4' textAlign='center'>Checkout</Typography>
           <Stepper activeStep={activeStep}>
               {steps.map((step) => (
                   <Step key={step}><StepLabel>{step}</StepLabel></Step>
               ))}
           </Stepper>
           {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
        </Paper>
    </main>
    </>
  )
}

export default Checkout
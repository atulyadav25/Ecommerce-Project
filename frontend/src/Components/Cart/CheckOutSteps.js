import React from 'react'
import { Stepper, Step } from 'react-form-stepper';
import { Typography } from '@mui/material';
import './CheckOutSteps.css'

const CheckOutSteps = ({activeStep}) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: "Icon"
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: "Icon"
        },
        {
            label: <Typography>Payment</Typography>,
            icon: "Icon"
        },
    ]

    const stepStyles = {
        boxSizing: "border-box"
      };


  return (
    <>
        <Stepper activeStep={activeStep} styleConfig={stepStyles}>
            {steps && steps.map((item,index)=>{
                return <Step key={index} label={item.label} />
            })}
        </Stepper>
    </>
  )
}

export default CheckOutSteps
import React from 'react'
import { Step, Stepper } from 'react-form-stepper';

const CustomStepper = () => {
    return (
        <div>
            <Stepper connectorStyleConfig={{ completedColor: 'green', activeColor: 'green', }}
                styleConfig={{ activeBgColor: 'green', size: '1.5rem', completedBgColor: 'green' }}
                activeStep={0}>
                <Step label="Order placed" />
                <Step label="Ready to dispatch" />
                <Step label="Out for delivery" />
                <Step label="Delivered" />
            </Stepper>
        </div>
    )
}

export default CustomStepper
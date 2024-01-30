"use client";
import { updateProductQuantity } from '@/services/features/cartSlice'
import './CountButton.scss'
import React from 'react';
import { useDispatch } from 'react-redux';


export default function CountButton({ data }) {

    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     setCount(data?.quantity);
    // }, [data])

    const updateCount = (operator) => {
        const newData = {
            productId: data?.productId,
            newQuantity: parseInt(data?.quantity) + 1,
            operator: operator
        }
        dispatch(updateProductQuantity({ data: newData }))
    }

    return (
        <div className='countbtn'>
            <button onClick={() => updateCount('reduce')}>-</button>
            <input type="text" value={data?.quantity} readOnly />
            <button onClick={() => updateCount('add')}>+</button>
        </div>
    )
}
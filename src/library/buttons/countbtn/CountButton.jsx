"use client";
import { updateProductQuantity } from '@/services/features/cartSlice'
import './CountButton.scss'
import React from 'react';
import { useDispatch } from 'react-redux';


export default function CountButton({ count, updateCount }) {

    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     setCount(data?.quantity);
    // }, [data])

   
    return (
        <div className='countbtn'>
            <button onClick={() => updateCount('reduce')}>-</button>
            <input type="text" value={count} readOnly />
            <button onClick={() => updateCount('add')}>+</button>
        </div>
    )
}
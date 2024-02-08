"use client";
import { updateProductQuantity } from '@/services/features/cartSlice'
import './CountButton.scss'
import React from 'react';
import { useDispatch } from 'react-redux';


export default function CountButton({ count, updateCount, setProductQuantity, minQty }) {

    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     setCount(data?.quantity);
    // }, [data])


    return (
        <div className='countbtn'>
            <button onClick={() => updateCount('reduce')}>-</button>
            <input type="text" value={count} min={minQty} max={50} maxLength={2} onChange={(e) => {
                const value = e.target.value;
                if (!isNaN(value) && value >= 0 && value <= 50) {
                    setProductQuantity(isNaN(parseInt(value)) ? '' : parseInt(value));
                }
            }} />
            <button onClick={() => updateCount('add')}>+</button>
        </div>
    )
}
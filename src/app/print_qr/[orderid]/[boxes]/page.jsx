'use client';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import './qc.scss';
import { Button } from '@nextui-org/react';

export default function printQr({params}) {

  const [text, setText] = useState('weew');
  const items = [];
  for (let i = 1; i <= params.boxes; i++) {
      items.push(i);
  }

  const print = () => {
    window.print();
  }


  return (
        <div className="qr-tab-wrapper">
            <div className='qr_button'>
                 <Button color='success' onClick={() => print()}>Print</Button>
            </div>
            <div>
              {
                items.map((value) => {
                    return (
                      <div className='qr_item'>
                        <QRCode value={params.orderid} />
                        <span className='order_text'>{params.orderid} </span><span className='qr_text'>( {value} / {items.length} )</span>
                      </div>
                    )

                })
              }
            </div>
      </div>
  )
}
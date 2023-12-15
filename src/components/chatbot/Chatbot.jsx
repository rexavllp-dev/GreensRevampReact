"use client";

import { ChatIcon } from '@/assets/icons'
import React, { useRef } from 'react'
import './Chatbot.scss'
import Image from 'next/image';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const Chatbot = () => {
    const tawkMessengerRef = useRef();

    const handleMinimize = () => {
        tawkMessengerRef.current.minimize();
    };

    return (
            <div className='chatbot'>
            <TawkMessengerReact
                propertyId={process.env.NEXT_PUBLIC_CHAT_PROPERTY_ID}
                widgetId={process.env.NEXT_PUBLIC_CHAT_WIDGET_ID}
                ref={tawkMessengerRef} />
            </div>
    )
}

export default Chatbot
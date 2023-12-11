import { ChatIcon } from '@/assets/icons'
import React from 'react'
import './Chatbot.scss'
import Image from 'next/image';

const Chatbot = () => {
    return (
        <div className='chatbot'>
            <Image src={ChatIcon} width={34} height={34} />
        </div>
    )
}

export default Chatbot
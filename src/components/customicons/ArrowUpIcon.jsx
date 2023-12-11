import React from 'react'

const ArrowUpIcon = ({ color, width, height }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={color ? color : currentColor} class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
        </svg>

    )
}

export default ArrowUpIcon
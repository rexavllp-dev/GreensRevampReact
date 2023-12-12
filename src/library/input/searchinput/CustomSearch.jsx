"use client";
import React, { useEffect, useRef } from 'react'
import "./CustomSearch.scss"
import Image from 'next/image'
import { SearchIcon } from '@/assets/icons'

const CustomSearch = ({
  value, onChange, name, placeholder, label, fullWidth, isInput, onKeyUp, onSearchClick
}) => {
  const searchRef = useRef();
  useEffect(() => {
    searchRef?.current?.focus();
  }, [])


  return (
    <>
      {
        fullWidth ?
          <div className='customsearch-wrapper'>
            <div className="customsearch">
              <div className={'searchicon'} onClick={onSearchClick}>
                <Image src={SearchIcon} />
              </div>

              <input
                name={name}
                ref={searchRef}
                type="text"
                value={value}
                onKeyUp={onKeyUp}
                onChange={onChange}
                className={'customsearch'}
                placeholder={placeholder}

              />
            </div>
          </div>
          :
          <div className="customsearch-fullwidth-wrapper">
            <div className="customsearch-fullwidth" style={{ justifyContent: value.length ? 'flex-start' : 'center' }}>
              <div className={'searchicon'}>
                <Image src={SearchIcon} />
              </div>
              <span>
                {value.length ? value : placeholder}
              </span>
            </div>
          </div>
      }
    </>

  )
}

export default CustomSearch
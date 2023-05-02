'use client';

import React, { useState } from 'react';
import { TiThList } from 'react-icons/ti';

export const InteractWithList = () => {

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <span className='flex items-center cursor-pointer text-2xl'>
      <TiThList onClick={() => setShowDropdown(!showDropdown)} />


    </span>
  );
};


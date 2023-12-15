'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useFormStatus as useFormStatus } from 'react-dom';

function SearchButton() {
    const { pending } = useFormStatus();

  return (
    <button className=' bg-sky-500 hover:bg-sky-700 text-slate-100 font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-lg p-2'>
        {pending && 'Searching...'}
        {!pending && <MagnifyingGlassIcon className='w-5 h-5'/>}
    </button>
  );
}

export default SearchButton;
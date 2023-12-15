'use client'

import { useFormStatus as useFormStatus } from 'react-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function SearchButton() {
    const { pending } = useFormStatus();

  return (
    <button className=' bg-sky-500 hover:bg-sky-700 text-slate-100 font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-lg p-2'>
        {/* Change button to say searching when the loading state is triggered */}
        {pending && 'Searching...'}
        {!pending && <MagnifyingGlassIcon className='w-5 h-5'/>}
    </button>
  );
}

export default SearchButton;
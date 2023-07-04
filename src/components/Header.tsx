'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SearchButton from './SearchButton'
import { SearchSelect, SearchSelectItem, Select, SelectItem } from '@tremor/react'
import Avatar from 'react-avatar'
import { useRouter } from 'next/navigation'


const SORT_BY_MAP = {
    r: 'Default',
    rv: 'By Review',
    p: 'Price',
    pd: 'Price (desc)',
};

function Header() {
    const [pages, setPages] = useState('');
    const [sortBy, setSortBy] = useState('r');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const router = useRouter();



  return (
    <header className='flex flex-col items-center md:flex-row md:items-start md:space-x-6 px-2 pt-10 pb-5 md:p-10 md:pb-5'>
        <Link href='/'>
            <Image
              src="https://links.papareact.com/208"
              alt="Google Shopping Logo"
              width={150}
              height={150}
              className='object-contain mr-10'
            />
        </Link>

        <div className='w-full md:max-w-2xl'>

            {/* Form  */}
            <form action={formData => {
                    const searchTerm = formData.get('searchTerm');

                    if (!formData.get('searchTerm')) return;

                    const params = new URLSearchParams();

                    if (pages) params.set('pages', pages.toString());
                    if (sortBy) params.set('sort_by', sortBy.toString());
                    if (minPrice) params.set('min_price', minPrice.toString());
                    if (maxPrice) params.set('max_price', maxPrice.toString());

                    router.push(`/search/${searchTerm}?${params.toString()}`);
                }}
            >
                <div className='flex items-center gap-2 w-full '>
                    <div className='flex items-center space-x-2 shadow-lg rounded-full bg-white border-0 px-6 py-2 flex-1'>
                        <MagnifyingGlassIcon className='w-5 h-5 text-slate-500'/>
                        <input type="text" name='searchTerm' placeholder='Search...' className='outline-none flex-1 bg-none rounded-3xl '/>
                    </div>

                    {/* Search Button  */}
                    <SearchButton />
                </div>

                <div className='grid grid-cols-2 gap-2 p-4 md:grid-cols-4 max-w-lg md:max-w-none mx-auto items-center'>
                    {/* # of Pages  */}
                    <SearchSelect 
                        onValueChange={value => setPages(value)}
                        className='min-w-4' 
                        placeholder='# of pages'
                    >
                        {[...Array(100)].map((_, i) => (
                            <SearchSelectItem key={i} value={(i + 1).toString()}>
                                {(i + 1).toString()} pages
                            </SearchSelectItem>
                        ))}
                    </SearchSelect>

                    {/* Sort By  */}
                    <Select
                        onValueChange={value => setSortBy(value)}
                        className='min-w-4'
                        placeholder='Sort By...'
                    >
                        {Object.entries(SORT_BY_MAP).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                                {value}
                            </SelectItem>
                        ))}
                    </Select>

                    {/* Min Price  */}
                    <SearchSelect 
                        onValueChange={value => setMinPrice(value)}
                        className='min-w-4' 
                        placeholder='Min Price...'
                    >
                        {['', '100', '250', '500', '750', '1000'].map((_, i) => (
                            <SearchSelectItem key={i} value={_.toString()}>
                                {i === 0 ? 'No Minimum' : `$${_.toString()}`}
                            </SearchSelectItem>
                        ))}
                    </SearchSelect>

                    {/* Max Price  */}
                    <SearchSelect 
                        onValueChange={value => setMaxPrice(value)}
                        className='min-w-4' 
                        placeholder='Max Price...'
                    >
                        {['', '100', '250', '500', '750', '1000'].map((_, i) => (
                            <SearchSelectItem key={i} value={_.toString()}>
                                {i === 0 ? 'No Maximum' : `$${_.toString()}`}
                            </SearchSelectItem>
                        ))}
                    </SearchSelect>

                </div>

            </form>

        </div>

        <div className='hidden lg:flex flex-1 justify-end bg-none '>
            {/* Avatar  */}
            <Avatar name='Digitl Alchemyst' round size='50' />
        </div>
    </header>
  );
}

export default Header;
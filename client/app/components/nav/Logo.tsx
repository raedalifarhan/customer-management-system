"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {

    return (
        <Link href={'/'} className='cursor-pointer text-4xl' >
            CMS
        </Link>
    )
}

export default Logo
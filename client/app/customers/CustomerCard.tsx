

import Link from 'next/link';
import React from 'react'
import { IoLogoWhatsapp } from "react-icons/io5";
import { AiOutlinePhone } from "react-icons/ai";
import { FaEdit, FaEye  } from "react-icons/fa";
import { CustomerType } from '@/types/customersTypes';

interface Props {
    customer: CustomerType;
}

const CustomerCard = ({ customer }: Props) => {
    return (
        <div className='relative'>
            <div className='flex flex-col items-left gap-5 p-2 my-2 text-slate-500 rounded-sm items-center justify-between border-x-2 border-slate-200'>
                <strong>{customer.firstName} {customer.lastName}</strong>
                <strong>{customer.email} </strong>
                <strong>{customer.address} </strong>
            </div>
            <div className='w-full aspect-w-16 aspect-h-2 bg-gray-200 aspect-video rounded-sm overflow-hidden'>
                <div className='flex justify-between gap-2 items-center px-5'>
                    <Link href={`/customers/update/${customer.customerId}`}><FaEdit size={20}  /></Link>
                    <Link href={`/customers/details/${customer.customerId}`}><FaEye  size={20} /></Link>
                    <Link href={`https://wa.me/${customer.phone}`}><IoLogoWhatsapp size={20}  /></Link>
                    <Link href={`tel:${customer.phone}`}><AiOutlinePhone size={20} /></Link>
                </div>
            </div>
        </div>
    )
}

export default CustomerCard
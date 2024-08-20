'use client'

import { CustomerType } from '@/types/customersTypes';
import { useEffect, useState } from 'react';
import agent from '../api/agent';
import LoadingComponent from '@/app/components/LoadingComponent';
import Link from 'next/link';
import { FaAddressCard } from "react-icons/fa";
import toast from 'react-hot-toast';
import CustomerCard from './CustomerCard';
import AppPagination from '../components/customer/AppPagination';

const CustomerListings = () => {

    const [customers, setCustomers] = useState<CustomerType[]>();
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 0, totalItems: 0 });
    const [pageSize, setPageSize] = useState(10);

    const onPageChange = (page: number) => {
        setPagination({ ...pagination, currentPage: page })
    }

    const axiosParams = () => {
        const params = new URLSearchParams()

        params.append('pageNumber', pagination?.currentPage.toString())
        params.append('pageSize', pageSize?.toString())

        return params
    }

    useEffect(() => {
        const params = axiosParams();

        agent.Customers.list(params)
            .then(res => {
                setCustomers(res.data);
                setPagination({ currentPage: res.currentPage, totalPages: res.totalPages, totalItems: res.totalItems });
            }).catch((error) => {
                toast.error(`${error}`)
            })
    }, [pagination?.currentPage, pageSize])

    if (!customers) return <LoadingComponent label='Loading...' />

    const handleSetPageSize = (size: number) => {
        setPageSize(size)
    }

    const reset = () => {
        setPageSize(12)
        setPagination({ ...pagination, currentPage: 1 })
    }

    return (
        <>
            <div className='flex items-center gap-5 justify-between mb-7'>
                <Link href={'/customers/create'}
                    className="
                        flex items-center justify-between gap-2
                        rounded-md bg-orange-800 hover:bg-slate-900 text-slate-300
                        py-2 px-4 text-base">
                    <FaAddressCard />
                    <strong>Add Customer</strong>
                </Link>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>

                {customers && customers.map(customer => (
                    <CustomerCard customer={customer} key={customer.customerId} />
                ))}
            </div>
            <div className='flex justify-center mt-4'>

                <AppPagination pageChanged={onPageChange}
                    pageCount={pagination!.totalPages} pageNumber={pagination!.currentPage} />
            </div>
        </>
    )
}

export default CustomerListings
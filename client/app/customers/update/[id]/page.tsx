'use client'

import React, { useEffect, useState } from 'react';
import agent from '@/app/api/agent';
import Headings from '@/app/components/customer/Headings';
import CustomerForm from '../../CustomerForm';
import { CustomerType } from '@/types/customersTypes';

const Update = ({ params }: { params: { id: number } }) => {

  const [customer, setCustomer] = useState<CustomerType>();

  useEffect(() => {
    agent.Customers.details(params.id).then(res => {
      
      setCustomer(res);
    });
  }, [params.id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div className='mx-auto max-w-[75%] rounded-lg shadow-lg p-10 bg-white'>
      <Headings title='Update Company Information' subtitle='Update company details as needed' />
      <CustomerForm customer={customer} />
    </div>
  );
}

export default Update;

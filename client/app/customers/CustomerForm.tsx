'use client'

import Input from '@/app/components/Input';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import agent from '../api/agent';
import { CustomerType } from '@/types/customersTypes';

interface Props {
  customer?: CustomerType;
}

const CustomerForm = ({ customer }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [responseError, setResponseError] = useState<{ [key: string]: string[] }>({});

  const {
    control, handleSubmit, setFocus, reset,
    formState: { isSubmitting, isValid }
  } = useForm({
    mode: 'onTouched'
  });

  useEffect(() => {
    if (customer) {
      const {
        firstName, lastName, address, phone, email
      } = customer;

      reset({
        firstName, lastName, address, phone, email
      });
    }

    setFocus('firstName');
  }, [setFocus, customer, reset]);

  const onSubmit = async (data: FieldValues) => {
    try {
      let id;
      let res;

      // Save customer
      if (pathname === '/customers/create') {
        res = await agent.Customers.create(data);
        id = res.customerId;
        toast.success('Customer added successfully...');
      } else {
        res = await agent.Customers.update(customer!.customerId, data);
        id = customer!.customerId;
        toast.success('Customer information updated successfully...');
      }

      // Redirect
      router.push(`/customers/details/${id}`);

    } catch (error: any) {
      if (error?.response?.data) {
        const { errors } = error.response.data;
        setResponseError(errors || {});
        toast.error('Failed to save customer data.');
      } else {
        toast.error('An error occurred while submitting the data.');
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <>
      {Object.keys(responseError).length > 0 && (
        <ul className='my-5 p-5 bg-red-100 text-red-700 border-red-800 rounded-md'>
          {Object.keys(responseError).map((fieldName, i) => (
            responseError[fieldName].map((error, j) => (
              <li key={`${i}-${j}`}>{error}</li>
            ))
          ))}
        </ul>
      )}
      <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <Input label='First Name' name='firstName'
            control={control}
            rules={{ required: 'First name is required' }} />

          <Input label='Last Name' name='lastName'
            control={control}
            rules={{ required: 'Last name is required' }} />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <Input label='Address' name='address'
            control={control}
            rules={{ required: 'Address is required' }} />

          <Input label='Phone' name='phone' control={control}
            rules={{ required: 'Phone number is required' }} />
        </div>

        <Input label='Email' name='email' control={control}
          rules={{ required: 'Email is required' }} />

        <div className='flex justify-between gap-2 items-center'>
          <Button outline color='gray' onClick={() => { router.push('/') }} >Cancel</Button>
          <Button
            isProcessing={isSubmitting}
            disabled={!isValid}
            type='submit'
            outline
            color='success'
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
}

export default CustomerForm;

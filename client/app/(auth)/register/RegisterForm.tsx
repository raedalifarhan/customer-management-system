'use client'

import React, { useContext, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import agent from '@/app/api/agent';
import toast from 'react-hot-toast';
import Input from '@/app/components/Input';
import { Button } from 'flowbite-react/components/Button';
import { UserContext } from '@/context/UserContext';
function RegisterForm() {
  const router = useRouter();
  const [responseError, setResponseError] = useState<{ [key: string]: string[] }>({});
  const { setUser} = useContext(UserContext);


  const {
    control, handleSubmit, setFocus, formState: { isSubmitting, isValid }
  } = useForm({
    mode: 'onTouched'
  });

  useEffect(() => {
    setFocus('displayName');
  }, [setFocus]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await agent.Account.register(data);
      setUser(res)
      localStorage.setItem('jwt', res.token);
      
      toast.success(`New user with name ${res.displayName} added successfully`);
      router.push(`/`);
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
        <Input
          label='Display Name'
          name='displayName'
          control={control}
          rules={{ required: 'Display Name is required' }}
        />

        <Input
          label='Username'
          name='username'
          control={control}
          rules={{ required: 'Username is required' }}
        />

        <Input
          label='Email'
          name='email'
          control={control}
          rules={{ required: 'Email is required' }}
        />

        <Input
          label='Password'
          name='password'
          control={control}
          rules={{ required: 'Password is required' }}
        />

        <Button
          isProcessing={isSubmitting}
          disabled={!isValid}
          type='submit'
          outline
          color='success'
        >
          Register
        </Button>
      </form>
    </>
  );
}

export default RegisterForm;

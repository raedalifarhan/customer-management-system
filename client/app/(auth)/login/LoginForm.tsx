"use client"
import React, { useContext } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Input from '@/app/components/Input';
import { Button } from 'flowbite-react/components/Button';
import agent from '@/app/api/agent';
import { UserContext } from '@/context/UserContext';

const LoginForm = () => {

  const { setUser} = useContext(UserContext);
  
  const router = useRouter();
  
  const { handleSubmit, control, formState: { isSubmitting, isValid } } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await agent.Account.login(data);
      setUser(res)
      localStorage.setItem('jwt', res.token);
      toast.success(`${res.displayName} is logged in successfully...`);
      router.push('/');
    } catch (error: any) {
      if (error?.response?.data) {
        toast.error('Validation failed. Please check the form.');
      } else {
        toast.error('An error occurred while submitting the data.');
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
      <Input label='Email' name='email' control={control} rules={{ required: 'Email is required' }} />
      <Input label='Password' name='password' control={control} rules={{ required: 'Password is required' }} />
      <Button isProcessing={isSubmitting} disabled={!isValid} type='submit' outline color='success'>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;

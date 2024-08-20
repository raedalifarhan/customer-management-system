
import Headings from '@/app/components/customer/Headings'
import React from 'react'
import LoginForm from './LoginForm'

const LoginPage = () => {
  return (
    <div className='mx-auto lg:max-w-[40%] md:max-w-[60%] sm:max-w-[80%] rounded-lg shadow-lg p-10 bg-slate-100 text-slate-800'>
      <Headings title='Login' subtitle='Please enter your login details' />
      <LoginForm  />
    </div>
  )
}

export default LoginPage
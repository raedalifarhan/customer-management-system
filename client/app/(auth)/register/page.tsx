import Headings from "@/app/components/customer/Headings"
import RegisterForm from "./RegisterForm"

const SignUp = () => {
  return (
    <div className='mx-auto lg:max-w-[40%] md:max-w-[60%] sm:max-w-[80%] rounded-lg shadow-lg p-10 bg-slate-100 text-slate-800'>
    <Headings title='Sign Up' subtitle='Fill Out the Create New User Form' />
    <RegisterForm />
  </div>
  )
}

export default SignUp
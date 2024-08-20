
import Headings from "@/app/components/customer/Headings"
import CustomerForm from "../CustomerForm"


const Create = () => {
  return (
    <div className='mx-auto max-w-[75%] rounded-lg shadow-lg p-10 bg-white'>
      <Headings title='Enter Customer Information' subtitle='Enter the complete customer details or a default value.' />
      <CustomerForm />
    </div>
  )
}

export default Create
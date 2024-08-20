'use client'

import agent from "@/app/api/agent";
import { useEffect, useState } from "react";
import { CustomerType } from "@/types/customersTypes";
import Headings from "@/app/components/customer/Headings";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";

export default function Details({ params }: { params: { id: number } }) {
  
  const [customer, setCustomer] = useState<CustomerType>();

  useEffect(() => {
    agent.Customers.details(params.id).then(res => {
      setCustomer(res);
    });
  }, [customer, params.id]);

  if (!customer) return <p>Loading...</p>;


  return (
    <div className="flex flex-col gap-10 w-full mx-auto max-w-[90%] rounded-lg shadow-lg p-10 bg-white text-slate-800">
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <Headings title={`Details about ${customer.firstName}`} subtitle={`${customer.lastName}`} />
          <hr className="my-4" />

          <strong>Type</strong>
          <p className="mb-2">{customer.firstName}</p>

          <strong>Code</strong>
          <p className="mb-2">{customer.lastName}</p>

          <strong>Phone Number</strong>
          <p className="mb-2">{customer.phone}</p>

          <strong>Address</strong>
          <p className="mb-2">{customer.address}</p>

        </div>
      </div>

      <Link className="flex gap-2 items-center text-blue-500" href={`/`}><FaLongArrowAltLeft   size={20} /> Back to customer list</Link>
    </div>
  );
}

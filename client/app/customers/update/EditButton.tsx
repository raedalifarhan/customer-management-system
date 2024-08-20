import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

interface Props {
    id: number
}

const EditButton = ({id}: Props) => {
  return (
    <Button outline>
        <Link href={`/customer/update/${id}`}>Update Customer Details</Link>
    </Button>
  )
}

export default EditButton
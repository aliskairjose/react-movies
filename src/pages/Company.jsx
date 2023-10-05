
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Company() {
  const [company, setCompany] = useState(null);

  useEffect(()=>{
    // const fetchData = await
  },[])

  const {id} = useParams()
  return (
    <div className='max-w-7xl mx-auto mt-8'>Company: {id}</div>
  )
}

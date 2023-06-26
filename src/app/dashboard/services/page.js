import React from 'react'
import Services from '@/components/dashboard/orders/services'
import fetchOrdersData from '@/app/dashboard/fetchordersdata'


async function Page() {
    const data = await fetchOrdersData('/api/orders', "service")
    return (
        
        <Services data={data} />
    )
}

export default Page
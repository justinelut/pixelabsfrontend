import React from 'react'
import Templates from '@/components/dashboard/orders/templates'
import fetchOrdersData from '@/app/dashboard/fetchordersdata'

async function Page() {
    const data = await fetchOrdersData('/api/orders', "template")
   
    return (
        <Templates data={data} />
    )
}

export default Page
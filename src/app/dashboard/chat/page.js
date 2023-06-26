import Chat from '@/components/dashboard/chat/chat'
import fetchOrder from '@/app/dashboard/fetchorder';
import { redirect } from 'next/navigation';


export const dynamic = 'force-dynamic';

async function Page({searchParams}) {
    const order = await fetchOrder('/api/orders', searchParams.chatid)
    if(order && order.totalDocs == 0){
        redirect('/dashboard/services')
    }
    return (
        <Chat  data={order}/>
    )
}

export default Page
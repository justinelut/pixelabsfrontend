import Payments from '@/components/dashboard/payments/payments'
import fetchDashboardData from '@/app/dashboard/fetchdashboarddata';

export const dynamic = 'force-dynamic';

async function Page() {

    const data = await fetchDashboardData('/api/payments')

    return (
        <Payments data={data} />
    )
}

export default Page
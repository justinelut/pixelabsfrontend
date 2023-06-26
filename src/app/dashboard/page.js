import { Grid } from '@tremor/react';
import Chart from '@/app/dashboard/playground/chart';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/authoptions"
import { redirect } from 'next/navigation';
import Metrics from '@/app/dashboard/Metrics';
import fetchOrdersData from '@/app/dashboard/fetchordersdata';
import fetchDashboardData from '@/app/dashboard/fetchdashboarddata';
import { currency } from '@/utilities/Currency';

export const dynamic = 'force-dynamic';

export default async function PlaygroundPage() {
  const session = await getServerSession(authOptions)
  if (session.user.role !== 'admin') {
    redirect('/dashboard')
  }

  const templates = await fetchOrdersData('/api/orders', "template")
  const payments = await fetchDashboardData('/api/payments')
  const orders = await fetchDashboardData('/api/orders')
  const services = await fetchOrdersData('/api/orders', "service")

  function getNameAndTotalPrice() {
    return orders.docs.map((item) => {
      const productName = item.productinfo.name || item.productinfo2.name || '';
      const price = item.plandetails.price || 0;

      return {
        productName,
        price
      };
    }).reduce((accumulator, item) => {
      accumulator.totalPrice += item.price;
      return accumulator;
    }, { totalPrice: 0 });
  }

  const {totalPrice} = getNameAndTotalPrice();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid className="gap-6" numColsSm={2} numColsLg={3}>    
         <Metrics title="Total Services" metric={services.totalDocs}/>
         <Metrics title="Total Templates" metric={templates.totalDocs}/>
         <Metrics title="Total Payments" metric={currency.format(totalPrice)}/>     
      </Grid>
      <Chart orders={orders} />
    </main>
  );
}

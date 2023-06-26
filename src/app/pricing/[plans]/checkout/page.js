import { Checkout } from '@/components'
import { useStore } from '@/store/store'
import StoreInitializer from '@/store/Storeinitializer'
import { SingleService } from '@/components/graphql/query'
import { serverClient } from '@/components'


export default async function Payment(params) {
  const plantype = params.searchParams.p
  const servicetype = params.searchParams.s

  const { data } = await serverClient.query({
    query: SingleService, context: {
      fetchOptions: {
        next: { revalidate: 0 },
      },
    },
    variables: { slug: params.searchParams.s }
  })



  useStore.setState({ purchasedService: data, planType: plantype, serviceType: servicetype })
  return (
    <div>
      <StoreInitializer purchasedService={data} planType={plantype} serviceType={servicetype} />
      <Checkout data={data} />
    </div>
  )
}

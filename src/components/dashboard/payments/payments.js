//import Search from '@/components/dashboard/search';

import {
    Card,
    Title,
    Text,
} from "@tremor/react";
import PaymentsTable from '@/components/dashboard/tables/paymentstable';


export default ({data}) => {
  
    return (

        <>
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <div className="mt-6">
                    <Title>Payments</Title>
                    <Text>
                        Payments Completed
                    </Text>
                    <Card className="mt-6">
                        <PaymentsTable payments={data} />
                    </Card>
                </div>
            </main>
        </>
    );
};
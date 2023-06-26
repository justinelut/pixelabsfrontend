import {
    Card,
    Title,
    Text,
} from "@tremor/react";
import ServicesTable from "@/components/dashboard/tables/servicestable";


export const dynamic = 'force-dynamic';

export default ({ data }) => {
  
    return (
        <>
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <div className="mt-6">
                    <Title>Services</Title>
                    <Text>
                        Services Purchased
                    </Text>
                    <Card className="mt-6">
                        <ServicesTable data={data} />
                    </Card>
                </div>
            </main>
        </>
    );
};
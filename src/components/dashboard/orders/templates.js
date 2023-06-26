
import {
    Card,
    Title,
    Text,
} from "@tremor/react";
import TemplatesTable from "@/components/dashboard/tables/templatestable";


export const dynamic = 'force-dynamic';

export default ({data}) => {

    return (

        <>
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <div className="mt-6">
                    <Title>Templates</Title>
                    <Text>
                        Templates Purchased
                    </Text>
                    <Card className="mt-6">
                       
                            <TemplatesTable data={data} />
                   
                    </Card>
                </div>
            </main>
        </>
    );
};
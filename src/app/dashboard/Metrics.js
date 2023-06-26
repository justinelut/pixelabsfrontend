import { Card, Metric, Text, Flex} from '@tremor/react';

export default function Metrics({title, metric}){

    return(
        <Card key={title}>
            <Flex alignItems="start">
                <Text>{title}</Text>
            </Flex>
            <Flex
                className="space-x-3 truncate"
                justifyContent="start"
                alignItems="baseline"
            >
                <Metric>{metric}</Metric>
            </Flex>
        </Card>
    )
}
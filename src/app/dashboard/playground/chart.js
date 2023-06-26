"use client"

import { Card, AreaChart, Title, Text, BarChart } from '@tremor/react';

const data = [
  {
    Month: 'Jan 21',
    Sales: 2890,
    Profit: 2400
  },
  {
    Month: 'Feb 21',
    Sales: 1890,
    Profit: 1398
  },
  {
    Month: 'Jan 22',
    Sales: 3890,
    Profit: 2980
  }
];

const valueFormatter = (number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function Chart({orders}) {

  function getNameAndPrice() {
    return orders.docs.map((item) => {
      const productName = item.productinfo.name || item.productinfo2.name || '';
      const price = item.plandetails.price || '';

      return {
        productName,
        price
      };
    });
  }

const ordersData = getNameAndPrice()


  return (
    <Card className="mt-8">
      <Title>Purchases Chart</Title>
      <BarChart
        className="mt-6"
        data={ordersData}
        index="productName"
        categories={["price"]}
        colors={["blue"]}
        valueFormatter={valueFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
}

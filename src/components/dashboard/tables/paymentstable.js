"use client"
import Notfounderr from '@/components/404/notfounderr';
import { currency } from '@/utilities/Currency';
import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text
} from '@tremor/react';




export default async function PaymentsTable({payments}) {
    
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>Payment Id</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                    <TableHeaderCell>Product Name</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {payments && payments.totalDocs == 0 ? (

                <Notfounderr title="No payments found!" message="When you purchase a service or a template, your payments will appear here" />
                
                ) :
                 payments && payments.docs.map((payment) => (
                    <TableRow key={payment.id}>
                        <TableCell>{payment.paypalpaymentid}</TableCell>
                        <TableCell>{payment.email_address}</TableCell>
                        <TableCell>
                            <Text>{currency.format(payment.purchase_amount)}</Text>
                        </TableCell>

                        {payment.productinfo.name || payment.productinfo2.name ? (
                            <TableCell>
                                <Text>{payment.productinfo.name || payment.productinfo2.name}</Text>
                            </TableCell>
                        ) : ''}

                        <TableCell>
                            <div className="badge badge-success gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                Payed
                            </div>
                        </TableCell>
                       
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

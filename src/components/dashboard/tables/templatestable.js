"use client"
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
import { FaDownload } from 'react-icons/fa';
import DownloadButton from '@/components/profiles/components/FileDownload';
import Notfounderr from '@/components/404/notfounderr';



export default async function TemplatesTable({ data }) {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>Template Name</TableHeaderCell>
                    <TableHeaderCell>Full Names</TableHeaderCell>
                    <TableHeaderCell>Plan Type</TableHeaderCell>
                    <TableHeaderCell>Amount Payed</TableHeaderCell>
                    <TableHeaderCell>Download</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data && data.totalDocs == 0 ? (
                    <Notfounderr title="No templates found!" message="When you purchase a template, the details will appear here" />
                ) : 
                data.docs.map((service) => (
                    <>
                        <TableRow key={service.id}>
                            {service.productinfo.name || service.productinfo2.name ? (
                                <>
                                    <TableCell>
                                        <Text>{service.productinfo.name || service.productinfo2.name}</Text>
                                    </TableCell>
                                </>
                            ) : ''}
                            <TableCell>{service.createdBy.firstName + ' ' + service.createdBy.lastName}</TableCell>
                            <TableCell>
                                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                                    <div className="collapse-title text-xl font-medium">
                                        {service.plandetails.name}
                                    </div>
                                    <div className="collapse-content">
                                        {
                                            service.plandetails.details.map((detail, index) => (
                                                <ul key={index} className="menu bg-base-100 w-56 rounded-box">
                                                    <li className="bordered">{`${index + 1}${' '}${detail.Details}`}</li>
                                                </ul>
                                            ))
                                        }
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Text>{currency.format(service.paymentinfo.purchase_amount)}</Text>
                            </TableCell>



                            <TableCell>
                                <DownloadButton
                                    pdfUrl={service.productinfo.name ? service.productinfo.sourcecode.url : service.productinfo2.sourcecode.url}
                                    fileName={service.productinfo.name ? service.productinfo.sourcecode.filename : service.productinfo2.sourcecode.filename}
                                    text={<div className="badge badge-secondary"><FaDownload /></div>}
                                />
                            </TableCell>

                        </TableRow>
                    </>
                ))}
            </TableBody>
        </Table>
    );
}

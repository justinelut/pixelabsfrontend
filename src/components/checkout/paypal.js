"use client"

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import Processing from "./processing";

export default function Paypal({ planid, amount, productid, salestype, plantype, productname }) {
    const router = useRouter();
    const [success, setSuccess] = useState(false)
    const [processing, setProcessing] = useState(false)
    const { data: session, status } = useSession()

    // if(success){
    //     router.push('/success?message=complete')
    // }

    const handleSubmit = (details) =>{
        setProcessing(true)
        axios.post(process.env.NEXT_PUBLIC_SERVER_URL + `/api/payments`, {
            paypalpaymentid: details.id,
            productinfo: productid,
            productinfo2: productid,
            given_name: details.payer.name.given_name,
            surname_name: details.payer.name.surname,
            email_address: details.payer.email_address,
            country_code: details.payer.address.country_code,
            purchase_amount: details.purchase_units[0].amount.value,
            purchase_currency: details.purchase_units[0].amount.currency_code,
            address_line_1: details.purchase_units[0].shipping.address.address_line_1,
            address_line_2: details.purchase_units[0].shipping.address.address_line_2,
            admin_area_2: details.purchase_units[0].shipping.address.admin_area_2,
            postal_code: details.purchase_units[0].shipping.address.postal_code,
            shipping_name: details.purchase_units[0].shipping.name.full_name,
        },

            {
                headers: {
                    Authorization: `JWT ${session?.user.payloadToken}`
                }
            }

        ).then(data => {
            axios.post(process.env.NEXT_PUBLIC_SERVER_URL + `/api/orders`, {
                productinfo: productid,
                productinfo2: productid,
                paymentinfo: data.data.doc.id,
                plantype,
                plandetails: planid && planid,
                salestype
            },
                {

                    headers: {
                        Authorization: `JWT ${session?.user.payloadToken}`
                    }

                }).then(success => {
                    if(success){
                    setProcessing(false)
                    setSuccess(true)
                    }
                })
        })
    }

    if(success){
        redirect('/dashboard')
    }

    if(processing){
        return<Processing />
    }


    return (
        <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        "purchase_units": [{
                            "amount": {
                                "currency_code": "USD",
                                "value": amount && amount,
                                "breakdown": {
                                    "item_total": {  /* Required when including the items array */
                                        "currency_code": "USD",
                                        "value": amount && amount
                                    }
                                }
                            },
                            "items": [
                                {
                                    "name": productname && productname, /* Shows within upper-right dropdown during payment approval */
                                    "description": "Optional descriptive text..", /* Item details will also be in the completed paypal.com transaction view */
                                    "unit_amount": {
                                        "currency_code": "USD",
                                        "value": amount && amount
                                    },
                                    "quantity": "1"
                                },
                            ]
                        }]
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        handleSubmit(details)
                    })
                }}
                forceReRender={[amount]}
            />
        </PayPalScriptProvider>
    );
}
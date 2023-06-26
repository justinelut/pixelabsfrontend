import APIError from 'payload/dist/errors/APIError';
import stkpush from '@/stkpush'

const usedReferenceNumbers = new Set();

function generateUniqueReferenceNumber(prefix, length) {
    let referenceNumber;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    do {
        referenceNumber = `${prefix}-`;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            const randomChar = characters.charAt(randomIndex);
            referenceNumber += randomChar;
        }
    } while (usedReferenceNumbers.has(referenceNumber));
    usedReferenceNumbers.add(referenceNumber);
    return referenceNumber;
}

const referenceNumber = generateUniqueReferenceNumber('PL', 10);

const mpesa = stkpush(
    "ayk0ziAlo2FqTwcCpZYB23RS03UqYWnj",
    "oSg0WLLqcAL7h8vA",
    "174379",
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
    referenceNumber,
    "Pixelabs Inc"
);

export const processPayment = async ({ data, req }) => {
    if (!req.query.userid && !req.query.projectid) {
        const url = `https://justinedev.verixr.com/api/payments?userid=${req.user.id}&projectid=${data.projectid}&phonenumber=${data.phonenumber}&amount=${data.amount}`;
        const results = await mpesa.pay(data.amount, data.phonenumber, url).catch(err => {
            if (err) {
                throw new APIError({ msg: "Payment was not initiated" });
            }
        })
        if (results.ResponseCode == 0) {
            data = { phonenumber: data.phonenumber, paymentstatus: "Payment initiated" }
            return data
        }
    }
}

function FormatResponse(response, userId, projectId, confirmed) {
    const data = {
        userId,
        projectId,
        confirmed,
    };

    if (response.Body.stkCallback.ResultCode === 0) {
        const items = response.Body.stkCallback.CallbackMetadata.Item;
        items.forEach((item) => {
            if (item.Name && item.Value) {
                data[item.Name] = item.Value;
            }
        });
    }

    return data;
}


export const SavePayment = async ({ data, req, }) => {
    if (req.query.userid && req.query.projectid) {
        const statuscode = data.Body.stkCallback.ResultCode
        if (statuscode == 1019) {
            console.log(data)
            throw new APIError({ msg: "Transaction has expired" });
        } else if (statuscode == 1037) {
            console.log(data)
            throw new APIError({ msg: "Transaction has timedout" });
        } else if (statuscode == 1032) {
            console.log(data)
            throw new APIError({ msg: "The user has canceled the transaction" });
        } else {
            data = FormatResponse(data, req.query.userid, req.query.projectid, "false")
            return data
        }
    }

    return null
}

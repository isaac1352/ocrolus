


module.exports = (request, response, next) => {
    request.MappedResults = ""
    request.disbursementResults = ""

    const bookPk=request.body.book_pk
    request.ocrolusResponse.forEach((element, index) => {
        const length = request.ocrolusResponse.length
        


        switch (element.form_type) {
            case "UTILITY_BILL":
                if (request.MappedResults!=="") {
                    request.MappedResults += ","
                }
                request.MappedResults += parseUtil(element,bookPk)

                break
            case "INVOICE_SUMMARY":

                if (request.MappedResults!=="") {
                    request.MappedResults += ","
                }
                request.MappedResults += parseInvoice(element,bookPk)
                break
            case "RENT_BILL":
                if (request.MappedResults!=="") {
                    request.MappedResults += ","
                }
                request.MappedResults += parseRent(element,bookPk)
                break
            case "DISBURSEMENT_FORM":
                if (request.disbursementResults!== "") {
                    request.disbursementResults  += ","
                }
                request.disbursementResults += parseDisbursement(element,bookPk)
                break
            default:
                break

        }



        

        if (index === length - 1) {
            console.log(request.MappedResults,'MappedResults')
        console.log(request.disbursementResults,'disbursementResults')
            next()
        }

    })

    /* const { raw_fields } = request.docParsed.response.forms[0]
     console.log(raw_fields['utility_bill-part2:accountNumber(Service Provider)'].value)
     response.json(raw_fields['utility_bill-part2:accountNumber(Service Provider)'])*/
}


function parseUtil(element,bookPk) {

    const { raw_fields } = element;

    return (`{
        "59":{"value":"${element.form_type}"},
        "64":{"value":"${element.statusPk}"},
        "6":{"value":"${raw_fields['utility_bill-part2:accountNumber(Service Provider)'].value}"},
        "7":{"value":"${raw_fields['utility_bill-part3:utilityBillDate'].value}"},
        "11":{"value":"${raw_fields['utility_bill-part1:serviceProviderAddress:addressLine1'].value}"},
        "12":{"value":"${raw_fields['utility_bill-part1:serviceProviderAddress:addressLine2'].value}"},
        "13":{"value":"${raw_fields['utility_bill-part1:serviceProviderAddress:city'].value}"},
        "14":{"value":"${raw_fields['utility_bill-part1:serviceProviderAddress:state'].value}"},
        "15":{"value":"${raw_fields['utility_bill-part1:serviceProviderAddress:zip'].value}"},
        "17":{"value":"${raw_fields['utility_bill-part1:serviceProvider'].value}"},
        "20":{"value":"${raw_fields['utility_bill-part2:accountHolderBillingAddress:addressLine1'].value}"},
        "21":{"value":"${raw_fields['utility_bill-part2:accountHolderBillingAddress:addressLine2'].value}"},
        "22":{"value":"${raw_fields['utility_bill-part2:accountHolderBillingAddress:city'].value}"},
        "23":{"value":"${raw_fields['utility_bill-part2:accountHolderBillingAddress:state'].value}"},
        "24":{"value":"${raw_fields['utility_bill-part2:accountHolderBillingAddress:zip'].value}"},
        "36":{"value":"${raw_fields['utility_bill-part2:accountHolderBillingName'].value}"},
        "39":{"value":"${raw_fields['utility_bill-part3:summaryTotalPayments'].value}"},
        "42":{"value":"${raw_fields['utility_bill-part3:summaryTotalChargesDue'].value}"},
        "43":{"value":"${raw_fields['utility_bill-part3:utilityDueDate'].value}"},
        "44":{"value":"${raw_fields['utility_bill-part1:utilityBillType'].value}"},
        "45":{"value":"${raw_fields['utility_bill-part3:payableTo'].value}"},
        "46":{"value":"${raw_fields['utility_bill-part3:periodEndDate'].value}"},
        "47":{"value":"${raw_fields['utility_bill-part3:periodStartdate'].value}"},
        "48":{"value":"${raw_fields['utility_bill-part3:priorPaymentPostingDate'].value}"},
        "58":{"value":"${raw_fields['utility_bill-part3:priorPaymentTotalPaid'].value}"}
        
        

        


   }`)

}

function parseInvoice(element,bookPk) {
    const { raw_fields } = element;

    return (`{
        "59":{"value":"${element.form_type}"},
        "64":{"value":"${element.statusPk}"},
        "6":{"value":"${raw_fields['invoice_summary-Part1-General:accountNumber'].value}"},
        "7":{"value":"${raw_fields['invoice_summary-Part1-General:invoiceDate'].value}"},
        "8":{"value":"${raw_fields['invoice_summary-Part1-General:invoiceNumber'].value}"},
        "9":{"value":"${raw_fields['invoice_summary-Part1-General:purchaseOrderNumber(Po)'].value}"},
        "10":{"value":"${raw_fields['invoice_summary-Part1-General:terms'].value}"},
        "11":{"value":"${raw_fields['invoice_summary-Part2-VendorDetails:vendorAddress:addressLine1'].value}"},
        "12":{"value":"${raw_fields['invoice_summary-Part2-VendorDetails:vendorAddress:addressLine2'].value}"},
        "13":{"value":"${raw_fields['invoice_summary-Part2-VendorDetails:vendorAddress:city'].value}"},
        "14":{"value":"${raw_fields['invoice_summary-Part2-VendorDetails:vendorAddress:state'].value}"},
        "15":{"value":"${raw_fields['invoice_summary-Part2-VendorDetails:vendorAddress:zip'].value}"},
        "16":{"value":"${raw_fields['invoice_summary-Part2-VendorDetails:vendorEmailAddress'].value}"},
        "17":{"value":"${raw_fields['invoice_summary-Part2-VendorDetails:vendorName'].value}"},
        "19":{"value":"${raw_fields['invoice_summary-Part2-VendorDetails:vendorPhoneNumber'].value}"},
        "20":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerAddress(BillTo):addressLine1'].value}"},
        "21":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerAddress(BillTo):addressLine2'].value}"},
        "22":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerAddress(BillTo):city'].value}"},
        "23":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerAddress(BillTo):state'].value}"},
        "24":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerAddress(BillTo):zip'].value}"},
        "25":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerAddress(ShipTo):addressLine1'].value}"},
        "26":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerAddress(ShipTo):addressLine2'].value}"},
        "27":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerAddress(ShipTo):city'].value}"},
        "28":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerAddress(ShipTo):state'].value}"},
        "29":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerAddress(ShipTo):zip'].value}"},
        "35":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerEmailAddress'].value}"},
        "36":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerName(BillTo)'].value}"},
        "37":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerName(ShipTo)'].value}"},
        "38":{"value":"${raw_fields['invoice_summary-Part3-BuyerDetails:buyerPhoneNumber'].value}"},
        "39":{"value":"${raw_fields['invoice_summary-Part4-Payment:amountPaid'].value}"},
        "40":{"value":"${raw_fields['invoice_summary-Part4-Payment:invoiceSubtotal'].value}"},
        "41":{"value":"${raw_fields['invoice_summary-Part4-Payment:invoiceTax'].value}"},
        "42":{"value":"${raw_fields['invoice_summary-Part4-Payment:invoiceTotal'].value}"},
        "43":{"value":"${raw_fields['invoice_summary-Part4-Payment:paymentDueDate'].value}"}


       
        
        

        


   }`)

}

function parseRent(element,bookPk) {
    const { raw_fields } = element;
    return (`{
        "59":{"value":"${element.form_type}"},
        "64":{"value":"${element.statusPk}"},
        "6":{"value":"${raw_fields['rent_bills-part3:invoicedAccountNumber'].value}"},
        "7":{"value":"${raw_fields['rent_bills-part3:invoiceDate'].value}"},
        "8":{"value":"${raw_fields['rent_bills-part3:invoiceNumber '].value}"},
        "11":{"value":"${raw_fields['rent_bills-part1:invoicerAddress:addressLine1'].value}"},
        "12":{"value":"${raw_fields['rent_bills-part1:invoicerAddress:addressLine2'].value}"},
        "13":{"value":"${raw_fields['rent_bills-part1:invoicerAddress:city'].value}"},
        "14":{"value":"${raw_fields['rent_bills-part1:invoicerAddress:state'].value}"},
        "15":{"value":"${raw_fields['rent_bills-part1:invoicerAddress:zip'].value}"},
        "17":{"value":"${raw_fields['rent_bills-part1:invoicerEntityName '].value}"},
        "19":{"value":"${raw_fields['rent_bills-part1:invoicerPhoneNumber'].value}"},
        "20":{"value":"${raw_fields['rent_bills-part2:renterAddress:addressLine1'].value}"},
        "21":{"value":"${raw_fields['rent_bills-part2:renterAddress:addressLine2'].value}"},
        "22":{"value":"${raw_fields['rent_bills-part2:renterAddress:city'].value}"},
        "23":{"value":"${raw_fields['rent_bills-part2:renterAddress:state'].value}"},
        "24":{"value":"${raw_fields['rent_bills-part2:renterAddress:zip'].value}"},
        "25":{"value":"${raw_fields['rent_bills-part4:addressOfRentedLocation:addressLine1'].value}"},
        "26":{"value":"${raw_fields['rent_bills-part4:addressOfRentedLocation:addressLine2'].value}"},
        "27":{"value":"${raw_fields['rent_bills-part4:addressOfRentedLocation:city'].value}"},
        "28":{"value":"${raw_fields['rent_bills-part4:addressOfRentedLocation:state'].value}"},
        "29":{"value":"${raw_fields['rent_bills-part4:addressOfRentedLocation:zip'].value}"},
        "36":{"value":"${raw_fields['rent_bills-part2:renterName'].value}"},
        "39":{"value":"${raw_fields['rent_bills-part3:priorPaymentTotalPaid'].value}"},
        "42":{"value":"${raw_fields['rent_bills-part3:invoiceBalanceDue '].value}"},
        "44":{"value":"${raw_fields['rent_bills-part3:priorPaymentPostingDate'].value}"},
        "45":{"value":"${raw_fields['rent_bills-part4:monthBeingRented'].value}"},
        "46":{"value":"${raw_fields['rent_bills-part4:payableTo'].value}"},
        "47":{"value":"${raw_fields['rent_bills-part4:utilitiesIncluded?'].value}"}
        

    }`)
    
}

function parseDisbursement(element,bookPk) {
    const { raw_fields } = element;

   
    return (`{
        "26":{"value":"${element.form_type}"},
        "31":{"value":"${element.statusPk}"},
        "6":{"value":"${raw_fields['disbursement_form-Part2-Disbursement:amountToBePaid'].value}"},
        "7":{"value":"${raw_fields['disbursement_form-Part2-Disbursement:invoiceNumber'].value}"},
        "8":{"value":"${raw_fields['disbursement_form-Part2-Disbursement:billingAddress:zip'].value}"},
        "9":{"value":"${raw_fields['disbursement_form-Part1-Member:memberId'].value}"},
        "10":{"value":"${raw_fields['disbursement_form-Part2-Disbursement:billingAddress:addressLine2'].value}"},
        "11":{"value":"${raw_fields['disbursement_form-Part2-Disbursement:billingAddress:city'].value}"},
        "12":{"value":"${raw_fields['disbursement_form-Part1-Member:methodSent'].value}"},
        "13":{"value":"${raw_fields['disbursement_form-Part2-Disbursement:checkPayableTo'].value}"},
        "14":{"value":"${raw_fields['disbursement_form-Part2-Disbursement:description'].value}"},
        "15":{"value":"${raw_fields['disbursement_form-Part2-Disbursement:billingAddress:state'].value}"},
        "16":{"value":"${raw_fields['disbursement_form-Part2-Disbursement:billingAddress:addressLine1'].value}"},
        "17":{"value":"${raw_fields['disbursement_form-Part2-Disbursement:billAmount'].value}"},
        "18":{"value":"${raw_fields['disbursement_form-Part1-Member:sentFrom'].value}"},
        "19":{"value":"${raw_fields['disbursement_form-Part1-Member:memberName'].value}"}
    
    
    
    }`)

    
}
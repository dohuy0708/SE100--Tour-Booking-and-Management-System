import mongooser from "mongoose";

const PaymentSchema = new mongooser.Schema({
    booking_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Booking', required: true},
    amount_paid:{type: mongooser.Types.Decimal128,
                required: true,
                get: (value: mongooser.Types.Decimal128) => value ? value.toString() : null, 
                set: (value: string | number) => mongooser.Types.Decimal128.fromString(value.toString())},
    payment_date:{type: Date, required: true},
    payment_method:{
        type: String,
        enum:['CASH','CREDIT_CARD','BANK_TRANSFER'],
        required: true,
    }
    
});

export const PaymentMethods={
    CASH:'CASH',
    CREDIT_CARD:'CREDIT_CARD',
    BANK_TRANSFER:'BANK_TRANSFER',
};


export const PaymentModel = mongooser.model('Payment', PaymentSchema);

export const createPayment=(values: Record<string, any>)=> new PaymentModel(values)
.save().then((Payment)=>Payment.toObject());

export const updatePaymentById=(payment_id:string, values: Record<string, any>)=> PaymentModel.findByIdAndUpdate(payment_id, values);

export const deletePaymentById=(payment_id:string)=>PaymentModel.findByIdAndDelete({_id: payment_id});

export const getPayments=()=>PaymentModel.find();

export const getPaymentById=(payment_id:string)=>PaymentModel.findById(payment_id);
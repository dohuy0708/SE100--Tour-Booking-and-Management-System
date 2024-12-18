import mongooser from "mongoose";

const TourPriceSchema = new mongooser.Schema({
    tour_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Tour', required: true},
    adult_price:{type: mongooser.Types.Decimal128,
                required: true,
                get: (value: mongooser.Types.Decimal128) => value ? value.toString() : null, 
                set: (value: string | number) => mongooser.Types.Decimal128.fromString(value.toString())},
    children_price:{type: mongooser.Types.Decimal128,
                required: true,
                get: (value: mongooser.Types.Decimal128) => value ? value.toString() : null, 
                set: (value: string | number) => mongooser.Types.Decimal128.fromString(value.toString())}, 
    infant_price:{type: mongooser.Types.Decimal128,
                    required: true,
                    get: (value: mongooser.Types.Decimal128) => value ? value.toString() : null, 
                    set: (value: string | number) => mongooser.Types.Decimal128.fromString(value.toString())},
});



export const TourPriceModel = mongooser.model('TourPrice', TourPriceSchema);

export const createPrice=(values: Record<string, any>)=> new TourPriceModel(values)
.save().then((price)=>price.toObject());

export const updatePriceById=(price_id:string, values: Record<string, any>)=> TourPriceModel.findByIdAndUpdate(price_id, values);

export const deletePriceById=(price_id:string)=>TourPriceModel.findByIdAndDelete({_id: price_id});

export const getPrices=()=>TourPriceModel.find();

export const getPriceById=(price_id:string)=>TourPriceModel.findById(price_id);
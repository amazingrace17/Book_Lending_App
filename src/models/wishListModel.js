import mongoose from 'mongoose';


const { Schema, model, SchemaTypes } = mongoose;
const wishSchema = new Schema({
    //  wish: {
    //     type: SchemaTypes.ObjectId,
    //     ref: "book"
    //  }
    wishlist: [{
         
            type: SchemaTypes.ObjectId,
            ref: 'book'
        
    }]
})

export const Wish = model('wish', wishSchema);
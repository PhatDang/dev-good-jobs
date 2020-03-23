import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;
const hunterSchema = new Schema({
    /**
     *  ===HUNTERS Login:
     */
    // Type code here....
});

const Hunter = model('Hunter', hunterSchema);
export default Hunter;

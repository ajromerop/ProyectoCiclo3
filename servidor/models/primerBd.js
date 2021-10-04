import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mascotaSchema = new Schema({
    nombre: {type:String, required:[true, 'nombre de mascota obligatorio']},
    especie: String,
    raza:String,
    date:{type: Date, default:Date.now},
    activo:{type: Boolean, default:true}


});

//CONVERTIR ESQUEMA A MODELO

const primerBd = mongoose.model('primerbd', mascotaSchema);
export default primerBd;


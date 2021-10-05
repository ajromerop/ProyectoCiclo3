import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const registroSchema = new Schema({
    nombre_paciente: {type:String, required:[true, 'nombre de paciente obligatorio']},
    id_paciente:{type:Number, required:[true, 'id del paciente obligatorio']},
    nombre_medico: {type:String, required:[true, 'nombre de medico obligatorio']},
    id_medico:{type:Number, required:[true, 'id del medico obligatorio']},
    fecha_consulta:{type: Date, default:Date.now}
    


});

//CONVERTIR ESQUEMA A MODELO

const registroBd = mongoose.model('registrobd', registroSchema);
export default registroBd;


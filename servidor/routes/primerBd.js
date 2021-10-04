import express from 'express';
//import primerBd from '../models/primerBd';
const router = express.Router();

//IMPORTAMOS MODELOS
import PrimerBd from '../models/primerBd';
//const PrimerBd = require('../models/primerBd');

//AGREGAMOS UN REGISTRO (MODELO)
router.post('/nuevo-registro', async(req,res)=>{
    const body = req.body;

    try {
        const PrimerDB = await PrimerBd.create(body);
        res.status(200).json(PrimerDB);
    } catch (error) {
        return res.status(500).json({
            mensaje:'Ocurrio algo inesperado',
            error
        })
    }
});

//EXPORTAR LA CONFIGURACIÓN DE EXPRESS
module.exports=router;

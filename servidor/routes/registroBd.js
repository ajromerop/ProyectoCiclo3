import express from 'express';
import primerBd from '../models/primerBd';
//import primerBd from '../models/primerBd';
const router = express.Router();

//IMPORTAMOS MODELOS
import RegistroBd from '../models/registroBd';
//const PrimerBd = require('../models/primerBd');

//AGREGAMOS UN REGISTRO (MODELO)
router.post('/registro-nuevo', async(req,res)=>{
    const body = req.body;

    try {
        const RegistroDB = await RegistroBd.create(body);
        res.status(200).json(RegistroDB);
    } catch (error) {
        return res.status(500).json({
            mensaje:'Ocurrio algo inesperado',
            error
        })
    }
});

// GET BUSCA TODOS LOS REGISTROS
router.get('/buscartodo', async(req, res)=>{

    try {
        const RegistroDB = await RegistroBd.find();
        res.json(RegistroDB);
        
    } catch (error) {
            return res.status(400).json({
                mensaje:'Error en la busqueda',
                error
            });
        }
        
        
});
    
    //GET CON PARAMETRO
    router.get('/buscar-parametro/:id', async(req, res)=>{
        const _id = req.params.id;
        try {
            const RegistroDB = await RegistroBd.findOne({_id});
            res.json(RegistroDB);
            
        } catch (error) {
            return res.status(400).json({
                mensaje:'Error en la busqueda de ID de servicio',
                error
            })
        }
            
            
    });

    //ELIMINAR REGISTRO REGISTRO
    router.delete('/eliminar-parametro/:id', async(req, res)=>{
        const _id = req.params.id;
        try {
            const RegistroDB = await RegistroBd.findByIdAndDelete({_id});
            if (!RegistroDB) {
                return res.status(400).json({
                    mensaje:'No se encontró id de servicio',
                    error
                })
            }
            res.json(RegistroDB);
        } catch (error) {

            return res.status(400).json({
                mensaje:'ocurrió un error en el delate'
            })
            
        }

        
    });

    //PUT ACTUALIZAR REGISTRO
    router.put('/actualizar/:id', async(req, res)=>{
        const _id = req.params.id;
        const body = req.body;

        try {
            const RegistroDB = await RegistroBd.findByIdAndUpdate(
                _id,
                body,{new: true});
                res.json(RegistroDB);

        } catch (error) {

            return res.status(400).json({
                mensaje:'No se logró actualizar',
                error
            })
            
        }
    });
    


//EXPORTAR LA CONFIGURACIÓN DE EXPRESS
module.exports=router;

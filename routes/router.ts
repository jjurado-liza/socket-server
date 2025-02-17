import { Router, Request, Response } from 'express'
import Server from '../classes/server';


const router = Router();

router.get('/mensajes', (req:Request, res:Response ) => {
    res.json({
        ok:true,
        mensaje: 'GET - Listo - Todo esta bien!!!'
    })

});


router.post('/mensajes', (req:Request, res:Response ) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance;
    // Todos
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok:true,
        mensaje: 'POST - LISTO - Todo esta bien!!!',
        cuerpo,
        de
    })

});

router.post('/mensajes/:id', (req:Request, res:Response ) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id

    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance;
    // ID en particular
    server.io.in(id).emit('mensaje-privado', payload);
    // Todos
    // server.io.emit('mensaje-privado', payload);
    res.json({
        ok:true,
        mensaje: 'POST - LISTO - Todo esta bien!!!',
        cuerpo,
        de,
        id
    })

});

export default router;
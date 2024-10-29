import { Router, Request, Response } from 'express'
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';


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

// Servicio para obtener los IDs de los usuarios
router.get('/usuarios', (req:Request, res:Response) => {
    const server = Server.instance;

    server.io.fetchSockets()
        .then((sockets:any[]) => {
            if(sockets.length > 0){
                let clientes:string[] = [];
                sockets.forEach((item:any) => {
                    clientes.push(item.id);
                })
                res.json({
                    ok: true,
                    clientes
                })
            }else{
                return res.json({
                    ok: false,
                    clientes:[]
                })
            }
        }).catch(err => {
            return res.json({
                ok: false,
                err,
                clientes:[]
            })
        })
})

// Obtener usuarios y nombres
router.get('/usuarios/detalle', (req:Request, res:Response) => {
    const usuarios = usuariosConectados.getLista();
    if(usuarios.length > 0){
        res.json({
            ok:true,
            usuarios
        })
    }else{
        res.json({
            ok:false,
            usuarios:[]
        })
    }
})

export default router;
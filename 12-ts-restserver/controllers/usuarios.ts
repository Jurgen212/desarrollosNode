import { Request, Response } from "express"
import Usuario from "../models/usuario";

export const getUsuarios = async ( req: Request, res: Response ) =>{


    const usuarios = await Usuario.findAll();
    res.json({
        usuarios
    })
}


export const getUsuario = async ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const usuario = await Usuario.findByPk( id );

    if( !usuario ) res.status( 404 ).json({ msg:'No existe usuario con ese id: ' + id });

    res.json({
        usuario
    });
}


export const postUsuario = async ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;

    try{

        const existeEmail = await Usuario.findOne({
            where:{
                email: body.email
            }
        })

        if( existeEmail ) return res.status(401).json({ msg:'Ya existe ese email registrado'});


        const usuario = new Usuario( body );
        await usuario.save();

        res.json( usuario )

    } catch( error ){

        console.log( error )
        res.json({
            msg:'Error al post usuario'
        })
    }
}

export const putUsuario = async ( req: Request, res: Response ) =>{


    const { id } = req.params;
    const { body } = req;

    try{

       const usuario = await Usuario.findByPk( id );

       if( !usuario ) return res.status( 404 ).json({ msg:'No existe usuario con ese id '})

       await usuario.update( body );
        res.json( { usuario })

    } catch( error ){

        console.log( error )
        res.json({
            msg:'Error al post usuario'
        })
    }
}



export const deleteUsuario = async ( req: Request, res: Response ) =>{

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );

    if( !usuario ) return res.status( 404 ).json({ msg:'No existe usuario con ese id '});

    // await usuario.destroy();

    await usuario.update({ estado: false });

    res.json({
        usuario
    })
}
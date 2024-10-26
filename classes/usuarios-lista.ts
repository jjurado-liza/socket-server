import { Usuario } from "./usuario";

export class UsuariosLista {
    private lista:Usuario[]=[];
    constructor(){

    }
    public agregar(usuario:Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre(id: string, nombre:string){
        for(let item of this.lista){
            if(item.id === id){
                item.nombre = nombre;
                break;
            }
        }
        console.log('Actualizando Usuario');
        console.log(this.lista);
    }
    public getLista(){
        return this.lista;
    }
    public getUsuario(id:string){
        return this.lista.find( usuario => {
            return usuario.id === id
        });
        // codigo simplificado
        // return this.lista.find(usuario => usuario.id === id )
    }
    //obtener usuarios en una sala en particular
    public getUsuariosSala(sala:string){
        return this.lista.filter(usuario => usuario.sala === sala );
    }

    public borrarUsuario(id:string){
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => {
            return usuario.id !== id
        });
        return tempUsuario;
    }
}
// Define una clase llamada Dato
class Dato{
    // El constructor recibe dos parámetros: descripcion y valor
    constructor(descripcion, valor){
        this._descripcion = descripcion;
        this._valor = valor;
    }
    get descripcion(){
        return this._descripcion;
    }
    set descripcion(descripcion){
        this._descripcion = descripcion;
    }
    get valor(){
        return this._valor;
    }
    set valor(valor){
        this._valor = valor;
    }
}

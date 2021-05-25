export class Tarea {

    nombre: string;
    estado: boolean;
    fechaFinTarea: Date;
    fechaInicioTarea: Date;
    prioridad: number;

    constructor(nombre: string, estado: boolean, fechaFinTarea: Date, prioridad: number, fechaInicioTarea:Date) {
        this.nombre = nombre;
        this.estado = estado;
        this.fechaFinTarea = fechaFinTarea;
        this.fechaInicioTarea = fechaInicioTarea
        this.prioridad = prioridad;
    }
}
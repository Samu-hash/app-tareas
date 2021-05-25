import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Prioridades } from 'src/app/models/Prioridades';
import { Tarea } from 'src/app/models/Tarea';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  listaTarea: Tarea[] = [];
  listaOrdenada: Tarea[] = [];
  listaPrioridades: Prioridades[] = [];
  prioridad: Prioridades;

  nombreTarea: string = '';
  fechaFin: Date = new Date;
  fechaTarea: any = null;
  mensajeAlerta: string = '';
  cerrarModal: string = '';

  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor() {
    this.fechaFin;
    this.prioridad = new Prioridades('0', 'Seleccione un valor');
    this.agregarListadoPrioridades();
  }

  ngOnInit(): void {
  }

  agregarTarea(event: any): void {
    let mensaje = this.validarCampos();
    if (mensaje == '') {
      this.mensajeAlerta = '';
      //this.closeModalEvent.emit(false);
      const tarea: Tarea = {
        nombre: this.nombreTarea.trim(),
        estado: false,
        fechaFinTarea: this.fechaTarea,
        prioridad: Number(this.prioridad.idPrioridad),
        fechaInicioTarea: new Date()
      }

      this.listaTarea.push(tarea);
      this.limpiarVariables();
      this.ordenarPrioridadesLista();
    } else {
      this.mensajeAlerta = mensaje;
    }

  }

  eliminarTarea(tarea: Tarea, indice: number): void {
    if (!tarea.estado)
      this.listaTarea.splice(indice, 1);
  }

  actualizarTarea(tarea: Tarea, indice: number): void {
    if (!tarea.estado)
      this.listaTarea[indice].estado = !tarea.estado;
  }

  private agregarListadoPrioridades(): void {
    this.listaPrioridades.push({
      idPrioridad: "1",
      nombrePrioridad: "Prioridad alta"
    }, {
      idPrioridad: "2",
      nombrePrioridad: "Prioridad media"
    }, {
      idPrioridad: "3",
      nombrePrioridad: "Prioridad baja"
    });
  }

  private validarCampos(): string {
    if (this.nombreTarea.trim() == '') {
      this.cerrarModal = '';
      return 'Debe completar el campo nombre';
    } else if (Number(this.prioridad.idPrioridad) < 1) {
      this.cerrarModal = '';
      return 'Debe completar el campo prioridad';
    } else if (this.fechaTarea == null) {
      this.cerrarModal = '';
      return 'Debe agregar una fecha';
    }
    this.cerrarModal = 'modal';
    return '';
  }

  private ordenarPrioridadesLista(): void {
    this.listaTarea.sort((a, b) => Number(a.prioridad) - Number(b.prioridad));
    this.listaTarea.forEach(element => {

      this.listaOrdenada.push();
    });

  }

  private limpiarVariables(): void {
    this.nombreTarea = "";
    this.fechaFin = new Date();
    this.listaPrioridades = [];
    this.cerrarModal = '';
    this.fechaTarea = null;
    this.agregarListadoPrioridades();
  }
}
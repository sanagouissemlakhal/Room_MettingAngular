import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservc.component.html',
  styleUrls: ['./reservc.component.css']
})
export class ReservcComponent implements OnInit {

  taskArray = [{
    firstName: 'Sana',
    lastName: 'Lakhal',
    email: 'sanalakhal@gmail.com',
    date: '2024-06-23',
    startTime: '09:45',
    endTime: '11:30',
    salle: 'salle1', // Ajout de la salle dans le modèle
    isCompleted: false
  }];

  editMode = false;
  currentIndex: number | null = null;
  selectedTask: any = null;

  // Liste des salles statiques
  salles = ['Salle 1', 'Salle 2', 'Salle 3'];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const newTask = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      date: form.value.date,
      startTime: form.value.startTime,
      endTime: form.value.endTime,
      salle: form.value.salle,
      isCompleted: false
    };
// disponibilité de la salle 
    if (this.isRoomAvailable(newTask)) {
      if (this.editMode && this.currentIndex !== null) {
        this.taskArray[this.currentIndex] = newTask;
        this.editMode = false;
        this.currentIndex = null;
      } else {
        this.taskArray.push(newTask);
      }
      form.resetForm(); // Réinitialiser le formulaire après la soumission
    } else {
      alert('The selected room is not available at the chosen date and time , please choose another room.');
    }
  }

  isRoomAvailable(newTask: any): boolean {
    return !this.taskArray.some(task =>
      task.salle === newTask.salle &&
      task.date === newTask.date &&
      ((newTask.startTime >= task.startTime && newTask.startTime < task.endTime) ||
      (newTask.endTime > task.startTime && newTask.endTime <= task.endTime) ||
      (newTask.startTime <= task.startTime && newTask.endTime >= task.endTime))
    );
  }

  onDelete(index: number) {
    this.taskArray.splice(index, 1);
  }



  onEdit(index: number, form: NgForm) {
    this.editMode = true;
    this.currentIndex = index;
    const task = this.taskArray[index];
    form.setValue({
      firstName: task.firstName,
      lastName: task.lastName,
      email: task.email,
      date: task.date,
      startTime: task.startTime,
      endTime: task.endTime,
      salle: task.salle
    });
  }

  onCancelEdit(form: NgForm) {
    this.editMode = false;
    this.currentIndex = null;
    form.resetForm();
  }

  onViewDetails(index: number) {
    this.selectedTask = this.taskArray[index];
  }

  onCloseDetails() {
    this.selectedTask = null;
  }
}

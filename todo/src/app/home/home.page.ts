import { TodoService } from './../services/todo.service';
import { Component } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  type : string = "pending";

  constructor(public alertController: AlertController, 
    public todoService: TodoService,
    public toastController: ToastController,
    public popoverController: PopoverController) {}

  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
       header: 'Adicionar tarefa!',
      inputs: [
        {
          name: 'todo',
          type: 'text',
          placeholder: 'Tarefa'
        },
        {
          name: 'date',
          type: 'date',
          min: '2021-01-01',
          max: '2025-12-31'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Salvar',
          handler: (alertData) => {
            if (alertData.todo != "")
            this.todoService.addTodo(alertData.todo, alertData.date)
            else {
              this.presentToast();
              this.presentAlertPromptAdd();
              }
            
          }
        }
      ]
    });

    await alert.present();
  }



  async presentAlertPromptDelete(index: number) {
    const alert = await this.alertController.create({
       header: 'Excluir tarefa!',
       message: 'Deseja realmente excluir a tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Excluir',
          handler: () => this.todoService.delTodo(index)
          }
        
      ]
    });

    await alert.present();
  }




  async presentAlertPromptUpdate(index: number, todo) {
    const alert = await this.alertController.create({
       header: 'Alterar dados da tarefa!',
      inputs: [
        {
          name: 'todo',
          type: 'text',
          placeholder: 'Tarefa',
          value: todo.value
        },
        {
          name: 'date',
          type: 'date',
          min: '2021-01-01',
          max: '2025-12-31',
          value: todo.date.getFullYear() + "-" + ((todo.date.getMonth() + 1) < 10 ? "0" + todo.date.getMonth()+1 : todo.date.
          getMonth()+1) + "-" + ((todo.date.getDay() + 1) < 10 ? "0" + todo.date.getDay() : todo.date.getDay())
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Alterar',
          handler: (alertData) => {
            if (alertData.todo != "")
            this.todoService.updateTodo(index, alertData.todo, alertData.date)
            else {
              this.presentToast();
              this.todoService.updateTodo(index, alertData.todo, alertData.date);
              }
            
          }
        }
      ]
    });

    await alert.present();
  }


  




  async presentToast() {
    const toast = await this.toastController.create({
      message: "Preencha a tarafa!",
      duration: 2000
    });
    toast.present();
  }




  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();

}


}


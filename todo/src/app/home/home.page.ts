import { TodoService } from './../services/todo.service';
import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertController: AlertController, 
    public todoService: TodoService,
    public toastController: ToastController) {}

  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
       header: 'Adicionar Tarefa!',
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
       header: 'Excluir Tarefa!',
       message: 'Deseja realmente excluir a tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Excluir',
          handler: () => {
            this.todoService.delTodo(index);
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



}


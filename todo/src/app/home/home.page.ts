import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertController: AlertController) {}

  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
       header: 'Adicionar Tarefa!',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          placeholder: 'Tarefa'
        },
        {
          name: 'data',
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
          handler: () => {
            console.log('Tarefa adicionada!');
          }
        }
      ]
    });

    await alert.present();
  }





}


import { TodoService } from './../services/todo.service';
import { Component } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { AdMob, AdOptions, AdLoadInfo, InterstitialAdPluginEvents } from '@capacitor-community/admob';


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


ngOnInit() {
  this.todoService.getFromStorage();
}


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






// inicio ADMOB

export async function interstitial(): Promise<void> {
  AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
    // Subscribe prepared interstitial
  });

  const options: AdOptions = {
    adId: 'ca-app-pub-5008288203998795/2233957738',
    // isTesting: true
    // npa: true
  };
  await AdMob.prepareInterstitial(options);
  await AdMob.showInterstitial();
}


// fim ADMOB

export async function initialize(): Promise<void> {
  const { status } = await AdMob.trackingAuthorizationStatus();

  if (status === 'notDetermined') {
    /**
     * If you want to explain TrackingAuthorization before showing the iOS dialog,
     * you can show the modal here.
     * ex)
     * const modal = await this.modalCtrl.create({
     *   component: RequestTrackingPage,
     * });
     * await modal.present();
     * await modal.onDidDismiss();  // Wait for close modal
     **/
  }
 
  AdMob.initialize({
    requestTrackingAuthorization: true,
    testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
    initializeForTesting: true,
  });
}



// fim ADMOB
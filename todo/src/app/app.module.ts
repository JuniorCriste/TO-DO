// DEVIDO A ATUALIZAÇÕES, o firebase é importado com camada de compatibilidade.

import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { firebaseConfig } from './credential';

import { TodoService } from './services/todo.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AngularFireModule.initializeApp(firebaseConfig) 
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  TodoService
],
  bootstrap: [AppComponent],
})
export class AppModule {}

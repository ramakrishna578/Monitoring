import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule} from 'ng2-smart-table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsPerTestComponent } from './charts-per-test/charts-per-test.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    ChartsPerTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SmartTableModule, NgbModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

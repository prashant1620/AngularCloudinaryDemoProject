import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TemplateRef, ModuleWithProviders } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent,} from './app.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoAlbum } from './model/photo-album.service';
import { CloudinaryModule, } from '@cloudinary/angular-5.x';
import * as cloudinary from 'cloudinary-core';
import cloudinaryConfiguration from './config';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatSidenavContent, MatSlideToggleModule, MatListModule, MatCardTitle, MatSpinner, MatCard, MatNavList, MatAutocompleteModule, MatButtonToggleModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatInputModule, MatNativeDateModule, MatTooltipModule, MatTabsModule, MatSnackBarModule, MatSliderModule, MatSelectModule, MatRippleModule, MatRadioModule, MatProgressSpinnerModule, MatProgressBarModule, MatMenuModule} from '@angular/material';
import { ModalGalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs'; import 'mousetrap';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbTabsetModule, NbCardModule, NbDialogService, NbDialogModule, NbDialogConfig, NB_DIALOG_CONFIG, NbActionsModule } from '@nebular/theme';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataComponent } from './data/data.component';
import { HtmlComponent } from './html/html.component';
import { PreviewComponent } from './preview/preview.component';
import {AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule } from 'angularfire2/database';
import {environment } from '../environments/environment'
import { DataService } from './data.service';
import { Http, HttpModule } from '@angular/http';
import { AceEditorModule } from 'ng2-ace-editor';
import { CKEditorModule } from 'ng2-ckeditor';



@NgModule({
  declarations: [
    AppComponent,
    PhotoAlbumComponent,
    PhotoListComponent,
    DataComponent,
    HtmlComponent,
    PreviewComponent,
   
   
  ],
  imports: [
    BrowserModule,AceEditorModule,CKEditorModule,
    AppRoutingModule,NbActionsModule,
    CloudinaryModule.forRoot(cloudinary, cloudinaryConfiguration),
    FileUploadModule,
    HttpClientModule,MatToolbarModule,
    MatSidenavModule,MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,FormsModule,ReactiveFormsModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,BrowserAnimationsModule,
    ModalGalleryModule.forRoot(),
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule,NbTabsetModule,NbCardModule, NbDialogModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,HttpModule
  ],
  providers: [PhotoAlbum,NbDialogService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
  
}

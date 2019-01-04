import { Component, ViewEncapsulation, Input, TemplateRef, ChangeDetectionStrategy} from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
import { NbDialogRef, NbDialogService } from '@nebular/theme';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  
  styleUrls: ['./app.component.scss'],
 
})
export class AppComponent  {
  mobileQuery: MediaQueryList;
  
   constructor(media: MediaMatcher,private dialogService: NbDialogService ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    }


    open(dialog: TemplateRef<any>) {
      this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
    }
    save(){
      alert('save button clicked');
    }
   
    
    }
 

 





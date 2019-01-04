import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { state } from '@angular/animations';
import { AceEditorModule } from 'ng2-ace-editor';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./data.component.scss']
})
export class DataComponent  {

  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;

 
  model: any = {};

  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }
 

  constructor(private service:DataService) {
    this.mycontent = `<p>My html content</p>`;
  } 
  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
  }

  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }
 

  
}

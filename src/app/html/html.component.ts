import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AceEditorModule } from 'ng2-ace-editor';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class HtmlComponent implements OnInit {

  constructor(private service:DataService) { }
 /*data= { 
    "_id": "5ac4929b5256c319af6e451d",
    "title": "Notification Headers",
"description" : "Used for push notification",
    "modified": 1522843522264,
    "created": 1522832027770,
    "address": "some address",
    "targets": "Test Estate",
"all" : false,  
"venue" : "Where the event is happening",
"start" : 1528447716000,
"end" : 1528447716000,
"category" : "Category shown on Event List",
    "message": "<b>Join Us!</b> <p>Here we can put any information we need to enhance this example</p>",
    "videoUrl": "https://www.youtube.com/embed/SOa0ei3-irM",
"imageUrl" : "",
"status" : "Pending Approval",
"attending" : false,
"interested" : false,
"isBanner" : false,
"tempate" :"THIS SHOULD BE A TEMAPLTE ID",
"acceptButtonText" : "ATTENDING",
"rejectButtonText" : "NOT INTERESTED",
"hasButtons" :false ,
"userId" : "craig.haworth@ssa.co.za"
}
*/
  ngOnInit() {
  }

}

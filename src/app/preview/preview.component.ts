import { Component, OnInit, Pipe } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import * as Mustache from 'mustache'
import * as $ from 'jquery';
import { DataService } from '../data.service';

@Pipe({
	name: 'safeUrl'
})
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  dangerousUrl: string;
  trustedUrl: SafeUrl;
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;
  


 /*data=[
   {
   "title":"Preview Component",
  "address": "World of Golf",
  "category": "Sport & Recreation",
   "created": 1536061041218,
   createdDate: "2018-09-04T11:37:21.218Z",
     description: "World of Golf Event",
     "message":"Join number of users ",
           end: 1538218856000,
        hasButtons: false,
        "videoUrl":"https://www.youtube.com/embed/PUBnlbjZFAI"
      },{
        "title":"Preview Component",
        "address": "World of Golf",
        "category": "Sport & Recreation",
         "created": 1536061041218,
         createdDate: "2018-09-04T11:37:21.218Z",
           description: "World of Golf Event",
           "message":"Join number of users ",
                 end: 1538218856000,
              hasButtons: false,
              "videoUrl":"https://www.youtube.com/embed/SOa0ei3-irM"
      },{
        "title":"Gallery Images",
        "address": "World of Golf India",
        "category": "Sport & Recreation",
         "created": 1536061041218,
         createdDate: "2018-09-04T11:37:21.218Z",
           description: "World of Golf Event",
                 end: 1538218856000,
                 "message":"Join number of users ",
              hasButtons: false,
              "videoUrl":"https://www.youtube.com/embed/PUBnlbjZFAI"
      }]*/
     

  constructor(private dom: DomSanitizer,private service:DataService) {
 
  }
  ngOnInit() {
   
    //console.log(this.data)
 
  }

 


 


}


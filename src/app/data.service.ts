import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import * as Mustache from "mustache";



@Injectable({
  providedIn: 'root'
})
export class DataService {
  disableSave:any
  PreviewApi: any;
 previewData: any;
  template: any;
  mustache=require('../../backend/app/mustache.html')
  htmlData=require('../../backend/app/htmlData.html')
  Datahtml=require('../../backend/app/Data.html')

  data=
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
            "videoUrl":"https://www.youtube.com/embed/SOa0ei3-irM"
       }
 
  private url="assets/data.json"
  constructor(private http:HttpClient, private sanitizer: DomSanitizer) { 
    this.previewData = this.sanitizer.bypassSecurityTrustHtml(Mustache.render(this.mustache,this.data));
console.log(this.previewData)

  }

  getData():Observable<Data[]>{
   return this.http.get<Data[]>(this.url).map(res=>res)
   
 }
   
 DeleteImages(public_id){
  console.log('Im there in service')  
  console.log(public_id)
 return this.http.post('http://localhost:3000/delete',{'public_id': public_id})  
  .pipe(map((response: Response) =>{
    response.json()
    console.log("Image will be deleted")
    
  })) 
  
 }

 DownloadImage(public_id){
   console.log('im in download service')
   console.log(public_id)
   return this.http.post('http://localhost:3000/download',{'public_id': public_id})
   .pipe(map((response: Response) =>{
    response.json()
    console.log("Image will be download")
    
  })) 
  
 }
 checkForChange(){
   if((this.PreviewApi!==this.Datahtml)||(this.PreviewApi!==this.mustache)||(this.PreviewApi!==this.htmlData)){
    this.disableSave = false;
    console.log('Change detected');
  } else{
    this.disableSave = true;
    console.log('There is no change');
  
   }
 }
 


   }
   




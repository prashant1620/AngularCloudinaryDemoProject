import { Component, OnInit, NgZone, Input } from '@angular/core';
import { Photo } from '../model/photo';
import { Observable } from 'rxjs';
import { PhotoAlbum } from '../model/photo-album.service';
import { ButtonsConfig, ButtonsStrategy, PlainGalleryConfig, PlainGalleryStrategy, GridLayout, GalleryService, Image, ButtonEvent } from '@ks89/angular-modal-gallery';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { DataService } from '../data.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
    @Input()
    responses: Array<any>;
    testhtml='<h2>Hello</h2>'
  
    private hasBaseDropZoneOver: boolean = false;
    private uploader: FileUploader;
    private title: string;
 

   photos;
  

  images:Image[]
   = [ 
  new Image(1, {
    img: '../assets/images/gallery/img1.jpg',
    extUrl: 'http://www.google.com'
  }),
  new Image(2, {
    img: '../assets/images/gallery/img2.jpg',
    description: 'Description 2'
  }),
  new Image(3,
    {
      img: '../assets/images/gallery/img3.jpg',
      description: 'Description 3',
      extUrl: 'http://www.google.com'
    },
    {
      img: '../assets/images/gallery/thumbs/img3.png',
      title: 'custom title 2',
      alt: 'custom alt 2',
      ariaLabel: 'arial label 2'
    }
  ),
  new Image(4, {
    img: '../assets/images/gallery/img4.jpg',
    description: 'Description 4',
    extUrl: 'http://www.google.com'
  }),
  new Image(5, { img: '../assets/images/gallery/img5.jpg' }, { img: '../assets/images/gallery/thumbs/img5.jpg' })
];



  buttonsConfigFull: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.FULL
  };
  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: '80px', height: '80px' }, { length: 2, wrap: true })
  };

  constructor( private photoAlbum: PhotoAlbum,private galleryService: GalleryService, private sanitizer: DomSanitizer, private zone: NgZone,private cloudinary: Cloudinary,
    private http: HttpClient,private service:DataService) { 
        this.responses = [];
        this.title = '';
    }

  ngOnInit(): void {
    
   this.photos=this.photoAlbum.getPhotos('tagName');
   const uploaderOptions: FileUploaderOptions = {
    url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
    // Upload files automatically upon addition to upload queue
    autoUpload: true,
    // Use xhrTransport in favor of iframeTransport
    isHTML5: true,
    // Calculate progress independently for each uploaded file
    removeAfterUpload: true,
    // XHR request headers
    headers: [
      {
        name: 'X-Requested-With',
        value: 'XMLHttpRequest'
      }
    ]
  };
  this.uploader = new FileUploader(uploaderOptions);

  this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
    // Add Cloudinary's unsigned upload preset to the upload form
    form.append('upload_preset', this.cloudinary.config().upload_preset);
    // Add built-in and custom tags for displaying the uploaded photo in the list
    let tags = 'myphotoalbum';
    if (this.title) {
      form.append('context', `photo=${this.title}`);
      tags = `myphotoalbum,${this.title}`;
    }
    // Upload to a custom folder
    // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
    // In order to automatically create the folders based on the API requests,
    // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
    form.append('folder', 'angular_sample');
    // Add custom tags
    form.append('tags', tags);
    // Add file to upload
    form.append('file', fileItem);

    // Use default "withCredentials" value for CORS requests
    fileItem.withCredentials = false;
    return { fileItem, form };
  };

  // Insert or update an entry in the responses array
  const upsertResponse = fileItem => {

    // Run the update in a custom zone since for some reason change detection isn't performed
    // as part of the XHR request to upload the files.
    // Running in a custom zone forces change detection
    this.zone.run(() => {
      // Update an existing entry if it's upload hasn't completed yet

      // Find the id of an existing item
      const existingId = this.responses.reduce((prev, current, index) => {
        if (current.file.name === fileItem.file.name && !current.status) {
          return index;
        }
        return prev;
      }, -1);
      if (existingId > -1) {
        // Update existing item with new data
        this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
      } else {
        // Create new response
        this.responses.push(fileItem);
      }
    });
  };

  // Update model on completion of uploading a file
  this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
    upsertResponse(
      {
        file: item.file,
        status,
        data: JSON.parse(response)
      }
    );

  // Update model on upload progress event
  this.uploader.onProgressItem = (fileItem: any, progress: any) =>
    upsertResponse(
      {
        file: fileItem.file,
        progress,
        data: {}
      }
    );
}

updateTitle(value: string) {
  this.title = value;
}

// Delete an uploaded image
// Requires setting "Return delete token" to "Yes" in your upload preset configuration
// See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
deleteImage = function (data: any, index: number) {
  const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/delete_by_token`;
  const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
  const options = { headers: headers };
  const body = {
    token: data.delete_token
    //token: 'frv2ex7k'
  };
  this.http.post(url, body, options).subscribe(response => {
    console.log(`Deleted image - ${data.public_id} ${response.result}`);
    // Remove deleted item for responses
    this.responses.splice(index, 1);
  });
};

fileOverBase(e: any): void {
  this.hasBaseDropZoneOver = e;
}

getFileProperties(fileProperties: any) {
  // Transforms Javascript Object to an iterable to be used by *ngFor
  if (!fileProperties) {
    return null;
  }
  return Object.keys(fileProperties)
    .map((key) => ({ 'key': key, 'value': fileProperties[key] }));
}
   
  
deleteImages =function(public_id){
 if(confirm('Delete button clicked')){
  this.service.DeleteImages(public_id)
  .subscribe(data =>{
    console.log("image will be deleted")
  } ) 
 }else{
   console.log("cencel button clicked")
 }
  
}
downlaod =function(public_id){
  if(confirm('Download Button is clicked')){
       this.service.DownloadImage(public_id)
       .subscribe(data=>{
         console.log(data)
       })
  }else{
    console.log("Cencel button is clicked")
  }
}
    
  
  

}







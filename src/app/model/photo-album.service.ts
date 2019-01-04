import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Photo} from './photo';
import {Cloudinary} from '@cloudinary/angular-5.x';

@Injectable()
export class PhotoAlbum {

    constructor(private http: HttpClient, private cloudinary: Cloudinary) {
    }
     //private url='https://api.cloudinary.com/v1_1/prasanth99/resources/image'
    // private url='assets/images.json'
    getPhotos(tagName): Observable<Photo[]> {
        // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
        // and simply retrieve a list of all images with that tag.
       let url = this.cloudinary.url('myphotoalbum', {
            format: 'json',
            type: 'list',
            
            version: Math.ceil(new Date().getTime() / 1000)
        });
      
        
      

        return this.http
            .get(url)
            .pipe(map((data: any) => data.resources));
    }
}

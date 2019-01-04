import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';


const routes: Routes = [
  {
    path:'photos',
    component:PhotoListComponent
  },
  {
    path:'photos/new',
    component:PhotoAlbumComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

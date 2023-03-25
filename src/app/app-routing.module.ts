import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileListingComponent } from './file-listing/file-listing.component';


const routes: Routes = [
	{path: '', component: FileUploadComponent},
	{path: ':key', component: FileUploadComponent},
	{path: 'my-drops/:key', component: FileListingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

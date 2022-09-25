import { Component, OnInit } from '@angular/core';
import { FileClientService } from '../services/file-client.service';

import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-listing',
  templateUrl: './file-listing.component.html',
  styleUrls: ['./file-listing.component.css']
})
export class FileListingComponent implements OnInit {

	public secretPathKey: string = '';
	public filesData: any[] = [];

	constructor (private fileClient: FileClientService, 
  	private router: Router,
  	private route: ActivatedRoute) {

  	this.route.params.subscribe(uParams => {
    	let secretPathKey: string = uParams['key'];

    	if (secretPathKey == '' || secretPathKey == undefined) {
    		
    	} else {
    		this.secretPathKey = secretPathKey;
    	}

			this.fileClient.listSecretPath(this.secretPathKey).subscribe(res => {
				this.filesData = JSON.parse(res.data);
		    });
		});
  }

	ngOnInit(): void {
	}

	showIndexPage() {
		this.router.navigateByUrl('/'+this.secretPathKey).then( (e) => {
	        if (e) {
	            //console.log("Navigation is successful!");
	        } else {
	            //console.log("Navigation has failed!");
	        }
        });
	}

	downloadFile(filePath: string) {
		this.downloadBlobString
	}

	downloadBlobString(text, fileType, fileName) {
    var blob = new Blob([text], { type: fileType });

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, fileName);
    }
    else {
	      var a = document.createElement('a');
	      a.download = fileName;
	      a.href = URL.createObjectURL(blob);
	      a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
	      a.style.display = "none";
	      document.body.appendChild(a);
	      a.click();
	      document.body.removeChild(a);
	      setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
    }
	}

	deleteFile(fileID: string) {
		this.fileClient.deleteFileByID(fileID).subscribe(res => {
			this.fileClient.listSecretPath(this.secretPathKey).subscribe(res => {
				this.filesData = JSON.parse(res.data);
		    });
	    });
	}
}

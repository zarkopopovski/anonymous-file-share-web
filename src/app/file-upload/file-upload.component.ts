import { Component, OnInit } from '@angular/core';
import { FileClientService } from '../services/file-client.service';

import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public uploadedFiles: Array<File> = [];

 	public isFileDragDropAvailable: boolean = true;
  public isFileSaving: boolean = false;
  public isFileSaved: boolean = false;
  public hasResponse: boolean = false;
  public hasError: boolean = false;
  public errorMessage: string = '';

  public isFileSharing: boolean = false;

  public fileToken: string = '';
  public deleteToken: string = '';

  public totalTraffic: string = '';

  public fromEmail: string = '';
  public toEmail: string = '';
  public isShareFrom: boolean = false;
  public isNotifyOnDelete: boolean = false;

  public lifeTime: string = '30m';

  public secretPathKey: string = '';

  constructor (private fileClient: FileClientService, 
  	private router: Router,
  	private route: ActivatedRoute) {
    this.fileClient.getStats().subscribe(res => {
        this.totalTraffic = res.file_traffic;
    });

    	this.route.params.subscribe(uParams => {
      	let secretPathKey: string = uParams['key'];

      	if (secretPathKey == '' || secretPathKey == undefined) {
      		this.fileClient.genSecretPath().subscribe(res => {
		        this.secretPathKey = res.secret_path_key;
		    });
      	} else {
      		this.secretPathKey = secretPathKey;
      	}
	});
    
  }

  ngOnInit(): void {
  }

  public clear(): void {
      this.uploadedFiles = [];
  }

  public printFilesArray(): void {
  	console.log(this.uploadedFiles);
  }

  onSelect(event) {
    this.hasError = false;
    this.hasResponse = false;
    this.isFileSaved = false;
    this.errorMessage = '';
    this.uploadedFiles = [];

    this.uploadedFiles.push(...event.addedFiles);

    let fileForUpload: File = this.uploadedFiles[0];

    this.isFileSaving = true;
    this.fileClient.uploadAssets({file: fileForUpload, lifeTime: this.lifeTime, inPath: this.secretPathKey}).subscribe(res => {
      this.isFileSaving = false;

      this.hasResponse = true;
      this.isFileSaved = true;

      this.fileToken = res.file_token;
      this.deleteToken = res.delete_token;

      this.fileClient.getStats().subscribe(res => {
        this.totalTraffic = res.file_traffic;
      });
    }, err => {
      this.errorMessage = err.error;
      this.isFileSaving = false;

      this.hasResponse = true;
      this.hasError = true;
    });
  }

  setNewLifeTime(event) {
    if (this.fileToken != '') {
      this.fileClient.updateFileLifeTime({sharedKey: this.fileToken, lifeTime: this.lifeTime}).subscribe(res => {
        this.hasResponse = true;
      }, err => {
        this.errorMessage = err.error;
        this.hasResponse = true;
        this.hasError = true;
      });
    }
  }

  onRemove(event) {
    console.log(event);
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  sendEmail() {
    let sharedType: string = 'personal';
    let notify: string = 'no';

    if (this.isShareFrom == true) {
      sharedType = 'shared';
    }

    if (this.isNotifyOnDelete == true) {
      notify = 'yes';
    }

    let shareData = {
      senderEmail: this.fromEmail,
      receiverEmail: this.toEmail,
      shareType: sharedType,
      sharedKey: this.fileToken,
      notifyMe: notify,
      dropsPath: this.secretPathKey
    };

    this.isFileSharing = true;
    this.fileClient.shareAssetLinkOnEmail(shareData).subscribe(res => {
      this.isFileSharing = false;

      this.hasResponse = false;
      this.isFileSaved = false;

      this.fileToken = '';
      this.deleteToken = '';

      this.lifeTime = '30m';
    },
    err => {
      this.isFileSharing = false;
      this.lifeTime = '30m';
    });
  }

  showDropListing() {
      this.router.navigateByUrl('my-drops/'+this.secretPathKey).then( (e) => {
        if (e) {
            //console.log("Navigation is successful!");
        } else {
            //console.log("Navigation has failed!");
        }
      });
  }
}

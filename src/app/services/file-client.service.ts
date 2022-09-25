import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

import { 
  BASE_URL, 
  API_PATH, 
  FILES_PATH,
  UPLOAD_FILE_PATH,
  GET_FILE_PATH,
  DELETE_FILE_PATH,
  SHARE_FILE_PATH,
  FILE_STATS_PATH,
  UPDATE_FILE_LIFE_TIME_PATH,
  GEN_SECRET_PATH,
  LIST_PATH
  } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class FileClientService {

  constructor(private http: HttpClient) { }

  /**
   * Upload Assets
   * 
   * @param assetData 
   */
  public uploadAssets(assetData: any): Observable<any> {
    let params = new FormData();
    
    params.append('file', assetData.file);
    params.append('life_time', assetData.lifeTime);

    params.append('in_path', assetData.inPath);

    const httpOptions = {
    };

    return this.http.post<any>(BASE_URL+FILES_PATH+UPLOAD_FILE_PATH, params, httpOptions).pipe(map((response:any) => {
      const dataResult = response;
      
      return dataResult;
    }),
    catchError((err:HttpErrorResponse) => {
      return throwError(err);
    }));
  }

  /**
   * Upload Assets
   * 
   * @param shareData 
   */
  public shareAssetLinkOnEmail(shareData: any): Observable<any> {
    let params = new FormData();
    
    params.append('sender_email', shareData.senderEmail);
    params.append('receiver_email', shareData.receiverEmail);
    params.append('shared_key', shareData.sharedKey);
    params.append('share_type', shareData.shareType);

    params.append('notify_me', shareData.notifyMe);
    params.append('drops_path', shareData.dropsPath);

    const httpOptions = {
    };

    return this.http.post<any>(BASE_URL+FILES_PATH+SHARE_FILE_PATH, params, httpOptions).pipe(map((response:any) => {
      const dataResult = response;
      
      return dataResult;
    }),
    catchError((err:HttpErrorResponse) => {
      return throwError(err);
    }));
  }

  /**
   * Upload Assets
   * 
   * @param shareData 
   */
  public updateFileLifeTime(shareData: any): Observable<any> {
    let params = new FormData();
    
    params.append('life_time', shareData.lifeTime);
    params.append('shared_key', shareData.sharedKey);

    const httpOptions = {
    };

    return this.http.post<any>(BASE_URL+FILES_PATH+UPDATE_FILE_LIFE_TIME_PATH, params, httpOptions).pipe(map((response:any) => {
      const dataResult = response;
      
      return dataResult;
    }),
    catchError((err:HttpErrorResponse) => {
      return throwError(err);
    }));
  }

  /**
   * Get Stats
   * 
   */
  public getStats(): Observable<any> {
    const httpOptions = {
    };

    return this.http.get<any>(BASE_URL+FILES_PATH+FILE_STATS_PATH, httpOptions).pipe(map((response:any) => {
      const dataResult = response;
      
      return dataResult;
    }),
    catchError((err:HttpErrorResponse) => {
      return throwError(err);
    }));
  }

  /**
   * Get Stats
   * 
   */
  public genSecretPath(): Observable<any> {
    const httpOptions = {
    };

    return this.http.get<any>(BASE_URL+FILES_PATH+GEN_SECRET_PATH, httpOptions).pipe(map((response:any) => {
      const dataResult = response;
      
      return dataResult;
    }),
    catchError((err:HttpErrorResponse) => {
      return throwError(err);
    }));
  }

  /**
   * Upload Assets
   * 
   * @param shareData 
   */
  public listSecretPath(shareData: any): Observable<any> {
    let params = new FormData();
    
    params.append('in_path', shareData);

    const httpOptions = {
    };

    return this.http.post<any>(BASE_URL+FILES_PATH+LIST_PATH, params, httpOptions).pipe(map((response:any) => {
      const dataResult = response;
      
      return dataResult;
    }),
    catchError((err:HttpErrorResponse) => {
      return throwError(err);
    }));
  }

  /**
   * Get Stats
   * 
   */
  public deleteFileByID(fileID: string): Observable<any> {
    const httpOptions = {
    };

    return this.http.get<any>(BASE_URL+FILES_PATH+DELETE_FILE_PATH+'/'+fileID, httpOptions).pipe(map((response:any) => {
      const dataResult = response;
      
      return dataResult;
    }),
    catchError((err:HttpErrorResponse) => {
      return throwError(err);
    }));
  }
}

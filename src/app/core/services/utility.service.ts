import * as I from '../../shared/interfaces/common.interface';

import {Observable, throwError} from 'rxjs';

import {ConfirmModalComponent} from '../../shared/components/dialogs/confirm-dialog/confirm-dialog.modal.component';
import {HttpClient} from '@angular/common/http';
import {IDropdownEntityState} from '../../shared/interfaces/common.interface';
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AppUtilityService {
  baseUrl = '/EAPService/api/v1/';

  constructor(private http: HttpClient) {
  }

  hasValue(): boolean {
    return true;
  }

  dateFormat(dateStr: string): string | undefined {
    if (dateStr !== null && dateStr !== undefined && dateStr.length > 0) {
      const rawDate = dateStr.split(' ')[0];
      const dateArr = rawDate.split('-');
      const [dd, mm, yyyy] = dateArr;
      return [mm, dd, yyyy].join('/');
    }
    return;
  }

  dateTimeFormat(dateStr: string, dateFormat?: string): string | undefined {
    if (dateStr !== null && dateStr !== undefined && dateStr.length > 0) {
      if (!dateFormat) {
        // if no type format was defined we assume its already in a castable date format
        const dateCast = new Date(dateStr);
        const date = [dateCast.getMonth(), dateCast.getDay(), dateCast.getFullYear()].join('/');
        const rawHrs = dateCast.getHours();
        const rawMinutes = dateCast.getMinutes();
        let minutes: string = dateCast.getMinutes().toString();
        if (rawMinutes <= 9) {
          minutes = '0' + rawMinutes;
        }
        const suffix = rawHrs >= 12 ? 'PM' : 'AM';
        return date + ' ' + ((rawHrs + 11) % 12 + 1) + ':' + minutes + ' ' + suffix;
      } else if (dateFormat === 'dmyt') {
        const rawDate = dateStr.split(' ')[0];
        const rawTime = dateStr.split(' ')[1];
        const dateArr = rawDate.split('-');
        const [dd, mm, yyyy] = dateArr;
        const date = [mm, dd, yyyy].join('/');
        const rawHrs = rawTime.split(':')[0];
        const rawMinutes = rawTime.split(':')[1];
        const suffix = Number(rawHrs) >= 12 ? 'PM' : 'AM';
        return date + ' ' + ((Number(rawHrs) + 11) % 12 + 1) + ':' + rawMinutes + ' ' + suffix;
      }
    }
    return;
  }

  convertDMYtoMDY(dateStr: string): string {
    if (dateStr !== null && dateStr !== undefined && dateStr.length > 0) {
      const rawDate = dateStr.split(' ')[0];
      const rawTime = dateStr.split(' ')[1];
      const rawDay = rawDate.split('-')[0];
      const rawMonth = rawDate.split('-')[1];
      const rawYear = rawDate.split('-')[2];
      return rawMonth + '-' + rawDay + '-' + rawYear + ' ' + (rawTime && rawTime.length > 0 ? rawTime : '');
    }
    return '';
  }

  dateFormatInput(dateStr: string): string | undefined {
    if (dateStr !== null && dateStr !== undefined && dateStr.length > 0) {
      const rawDate = dateStr.split(' ')[0];
      const dateArr = rawDate.split('-');
      const [dd, mm, yyyy] = dateArr;
      return [yyyy, mm, dd].join('-');
    }
    return;
  }

  formatPhoneNumber(phoneNumberString: string): string {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

  fileSizeInMB(data: number): string | undefined {
    if (data) {
      return `${Math.round((data / 1000) * 100) / 100}MB`;
    } else {
      return;
    }
  }

  fileType(file: any): string | void {
    if (typeof FileReader !== 'undefined') {
      return file.files[0].type;
    }
    return;
  }

  getFileSize(): Observable<any> {
    const apiURL = `${this.baseUrl}sysparam?code=UPLOAD_FILE_SIZE`;
    return this.http.get(apiURL).pipe(catchError(this.handleError));
  }

  fileToLarge(file: any, scope?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof FileReader !== 'undefined') {
        const hasScope = scope ? scope : this;
        const size = file.files[0].size;
        hasScope.getFileSize().subscribe((res: { idleTimeout: string }) => {
          const fileSizeBigInt = Number(res.idleTimeout);
          // return fileSize <= 10000 ? false : true;
          resolve(size <= fileSizeBigInt ? false : true);
        }, (err: Error) => {
          reject(err);
        });
      }
    });
  }

  base64toBlob(b64Data: string, contentType = '', sliceSize = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  displayFn(org: string | IDropdownEntityState): string {
    if (typeof org === 'string') {
      return org;
    }
    if (org && org.value) {
      return '';
    }
    return org ? org.code + ' - ' + org.description : '';
  }

  displayFnID(org: any, type?: string): string {
    if (typeof org === 'string') {
      return org;
    }
    if (org && org.value) {
      return '';
    }
    if (typeof org === 'object' && org.type) {
      return type ? org[type] : null;
    }
    return '';
  }

  displayShortFn(org: any): string {
    if (typeof org === 'string') {
      return org;
    }
    if (org && org.value) {
      return '';
    }
    return org ? org.description : undefined;
  }

  displayCodeFn(org: any): string {
    if (typeof org === 'string') {
      return org;
    }
    if (org && org.value) {
      return '';
    }
    return org ? org.code : undefined;
  }

  reverseDisplayShortFn(org: string): IDropdownEntityState {
    return {
      id: '',
      code: '',
      description: org
    };
  }

  reverseDisplayFn(org: string): IDropdownEntityState {
    const splitStr = org.split(' - ');
    return {
      id: '',
      code: splitStr[0],
      description: splitStr[1]
    };
  }

  downloadDoc(fileId: string): Observable<any> {
    return this.downloadFile(fileId);
  }

  downloadFile(fileId: string): Observable<any> {
    const apiURL = `${this.baseUrl}content/file/${fileId}`;
    return this.http.get(apiURL);
  }

  getRootURL(url: string): string {
    if (url) {
      while (url.charAt(0) === '/') {
        url = url.substring(1);
      }
      url = url.replace(/\/+$/, '');
      const urlSegments = url.split('/');
      if (urlSegments && urlSegments.length >= 1) {
        return urlSegments[0];
      }
    }
    return '';
  }

  public handleError(error: any): Observable<any> {
    return throwError(error || 'Server error');
  }

  // html function
  iconClasses(item: I.INavigationUIItemState, color = true): any {
    if (item) {
      let cssClasses: { [key: string]: any } = {};
      cssClasses = {fa: true};
      if (item.icon) {
        item.icon.split(' ').forEach((x: string) => {
          if (x.trim().startsWith('fa-') ||
            x.trim() === 'fab' || x.trim() === 'fas' ||
            x.trim().startsWith('fab-') ||
            x.trim().startsWith('fas-')) {
            cssClasses[x.trim()] = true;
          } else {
            cssClasses['fa-' + x.trim()] = true;
          }
        });
      }
      if (item.color && color) {
        cssClasses['text-' + item.color] = true;
      }
      return cssClasses;
    }
    return '';
  }

  /*keeping this for quick debugging purposes*/
  public print(value: any): boolean {
    console.log(value);
    return true;
  }

  timeSince(sinceDate: string | Date): string {
    const currentDate = new Date();
    sinceDate = new Date(sinceDate);
    const daysSince = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
      Date.UTC(sinceDate.getFullYear(), sinceDate.getMonth(), sinceDate.getDate())) / (1000 * 60 * 60 * 24)) - 1;
    const returnTime = (daysSince >= 0 ? daysSince : 0) + ' days ago';
    return returnTime;
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

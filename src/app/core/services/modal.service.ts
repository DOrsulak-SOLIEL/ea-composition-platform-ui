import { Component, Injectable, TemplateRef, Type } from '@angular/core';

import { Observable, Subject } from 'rxjs';

export type ContentType<T> = string | TemplateRef<T> | Type<T>;

export interface ModalMsgType {
  type: 'open-dlg' | 'close-dlg' | 'save-close-dlg';
  compRef?: Component;
  model?: any;
}

@Injectable()
export class ModalService {
  private compRef: any = null;
  private model = {};
  private subject = new Subject<ModalMsgType>();

  constructor() {
  }

  open(compRef: Component, model: any): void {
    this.compRef = compRef;
    this.model = model;
    this.notify({type: 'open-dlg', compRef, model});
  }

  saveAndClose(): void {
    this.notify({type: 'save-close-dlg'});
  }

  close(): void {
    this.notify({type: 'close-dlg'});
  }

  getModel(): any {
    return this.model;
  }

  getComponentRef(): Component | null {
    return this.compRef;
  }

  notify(msg: ModalMsgType): void {
    this.subject.next(msg);
  }

  unsubscribe(): void {
    this.subject.unsubscribe();
  }

  getObservable(): Observable<ModalMsgType> {
    return this.subject.asObservable();
  }
}

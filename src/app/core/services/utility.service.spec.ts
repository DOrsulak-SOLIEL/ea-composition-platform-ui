import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppStorageService } from './storage.service';
import { AppUtilityService } from './utility.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('Utility Service', () => {
  let utilService: AppUtilityService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        AppStorageService,
        AppUtilityService
      ]
    });
    utilService = TestBed.get(AppUtilityService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('#hasValue should return true', () => {
    expect(utilService.hasValue()).toBeTruthy();
  });
  it('#dateFormat should return a properly formatted date given a string', () => {
    expect(utilService.dateFormat('17-12-2020 02:04:40')).toEqual('12/17/2020');
  });
  it('#dateFormat should return  if given value is null', () => {
    expect(utilService.dateFormat('')).toBeFalsy();
  });
  it('#formatPhoneNumber should return a properly formatted phone number given a string', () => {
    expect(utilService.formatPhoneNumber('13013238132')).toEqual('+1 (301) 323-8132');
  });
  it('#fileSizeInMB should a string with MB value given a number', () => {
    expect(utilService.fileSizeInMB(30000)).toEqual('30MB');
  });
  it('#fileSizeInMB should return  if given value is null', () => {
    expect(utilService.fileSizeInMB(0)).toBeFalsy();
  });
  it('#displayFn given a string it should return the string', () => {
    expect(utilService.displayFn('Code - Description value')).toEqual('Code - Description value');
  });
  it('#displayFn given a object it should return the string', () => {
    expect(utilService.displayFn({
      id: 'Code',
      code: 'Code',
      description: 'Description value'
    })).toEqual('Code - Description value');
  });
  it('#displayFn given a object with a value passed it will return null', () => {
    expect(utilService.displayFn({
      id: 'Code',
      code: 'Code',
      description: 'Description value',
      value: 'True Value'
    })).toBeFalsy();
  });
  it('#displayFnID given a string it should return the string', () => {
    expect(utilService.displayFnID('Code - Description value')).toEqual('Code - Description value');
  });
  it('#displayFnID given a object with a type it should return the string of the type', () => {
    expect(utilService.displayFnID({code: 'Code', description: 'Description value'}, 'code')).toEqual('Code');
  });
  it('#displayFnID given a object with a value passed it will return null', () => {
    expect(utilService.displayFnID({
      code: 'Code',
      description: 'Description value',
      value: 'True Value'
    })).toBeFalsy();
  });
  it('#displayShortFn given a string it should return the string', () => {
    expect(utilService.displayShortFn('Code - Description value')).toEqual('Code - Description value');
  });
  it('#displayShortFn given a object it should return the string', () => {
    expect(utilService.displayShortFn({
      code: 'Code',
      description: 'Description value'
    })).toEqual('Description value');
  });
  it('#displayShortFn given a object with a value passed it will return null', () => {
    expect(utilService.displayShortFn({
      code: 'Code',
      description: 'Description value',
      value: 'True Value'
    })).toBeFalsy();
  });
  it('#displayCodeFn given a string it should return the string', () => {
    expect(utilService.displayCodeFn('Code - Description value')).toEqual('Code - Description value');
  });
  it('#displayCodeFn given a object it should return the string', () => {
    expect(utilService.displayCodeFn({code: 'Code', description: 'Description value'})).toEqual('Code');
  });
  it('#displayCodeFn given a object with a value passed it will return null', () => {
    expect(utilService.displayCodeFn({
      code: 'Code',
      description: 'Description value',
      value: 'True Value'
    })).toBeFalsy();
  });
  it('#reverseDisplayShortFn given a string it should return the object', () => {
    expect(utilService.reverseDisplayShortFn('Description value')).toEqual({
      id: '',
      code: '',
      description: 'Description value'
    });
  });
  it('#reverseDisplayFn given a string it should return the object', () => {
    expect(utilService.reverseDisplayFn('Code - Description value')).toEqual({
      id: '',
      code: 'Code',
      description: 'Description value'
    });
  });
  it('#downloadFile get file data from server', () => {
    const testFile = {};
    utilService.downloadFile('test').subscribe(file => {
      expect(file).toBeTruthy();
    });
  });
});

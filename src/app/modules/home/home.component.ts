import {AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as vis from 'vis';
export interface Edges {
  friend: boolean;
  teacher: boolean;
  parent: boolean;
}

@Component({
  selector: 'entry-network',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { Edge, Node, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { nodes,  links } from './shared/models/data';
import { Subject } from 'rxjs';
import {BlazegraphService} from "./core/services/blazegraph.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor( private blazegraphService: BlazegraphService) {
  }
  title = 'ea-portal-ui';

  nodes: Node[] = nodes;
  //clusters: ClusterNode[] = clusters;

  links: Edge[] = links;

  layout: string | Layout = 'dagreCluster';
  layouts: any[] = [
    {
      label: 'Dagre',
      value: 'dagre',
    },
    {
      label: 'Dagre Cluster',
      value: 'dagreCluster',
      isClustered: true,
    },
    {
      label: 'Cola Force Directed',
      value: 'colaForceDirected',
      isClustered: true,
    },
    {
      label: 'D3 Force Directed',
      value: 'd3ForceDirected',
    },
  ];

  // line interpolation
  curveType: string = 'Bundle';
  curve: any = shape.curveLinear;
  interpolationTypes = [
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];

  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = true;

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = false;
  autoCenter: boolean = false;

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  data: any;
  visjsData: any;

  ngOnInit() {
/*     this.blazegraphService.requestData();
     this.blazegraphService.getResponseData().subscribe( data => {
       this.nodes = data.nodes;
       this.links = data.links;
     });*/

     this.blazegraphService.getAPIMock().subscribe( data => {
       this.data = data;
       console.log(this.data);
       this.visjsData = this.translateDataVISJS(this.data);
     });
    this.setInterpolationType(this.curveType);
  }

  setInterpolationType(curveType: string) {
    console.log('Hello2')
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }

  setLayout(layoutName: string): void {
    const layout = this.layouts.find(l => l.value === layoutName);
    this.layout = layoutName;
    if (!layout.isClustered) {
      // @ts-ignore
      this.clusters = undefined;
    } /*else {
      this.clusters = clusters;
    }*/
  }

  translateDataVISJS(rsp: any): any {
    let visFormatNodes = [];
    rsp.head.vars.forEach((item: string) => {
      visFormatNodes.push({
        id: visFormatNodes.length + 1,
        label: item
      });
    });

    return rsp;
  }

}

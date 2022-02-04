import {Component, Input, OnInit} from '@angular/core';
import * as vis from 'vis';
import { Network, DataSet, Node, Edge, IdType } from 'vis';
import {EdgesTest, NodesTest, SPEdges, SPNodes} from "../models/data";
export interface Edges {
  friend: boolean;
  teacher: boolean;
  parent: boolean;
}

@Component({
  selector: 'app-visjs-example',
  templateUrl: './visjs-example.component.html',
  styleUrls: ['./visjs-example.component.css']
})

export class VisjsExampleComponent implements OnInit {
  @Input() data: any;
  nodes: DataSet<any> = new vis.DataSet(SPNodes);

  nodesTest: DataSet<any> = new vis.DataSet(NodesTest);

  edgesTest: DataSet<any>  = new vis.DataSet(EdgesTest);

  edges: DataSet<any>  = new vis.DataSet(SPEdges);

  nodeFilterValue = "";

  edgesFilterValues: Edges = {
    friend: true,
    teacher: true,
    parent: true,
  };

  edgesFilter = (edge: any) => {
    return this.edgesFilterValues[edge.relation as keyof Edges];
  };

  nodesView: any;
  edgesView: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
    this.updateFilter();
    this.updateEdges();
    this.startNetwork({ nodes: this.nodesView, edges: this.edgesView });
    this.startNetworkTest({ nodes: this.nodesTest, edges: this.edgesTest });
  }

  startNetwork(data: any) {
    const container = document.getElementById("mynetwork")!;
    const options = {
      edges: {
        length: 100 // Longer edges between nodes.
      },
      physics: {
        enabled: true,
        solver: "repulsion",
        repulsion: {
          nodeDistance: 400 // Put more distance between the nodes.
        }
      }
    };
    const network = new vis.Network(container, data, options);
    network.stabilize();
  }

  startNetworkTest(data: any) {
    const container = document.getElementById("mynetworkTest")!;
    const options = {};
    const networkTest = new vis.Network(container, data, options);
    networkTest.stabilize();
  }

  updateFilter(): void {
    this.nodesView = this.nodes.get().filter((node: any) => {
      if (this.nodeFilterValue === "") {
        return true;
      }
      switch (this.nodeFilterValue) {
        case "kid":
          return node.age === "kid";
        case "adult":
          return node.age === "adult";
        case "male":
          return node.gender === "male";
        case "female":
          return node.gender === "female";
        default:
          return true;
      }
    });
  }

  updateEdges(): void {
    this.edgesView = this.edges.get().filter((edge: any) => {
      return this.edgesFilterValues[edge.relation as keyof Edges];
    });
  }

  filterUpdated(e: any): void {
    this.nodeFilterValue = e.target.value;
    this.updateFilter();
    this.startNetwork({ nodes: this.nodesView, edges: this.edgesView });
  }

  edgesUpdated(e: any): void{
    const { value, checked } = e.target;
    this.edgesFilterValues[value as keyof Edges ] = checked;
    this.updateEdges();
    this.startNetwork({ nodes: this.nodesView, edges: this.edgesView });
  }
}

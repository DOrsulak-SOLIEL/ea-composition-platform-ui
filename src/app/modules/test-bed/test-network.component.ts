import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import * as vis from 'vis';
import { Network, DataSet, Node, Edge, IdType } from 'vis';
import {EdgesTest, NodesTest, SPEdges, SPNodes} from "../../shared/models/data";
import {BlazegraphService} from "../../core/services/blazegraph.service";
export interface Edges {
  friend: boolean;
  teacher: boolean;
  parent: boolean;
}

@Component({
  selector: 'test-network',
  templateUrl: './test-network.component.html',
  styleUrls: ['./test-network.component.css']
})

export class TestNetworkComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('mynetworkTest', { static: false }) mynetworkTest!: ElementRef;
  @ViewChild('mynetwork', { static: false }) mynetwork!: ElementRef;
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

  network: vis.Network | any= null;
  networkTest: vis.Network | any= null;

  constructor(private blazegraphService: BlazegraphService) { }
  ngAfterViewInit() {
/*    this.blazegraphService.getAPIMock().subscribe( data => {
      this.data = data;
      console.log(this.data);
      this.data = this.translateDataVISJS(this.data);
      console.log(this.data);
        this.updateFilter();
        this.updateEdges();
        this.startNetwork({ nodes: this.nodesView, edges: this.edgesView });
        this.startNetworkTest({ nodes: this.nodesTest, edges: this.edgesTest });
    });*/
    // console.log(this.data);
    // this.data = this.translateDataVISJS(this.data);
    // console.log(this.data);
    this.updateFilter();
    this.updateEdges();
    this.startNetwork({ nodes: this.nodesView, edges: this.edgesView });
    this.startNetworkTest({ nodes: this.nodesTest, edges: this.edgesTest });
  }
  ngOnInit(): void {
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

  destroy(): void {
    if (this.network !== null) {
      this.network.destroy();
      this.network = null;
    }

  }

  destroyTest(): void {
    if (this.networkTest !== null) {
      this.networkTest.destroy();
      this.networkTest = null;
    }
  }

  ngOnDestroy(): void {
    this.destroyTest();
    this.destroy();
  }

  startNetwork(data: any) {
    if (data) {
    this.destroy();
    const container = this.mynetwork;
      console.log(container);
      const options = {
      height: '100%',
      width: '100%',
      edges: {
        length: 100 // Longer edges between nodes.
      },
      physics: {
        enabled: true,
        solver: "forceAtlas2Based",
        repulsion: {
          nodeDistance: 400 // Put more distance between the nodes.
        }
      }
    };
    console.log(container);
      console.log(data);
      this.network = new vis.Network(container.nativeElement, data, options);
    this.network.stabilize();
    }
  }

  startNetworkTest(data: any) {
    this.destroyTest();
    const container = this.mynetworkTest;
    console.log(container);
    const options = {
      physics: {
        enabled: true,
        solver: "forceAtlas2Based",
        repulsion: {
          nodeDistance: 400 // Put more distance between the nodes.
        }}};
    this.networkTest = new vis.Network(container.nativeElement, data, options);
    this.networkTest.stabilize();
    this.networkTest.fit();
    this.networkTest.on("click", (e: any) => {
      let idKey = e.nodes[0];
      this.toggleNodeVisibility(idKey);
    });
  }

  toggleNodeVisibility(nodeId: any): void {
    if (nodeId) {
      // obj is node that is clicked
      let obj: any = this.nodesTest.get(nodeId);
      if (obj) {
        const ishidden = obj.isCollapsed;
        this.nodesTest.update({
          ...obj,
          isCollapsed: !ishidden
        });
        // get list of edges which are from node clicked
        const matchingEdges = EdgesTest.filter(item => {
          return item.from === nodeId
        });
        // lookup node for each edge 'to' and toggle hidden
        matchingEdges.forEach((item: any) => {
          // get list of edges which are from node clicked, filter out any non-removeable links
          const closableItems = EdgesTest.filter(edge => {
            return edge.to === item.to && this.nodesTest.get(edge.to)?.hidden === false;
          });
          if (closableItems.length === 0) {
            let nodeObj: any = this.nodesTest.get(item.to);
            console.log('toggling:');
            console.log(nodeObj);
            this.nodesTest.update({
              ...nodeObj,
              hidden: !ishidden
            });
            this.toggleNodeVisibility(nodeObj.id);
            console.log(!ishidden);
          }
        });
        const data = { nodes: this.nodesTest, edges: this.edgesTest };

        this.networkTest.setData(data);
        // this.startNetworkTest({nodes: this.nodesTest, edges: this.edgesTest});
      }
    }
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
    if (!this.edgesView ) {
      this.edgesView = this.edges.get().filter((edge: any) => {
        return this.edgesFilterValues[edge.relation as keyof Edges];
      });
    } else {
      this.edgesView.update(this.edges.get().filter((edge: any) => {
        return this.edgesFilterValues[edge.relation as keyof Edges];
      }));
    }

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

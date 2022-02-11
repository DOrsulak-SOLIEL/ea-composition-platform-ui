import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import * as vis from 'vis';
import {Network, DataSet, Node, Edge, IdType} from 'vis';
import {EdgesTest, NodesTest, SPEdges, SPNodes} from "../../../shared/models/data";
import {EntityNetworkService} from "./entity-network.service";

export interface Edges {
  friend: boolean;
  teacher: boolean;
  parent: boolean;
}

@Component({
  selector: 'entry-network',
  templateUrl: './entity-network.component.html',
  styleUrls: ['./entity-network.component.css']
})

export class EntityNetworkComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myEntityNetwork', {static: false}) myEntityNetwork!: ElementRef;

  nodes: DataSet<any> = new vis.DataSet();
  edges: DataSet<any> = new vis.DataSet();
  types = <any>[];
  errMsg = '';

  network: vis.Network | any = null;
  formValues: any = {
    entity: {
      value: {id: '', name: ''},
      filteredOptions: []
    },
    node: {
      value: {id: '', name: ''},
      filteredOptions: []
    },
    type: {
      value: {id: '', name: ''},
      filteredOptions: []
    }
  };

  constructor(private entityNetworkService: EntityNetworkService) {
  }

  ngAfterViewInit() {
    //this.startNetwork({nodes: this.nodes, edges: this.edges});
  }

  ngOnInit(): void {
    this.getEntities();
  }

  destroy(): void {
    if (this.network !== null) {
      this.network.destroy();
      this.network = null;
    }

  }

  ngOnDestroy(): void {
    this.destroy();
  }

  getEntities(): void {
    this.entityNetworkService.getEntities().subscribe({
        next: (resp) => {
          this.errMsg = '';
          this.formValues.entity.filteredOptions = resp;
          console.log(resp);
        },
        error: (err) => {
          this.errMsg = (err.statusText ? err.statusText + ': ' : '') + (err.error?.message ||
            (err.error && err.error.length && err.error[0].message) || err.message || err.description || 'HTTP Response Error');
        }
      }
    );
  }

  getNodes(): void {
    console.log('getting node');
    this.entityNetworkService.getNodes().subscribe({
        next: (resp) => {
          this.errMsg = '';
          this.formValues.node.filteredOptions = resp;
          console.log(resp);
        },
        error: (err) => {
          this.errMsg = (err.statusText ? err.statusText + ': ' : '') + (err.error?.message ||
            (err.error && err.error.length && err.error[0].message) || err.message || err.description || 'HTTP Response Error');
        }
      }
    );
  }

  getNetwork(): void {
    this.entityNetworkService.getNetwork().subscribe({
        next: (resp) => {
          this.errMsg = '';
          this.edges = new vis.DataSet(resp.edges);
          this.nodes = new vis.DataSet(resp.nodes);
          console.log(resp);
          this.formValues.type.filteredOptions = [{id: 'All', name: 'All'}]
          this.getUniques(NodesTest).forEach((type: string) => {
            this.formValues.type.filteredOptions.push({id: type, name: type});
          });
          this.startNetwork({nodes: this.nodes, edges: this.edges});
        },
        error: (err) => {
          this.errMsg = (err.statusText ? err.statusText + ': ' : '') + (err.error?.message ||
            (err.error && err.error.length && err.error[0].message) || err.message || err.description || 'HTTP Response Error');
        }
      }
    );
  }

  // called on user entity dropdown selection
  entityChange(): void {
    console.log('entity change');
    console.log(this.formValues);
    if (this.formValues.entity.value.id) {
      this.getNodes();
    }
  }

  // called on user node dropdown selection
  nodeChange(): void {
    if (this.formValues.entity.value.id && this.formValues.nodes.value.id) {
      this.getNetwork();
    }
  }

  startNetwork(data: any) {
    if (data) {
      this.destroy();
      const container = this.myEntityNetwork;
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
        },
        manipulation: {
          enabled: true
        },
        interaction: {
          hover: true,
        },
      };
      this.network = new vis.Network(container.nativeElement, data, options);
      this.network.stabilize();
      this.network.on("click", (e: any) => {
        let idKey = e.nodes[0];
        this.toggleNodeVisibility(idKey);
      });
    }
  }

  // keeping for now until we know what we want
  toggleNodeVisibility(nodeId: any): void {
    /*    if (nodeId) {
          // obj is node that is clicked
          let obj: any = this.nodes.get(nodeId);
          if (obj) {
            const ishidden = obj.isCollapsed;
            this.nodes.update({
              ...obj,
              isCollapsed: !ishidden
            });
            // get list of edges which are from node clicked
            const matchingEdges = EdgesTest.filter(item => {
              return item.from === nodeId;
            });
            // lookup node for each edge 'to' and toggle hidden
            matchingEdges.forEach((item: any) => {
              // get list of edges which are from node clicked, filter out any non-removeable links
              const closableItems = EdgesTest.filter(edge => {
                return edge.to === item.to && this.nodes.get(edge.to)?.hidden === false;
              });
              if (closableItems.length === 0) {
                let nodeObj: any = this.nodes.get(item.to);
                console.log('toggling:');
                console.log(nodeObj);
                this.nodes.update({
                  ...nodeObj,
                  hidden: !ishidden
                });
                this.toggleNodeVisibility(nodeObj.id);
                console.log(!ishidden);
              }
            });
            // this.startNetwork({nodes: this.nodes, edges: this.edges});
          }
        }*/
  }

  // keeping for now until we kanow what we want
  updateEdges(): void {
    /*    if (!this.edgesView) {
          this.edgesView = this.edges.get().filter((edge: any) => {
            return this.edgesFilterValues[edge.relation as keyof Edges];
          });
        } else {
          this.edgesView.update(this.edges.get().filter((edge: any) => {
            return this.edgesFilterValues[edge.relation as keyof Edges];
          }));
        }*/
  }

  // keeping for now until we know what we want
  edgesUpdated(e: any): void {
    /*    const {value, checked} = e.target;
        this.edgesFilterValues[value as keyof Edges] = checked;
        this.updateEdges();
        this.startNetwork({nodes: this.nodesView, edges: this.edgesView});*/
  }

  getUniques(array: any[]): any[] {
    return array.map(item => item.type)
      .filter((value, index, self) => self.indexOf(value) === index)
  }

  // keeping for now until we kanow what we want
  typeChange(event: any): void {
    /*    this.nodesView = this.nodes.get().filter((node: any) => {
          if (event && event.id && event.id === "All") {
            return true;
          }
          return node.type === event.id;
        });
        console.log(this.nodesView);
        this.startNetwork({nodes: this.nodesView, edges: this.edges});*/
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Network, Options} from 'vis-network/standalone';
import {NodesTest} from "../../../shared/models/data";
import {EntityNetworkService} from "./entity-network.service";
import {
  IDropdownEntityState,
  networkColors
} from "../../../shared/interfaces/common.interface";

@Component({
  selector: 'entry-network',
  templateUrl: './entity-network.component.html',
  styleUrls: ['./entity-network.component.css']
})

export class EntityNetworkComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myEntityNetwork', {static: false}) myEntityNetwork!: ElementRef;

  nodes: any[] = [];
  edges: any[] = [];
  errMsg = '';

  network: any;

  entityValue: IDropdownEntityState = {id: '', name: ''};
  entityOptions: IDropdownEntityState[] = [];

  nodeValue: IDropdownEntityState = {id: '', name: ''};
  nodeOptions: IDropdownEntityState[] = [];

  typeValue: IDropdownEntityState = {id: '', name: ''};
  typeOptions: IDropdownEntityState[] = [];
  displayType = 'standard';
  nodeType = 'circle';
  preparedData: any;
  nodeSize = 80;
  nodeFontSize = 12;
  nodeSizeDisabled = false;

  constructor(private entityNetworkService: EntityNetworkService) {
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.getEntities();
  }

  destroy(): void {
    if (this.network) {
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
          this.entityOptions = resp;
        },
        error: (err) => {
          this.errMsg = (err.statusText ? err.statusText + ': ' : '') + (err.error?.message ||
            (err.error && err.error.length && err.error[0].message) || err.message || err.description || 'HTTP Response Error');
        }
      }
    );
  }

  getNodes(): void {
    this.entityNetworkService.getNodes(this.entityValue.id.toString()).subscribe({
        next: (resp) => {
          this.errMsg = '';
          this.nodeOptions = resp;
        },
        error: (err) => {
          this.errMsg = (err.statusText ? err.statusText + ': ' : '') + (err.error?.message ||
            (err.error && err.error.length && err.error[0].message) || err.message || err.description || 'HTTP Response Error');
        }
      }
    );
  }

  getNetwork(): void {
    this.entityNetworkService.getNetwork(this.nodeValue.id.toString()).subscribe({
        next: (resp: any) => {
          this.errMsg = '';
          this.typeOptions = [{
            id: 'All',
            name: 'All'
          }];
          this.getUniques(NodesTest).forEach((type: string) => {
            this.typeOptions.push({id: type, name: type});
          });
          let preparedData = this.configureData(resp);
          if (preparedData && preparedData.edges && preparedData.edges.length > 0 && preparedData.nodes && preparedData.nodes.length > 0) {
            this.edges = preparedData.edges;
            this.nodes = preparedData.nodes;
            this.startNetwork({nodes: this.nodes, edges: this.edges});
          }
        },
        error: (err) => {
          this.errMsg = (err.statusText ? err.statusText + ': ' : '') + (err.error?.message ||
            (err.error && err.error.length && err.error[0].message) || err.message || err.description || 'HTTP Response Error');
        }
      }
    );
  }

  // called on user entity dropdown selection
  entityChange(event: IDropdownEntityState): void {
    this.entityValue = event;
    this.nodeValue = {id: '', name: ''};
    this.nodeOptions = [{id: '', name: ''}];
    this.destroy();
    if (this.entityValue.id) {
      this.getNodes();
    }
  }

  // called on user node dropdown selection
  nodeChange(event: IDropdownEntityState): void {
    this.destroy();
    this.nodeValue = event;
    if (this.entityValue.id && this.nodeValue.id) {
      this.getNetwork();
    }
  }

  startNetwork(data: any, inialOptions = {}) {
    let textColor = 'white';
    if (this.nodeType === 'dot' || this.nodeType === 'star') {
      textColor = 'black';
    }
    if (this.nodeType === 'ellipse') {
      this.nodeSize = 80;
      this.nodeFontSize = 12;
    }
    if (data) {
      this.destroy();
      const container = this.myEntityNetwork;
      let options: Options = {
        height: '100%',
        width: '100%',
        autoResize: true,
        interaction: {
          navigationButtons: true,
          hover: true
        },
        nodes: {
          size: this.nodeSize,
          shadow: true,
          shape: this.nodeType,
          margin: {
            top: 7,
            right: 7,
            bottom: 7,
            left: 7
          },
          widthConstraint: this.nodeSize,
          font: {
            size: this.nodeFontSize,
            color: textColor,
          },
          borderWidth: 2
        },
        edges: {
          length: 200, // Longer edges between nodes.
          width: 2,
          font: {
            size: 12,
            color: 'black'
          },
        },
        physics: {
          enabled: true,
          solver: "forceAtlas2Based",
          repulsion: {
            nodeDistance: 400 // Put more distance between the nodes.
          }
        },
        manipulation: {
          enabled: false
        },
        layout: {}
      };

      if (this.displayType === 'hierarchical') {
        options.layout = {
          hierarchical: {
            sortMethod: 'directed',  // hubsize, directed
            direction: 'LR',   // UD, DU, LR, RL
            shakeTowards: 'leaves' // roots, leaves
          }
        };
      }
      this.network = null;
      this.network = new Network(container.nativeElement, data, options);
      this.network.stabilize();
      /*      this.network.on("click", (e: any) => {
              let idKey = e.nodes[0];
              this.toggleNodeVisibility(idKey);
            });*/
      this.nodeSizeDisabled = false;
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

  // Backend does not return correct format. We must fix here:
  configureData(data: any): any {
    if (data && data.nodes) {
      // Remove any duplicates from backend
      data.nodes = data.nodes.filter((value: any, index: any, self: any) =>
          index === self.findIndex((t: any) => (
            t.place === value.place && t.id === value.id
          ))
      )

      if (data && data.nodes) {
        data.nodes = data.nodes.map((node: any) => {
          if (node && node.name) {
            return {
              ...node,
              label: node.name,
              level: 0,
              color: ''
            }
          } else if (node && node.id === this.nodeValue.id) {
            // backend returns incorrect parent node, need to overwrite it here:
            return {
              ...node,
              ...this.nodeValue,
              level: 1,
              color: this.getColorFromLevel(1)
            }
          }
        });
      }

      if (data && data.edges) {
        data.edges = data.edges.map((edge: any) => (
          {
            ...edge,
            label: edge.relation,
            arrows: "to"
          }));
      }
      this.preparedData = data;
      this.nodeValue.level = 1;
      this.nodeValue.color = this.getColorFromLevel(1);
      this.updateEdgesRelated(this.nodeValue);
      console.log(data);
      return data;
    }
  }

  updateEdgesRelated(parentNode: any) {
    // find edges with from === parentNode.id
    const edgesFromParent = this.preparedData.edges.filter((edge: any) => edge.from === parentNode.id);
    // for each parent edge
    edgesFromParent.forEach((edge: any) => {
      // find node for edge, find to node and update level, then seatch edges from == to node id
      const nodeOfEdgeIndex = this.preparedData.nodes.findIndex(((obj: any) => obj.id === edge.to));
      if (nodeOfEdgeIndex > -1) {
        this.preparedData.nodes[nodeOfEdgeIndex].level = (parentNode.level || 0) + 1;
        this.preparedData.nodes[nodeOfEdgeIndex].color = this.getColorFromLevel((parentNode.level || 0) + 1);
        console.log('updating node level: ' + this.preparedData.nodes[nodeOfEdgeIndex].name);
      }
      const childEdges = this.preparedData.edges.filter(((obj: any) => obj.from === edge.to));
      console.log(edge.to);
      // update their level
      if (childEdges && childEdges.length > 0) {
        childEdges.forEach((edge: any) => {
          const childNodeIndex = this.preparedData.nodes.findIndex(((obj: any) => obj.id === edge.to));
          if (this.preparedData.nodes[childNodeIndex].level === 0) {
            this.preparedData.nodes[childNodeIndex].level = (parentNode.level || 0) + 2;
            this.preparedData.nodes[childNodeIndex].color = this.getColorFromLevel((parentNode.level || 0) + 2);
            console.log('calling related edges for: ' + this.preparedData.nodes[childNodeIndex].name);
            console.log('calling related edges for: ' + this.preparedData.nodes[childNodeIndex]);
            this.updateEdgesRelated(this.preparedData.nodes[childNodeIndex]);
          }
        });
      }
    });

  }

  onDecreaseNodeSize(): void {
    if (!this.nodeSizeDisabled) {
      this.nodeSizeDisabled = true;
      if (this.nodeSize >= 60) {
        this.nodeSize = this.nodeSize - 20;
        if (this.nodeSize < 60) {
          this.nodeFontSize = 10;
        } else if (this.nodeSize >= 60 && this.nodeSize < 90) {
          this.nodeFontSize = 14;
        } else {
          this.nodeFontSize = 16;
        }
        this.startNetwork({nodes: this.nodes, edges: this.edges});
      }
    }
  }

  onIncreaseNodeSize(): void {
    if (!this.nodeSizeDisabled) {
      this.nodeSizeDisabled = true;
      if (this.nodeSize < 105) {
        this.nodeSize = this.nodeSize + 20;
        if (this.nodeSize < 60) {
          this.nodeFontSize = 10;
        } else if (this.nodeSize >= 60 && this.nodeSize < 90) {
          this.nodeFontSize = 14;
        } else {
          this.nodeFontSize = 16;
        }
        this.startNetwork({nodes: this.nodes, edges: this.edges});
      }
    }
  }

  getColorFromLevel(level: number): string {
    return <any>networkColors[level - 1];
  }

}

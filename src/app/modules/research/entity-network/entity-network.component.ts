import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Network, Options} from 'vis-network/standalone';
import {EdgesTest, NodesTest} from "../../../shared/models/data";
import {EntityNetworkService} from "./entity-network.service";
import {
  IDropdownEntityState,
  networkColors
} from "../../../shared/interfaces/common.interface";
import {Subject} from "rxjs";
import {ClusterNode, Edge, Layout} from "@swimlane/ngx-graph";
import * as shape from 'd3-shape';
import {AppUtilityService} from "../../../core/services/utility.service";
import {MatSliderChange} from "@angular/material/slider";
import {EADPEdge, EADPNetwork, EADPNode} from "../../../shared/interfaces/entity-network.interface";

@Component({
  selector: 'entry-network',
  templateUrl: './entity-network.component.html',
  styleUrls: ['./entity-network.component.scss']
})

export class EntityNetworkComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myEntityNetwork', {static: false}) myEntityNetwork!: ElementRef;

  nodes: EADPNode[] = [];
  edges: EADPEdge[] = [];
  nodesNGX: EADPNode[] = [];
  edgesNGX: any[] = [];
  clusters: ClusterNode[] | any[] = [];
  errMsg = '';

  network: any;

  entityValue: IDropdownEntityState = {id: '', name: '', type: ''};
  entityOptions: IDropdownEntityState[] = [];

  activeNode = {};
  nodeValue: IDropdownEntityState = {id: '', name: '', type: ''};
  nodeOptions: IDropdownEntityState[] = [];

  typeOptions: IDropdownEntityState[] = [];
  displayType = 'standard';
  nodeType = 'circle';
  nodeSize = 80;
  nodeFontSize = 12;
  nodeSizeDisabled = false;
  bisLoadingData = false;
  nodeNavHistory: IDropdownEntityState[] = [];

  layout: string | Layout = 'dagreCluster';

  // line interpolation
  curveType: string = 'Bundle';
  curve: any = shape.curveMonotoneY; // shape.curveLinear;
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

  autoZoom: boolean = true;
  autoCenter: boolean = true;

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  showSidenavText = false;

  maxLevel = -1;
  tickerLevel = 0;

  constructor(private entityNetworkService: EntityNetworkService, private utilService: AppUtilityService) {
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

  clearData() {
    this.edgesNGX = [];
    this.nodesNGX = [];
    this.clusters = [];
    this.nodes = [];
    this.edges = [];
  }

  ngOnDestroy(): void {
    this.destroy();
    this.clearData();
  }

  getEntities(): void {
    this.entityNetworkService.getEntities().subscribe({
        next: (resp) => {
          this.errMsg = '';
          this.entityOptions = resp;
          // this.center$.next(true);
        },
        error: (err) => {
          this.errMsg = (err.statusText ? err.statusText + ': ' : '') + (err.error?.message ||
            (err.error && err.error.length && err.error[0].message) || err.message || err.description || 'HTTP Response Error');
        }
      }
    );
  }

  getNodes(): void {
    // to test with test data, you can uncomment below
    /*    this.nodeValue = {id: NodesTest[0].id, name: NodesTest[0].id};
        let preparedData = this.configureData({nodes: NodesTest, edges: EdgesTest});
        this.edges = preparedData.edges;
        this.nodes = preparedData.nodes;
        this.edgesNGX = JSON.parse(JSON.stringify(this.edges));
        this.nodesNGX = JSON.parse(JSON.stringify(this.nodes));
        this.maxLevel = preparedData.nodes.reduce((first: any, second: any) => first.level > second.level ? first : second).level;
        this.tickerLevel = this.maxLevel;
        this.startNetwork({nodes: this.nodes, edges: this.edges});*/

    this.entityNetworkService.getNodes(this.entityValue.id.toString()).subscribe({
        next: (resp: IDropdownEntityState[]) => {
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
        next: (resp: EADPNetwork) => {
          this.errMsg = '';
          // if we want to add ability to filter on types
          /*  this.typeOptions = [{
            id: 'All',
            name: 'All'
          }];
          this.getUniques(resp.nodes).forEach((type: string) => {
            this.typeOptions.push({id: type, name: type});
          });*/

          if (!resp || !resp.nodes || resp.nodes.length === 0) {
            const nodes: EADPNode[] = [{
              id: this.nodeValue.id.toString() || '',
              name: this.nodeValue.name || '',
              type: this.entityValue.name || ''
            }]
            resp = {
              nodes,
              edges: []
            }
          }
          let preparedData = this.configureData(resp);
          if (preparedData && preparedData.nodes && preparedData.nodes.length > 0) {
            this.maxLevel = preparedData.nodes.reduce((first: EADPNode, second: EADPNode) => first.level && second.level && first.level > second.level ? first : second).level || 1;
            this.tickerLevel = this.maxLevel;
            // we use ngx library for plane view and visjs for everything else.
            // both libraries need their own data set
            this.edges = preparedData.edges;
            this.nodes = preparedData.nodes;
            this.edgesNGX = JSON.parse(JSON.stringify(this.edges));
            this.nodesNGX = JSON.parse(JSON.stringify(this.nodes));
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
    this.nodeValue = {id: '', name: '', type: ''};
    this.nodeOptions = [{id: '', name: '', type: ''}];
    this.destroy();
    this.clearData();
    if (this.entityValue.id) {
      this.getNodes();
    }
  }

  // called on user node dropdown selection
  nodeChange(event: IDropdownEntityState, isGoBack = false): void {
    this.destroy();
    this.clearData();
    this.nodeValue = event;
    if (this.nodeValue && this.nodeValue.id && !isGoBack && (!this.nodeNavHistory || this.nodeNavHistory.length === 0 || this.nodeNavHistory[this.nodeNavHistory.length - 1].id !== this.nodeValue.id)) {
      this.nodeValue.type = this.entityValue.name;
      this.nodeNavHistory.push(this.nodeValue);
    }
    if (this.entityValue.id && this.nodeValue.id) {
      this.getNetwork();
    }
  }

  startNetwork(data: EADPNetwork, inialOptions = {}) {
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
      if (container) {
        this.network = new Network(container.nativeElement, data, options);
        this.network.stabilize();
      }
      this.bisLoadingData = false;
      this.zoomToFit$.next(true);
      this.zoomToFit$.next(true);
      this.network.on("doubleClick", (params: any) => {
        if (params && params.nodes && params.nodes.length >= 1) {
          const nodeIndex = this.nodes.findIndex(node => node.id === params.nodes[0]);
          if (this.entityValue.name !== this.nodes[nodeIndex].type) {
            const entityIndex = this.entityOptions.findIndex(((obj: IDropdownEntityState) => obj.name === this.nodes[nodeIndex].type));
            if (entityIndex && entityIndex !== -1) {
              this.entityValue = this.entityOptions[entityIndex];
            }
          }
          this.nodeChange(this.nodes[nodeIndex]);
        }
      });
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

  getUniques(array: EADPNode[]): any[] {
    return array.map(item => item.type)
      .filter((value, index, self) => self.indexOf(value) === index)
  }

  // Backend does not return correct format. We must fix here:
  configureData(data: EADPNetwork): EADPNetwork {
    if (data && data.nodes) {
      // Remove any duplicates from backend
      data.nodes = data.nodes.filter((node: EADPNode, index: number, self: any) => {
        return index === self.indexOf(node);
      });

      // update node array with required library properties
      if (data && data.nodes) {
        data.nodes = data.nodes.map((node: EADPNode): EADPNode => {
          // for plane view, add clusters
          const existingClusterIndex = this.clusters.findIndex(cluster => cluster.id === node.type);

          if (node && node.type && existingClusterIndex >= 0) {
            this.clusters[existingClusterIndex].childNodeIds?.push(node.id);
          } else {
            const length = this.clusters.length + 1;
            this.clusters.push({
              id: node.type,
              label: this.utilService.capitalizeFirstLetter(node.type) + ' Plane',
              childNodeIds: [node.id],
              data: {color: '', rx: length * 200, ry: 200}
            });
            this.clusters[this.clusters.length - 1].data.planeColor = this.getPlaneColor(node.type);
          }
          // for standard view
          // if top level node
          if (node && node.id === this.nodeValue.id) {
            // if top level node
            return {
              ...node,
              name: this.nodeValue.name || '',
              level: 1,
              label: this.nodeValue.name || node.name || node.id,
              levelColor: this.getColorFromLevel(1),
              color: this.getColorFromPlane(node.type)
            }
          } else if (node && node.id) {
            return {
              ...node,
              level: 0,
              label: node.name || node.id,
              levelColor: this.getColorFromLevel(0),
              color: this.getColorFromPlane(node.type)
            }
          }
          return node;
        });
      }
      if (data && data.edges) {
        data.edges = data.edges.map((edge: EADPEdge) => (
          {
            ...edge,
            label: edge.relation,
            arrows: "to",
            source: edge.from,
            target: edge.to
          }));
      }
      const parentNodeIndex = data.nodes.findIndex(((node: EADPNode) => node.id === this.nodeValue.id));
      return this.updateAllEdgesRelated(data.nodes[parentNodeIndex], data);
    }
    return data;
  }

  updateAllEdgesRelated(parentNode: EADPNode, data: EADPNetwork): EADPNetwork {
    if (parentNode) {
      const edgesFromParent = data.edges.filter((edge: EADPEdge) => (edge.from === parentNode.id) || (edge.to === parentNode.id));
      let arryOfEdgeNodes: EADPNode[] = [];

      // we need a list of nodes the parent touches
      edgesFromParent.forEach((edge: EADPEdge) => {
        let childNodeId = '';
        if (edge.to !== parentNode.id) {
          childNodeId = edge.to;
        } else {
          childNodeId = edge.from;
        }
        const nodeIndex = data.nodes.findIndex(((obj: EADPNode) => obj.id === childNodeId));

        arryOfEdgeNodes.push(data.nodes[nodeIndex]);
      });

      // iterate over touching nodes and set level if existing level is greater than parent level + 1
      arryOfEdgeNodes.forEach((childNode: EADPNode) => {
        if (childNode && (childNode.level === 0 || (childNode.level !== undefined && childNode.level > (parentNode.level || 1) + 1))) {
          const childIndex = data.nodes.findIndex(((obj: EADPNode) => obj.id === childNode.id));
          data.nodes[childIndex].level = (parentNode.level || 1) + 1;
          childNode.level = (parentNode.level || 1) + 1;
          return this.updateAllEdgesRelated(childNode, data);
        }
        return data;
      });
    }
    return data;
  }

  onDecreaseNodeSize(): void {
    if (!this.nodeSizeDisabled) {
      this.nodeSizeDisabled = true;
      if (this.nodeSize >= 60) {
        this.nodeSize = this.nodeSize - 20;
        if (this.nodeSize < 60) {
          this.nodeFontSize = 10;
        } else if (this.nodeSize >= 60 && this.nodeSize < 90) {
          this.nodeFontSize = 12;
        } else {
          this.nodeFontSize = 14;
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
          this.nodeFontSize = 14;
        }
        this.startNetwork({nodes: this.nodes, edges: this.edges});
      }
    }
  }


  getPlaneColor(plane: string): string {
    const planeIndex = this.clusters.findIndex(((obj: ClusterNode) => obj.id === plane));
    const planeNodeColor = <any>networkColors[planeIndex];
    return this.adjustColor(planeNodeColor, 50);
  }

  getColorFromPlane(plane: string): string {
    const planeIndex = this.clusters.findIndex(((obj: ClusterNode) => obj.id === plane));
    return <any>networkColors[planeIndex];
  }

  getColorFromLevel(level: number): string {
    return <any>networkColors[level - 1];
  }

  viewChange(change: any): void {
    this.bisLoadingData = true;
    if (this.displayType !== 'plane') {
      this.startNetwork({nodes: this.nodes, edges: this.edges});
      this.network.fit();
    } else {
      this.update$.next(true);
      this.center$.next(true);
      this.bisLoadingData = false;
    }
  }

  adjustColor(color: string, amount: number): string {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  setInterpolationType(curveType: string) {
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

  navBackNode() {
    if (this.nodeNavHistory && this.nodeNavHistory.length && this.nodeNavHistory.length >= 1) {
      // the most recently added history is current node, so remove that from history
      this.nodeNavHistory.pop();

      // now set node
      if (this.nodeNavHistory && this.nodeNavHistory.length && this.nodeNavHistory.length >= 1) {
        if (this.entityValue.name !== this.nodeNavHistory[this.nodeNavHistory.length - 1].type) {
          const entityIndex = this.entityOptions.findIndex(((obj: IDropdownEntityState) => obj.name === this.nodeNavHistory[this.nodeNavHistory.length - 1].type));
          if (entityIndex >= 0) {
            this.entityValue = this.entityOptions[entityIndex];
          }
        }
        this.nodeChange(this.nodeNavHistory[this.nodeNavHistory.length - 1], true);
      }
    }
  }

  ngxNodeDoubleClick(nodeDbl: any): void {
    this.zoomToFit$.next(true);
    this.bisLoadingData = true;
    this.edgesNGX = [];
    this.nodesNGX = [];
    this.clusters = [];

    if (nodeDbl && nodeDbl.id) {
      const nodeIndex = this.nodes.findIndex(node => node.id === nodeDbl.id);
      if (this.entityValue.name !== this.nodes[nodeIndex].type) {
        const entityIndex = this.entityOptions.findIndex(((obj: IDropdownEntityState) => obj.name === this.nodes[nodeIndex].type));
        if (entityIndex && entityIndex !== -1) {
          this.entityValue = this.entityOptions[entityIndex];
        }
      }
      this.nodeChange(this.nodes[nodeIndex]);
    }
  }

  updateLevel(event: MatSliderChange): void {
    this.tickerLevel = event.value || 1;

    // we need to first reset all nodes/ edges to visible so we start from a clean slate
    this.resetData();

    // search for nodes with levels outside slider scope and set to hidden.
    // ngx-graph also requires us to set edges as hidden. VIS.js will ignore un-used edges
    this.nodes.forEach((node: EADPNode, index) => {
      if (node.level !== undefined && node.level > this.tickerLevel) {
        // this.nodes[index].isCollapsed = true;
        this.nodes[index].hidden = true;
        // this.nodesNGX[index].isCollapsed = true;
        this.nodesNGX[index].hidden = true;

        const edgesFromParent = this.edgesNGX.filter((edge: EADPEdge) => (edge.from === this.nodesNGX[index].id) || (edge.to === this.nodesNGX[index].id));
        // we need a list of nodes the parent touches
        edgesFromParent.forEach((edge: EADPEdge) => {
          edge.hidden = true;
        });
      }
    });

    this.clusters.forEach((plane: ClusterNode) => {
      const hasNodeInPlane = this.nodes.findIndex(node => node.type === plane.id && !node.hidden) !== -1;
      plane.data.hidden = !hasNodeInPlane;
    });
    this.startNetwork({nodes: this.nodes, edges: this.edges});
    this.update$.next(true);
    this.center$.next(true);
  }

  resetData() {
    this.nodes.forEach((obj: EADPNode, index) => {
      obj.hidden = false;
      this.nodesNGX[index].hidden = false;
    });

    this.edgesNGX.forEach((obj: EADPEdge) => {
      obj.hidden = false;
    });
  }
}

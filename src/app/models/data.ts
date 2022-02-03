import { Edge, Node, ClusterNode } from '@swimlane/ngx-graph';

export const nodes: Node[] = [
  {
    id: '1',
    label: 'artifact:EPPC SV-4 DDoS Scenario 1',
  }, {
    id: '2',
    label: 'segment:Mobility'
  },
  {
    id: '3',
    label: 'activity:Communicate Strategic Decisions/Information'
  },
 ];

/*export const clusters: ClusterNode[] = [
  {
    id: 'third',
    label: 'C',
    childNodeIds: ['c1', 'c2']
  }
]*/

export const links: Edge[] = [
  {
    id: 'a',
    source: '1',
    target: '2',
    label: 'contains'
  }, {
    id: 'b',
    source: '1',
    target: '3',
    label: 'linked to'
  }
];

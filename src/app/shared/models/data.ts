import {Edge, Node, ClusterNode} from '@swimlane/ngx-graph';

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

export const testAPIResponse = {
  head: {
    vars: ['childrendArtifact', 'name', 'description']
  },
  results: {
    bindings: [
      {
        childrendArtifact: {"type": "uri", "value": "http://eadp.KG.local:9082/ns/eadp#activity:2"},
        name: {"type": "literal", "value": "Communicate Strategic Decisions/Information"},
        description: {"type": "literal", "value": "To send and receive strategic decisions"}
      },
      {
        childrendArtifact: {"type": "uri", "value": "http://eadp.KG.local:9082/ns/eadp#segment:3"},
        name: {"type": "literal", "value": "Mobility"},
        description: {"type": "literal", "value": "TBD"}
      }
    ]
  }
}

export const SPNodes = [
  {id: 1, label: "Eric Cartman", age: "kid", gender: "male"},
  {id: 2, label: "Stan Marsh", age: "kid", gender: "male"},
  {id: 3, label: "Wendy Testaburger", age: "kid", gender: "female"},
  {id: 4, label: "Mr Mackey", age: "adult", gender: "male"},
  {id: 'Sharon Marsh', label: "Sharon Marsh", age: "adult", gender: "female"},
];

export const SPEdges = [
  {
    from: 1,
    to: 2,
    relation: "friend",
    label: 'friend',
    arrows: "to, from",
    color: {color: "red"},
  },
  {
    from: 1,
    to: 3,
    relation: "friend",
    label: 'friend',
    arrows: "to, from",
    color: {color: "red"},
  },
  {
    from: 2,
    to: 3,
    relation: "friend",
    label: 'friend',
    arrows: "to, from",
    color: {color: "red"},
  },
  {
    from: 'Sharon Marsh',
    to: 2,
    relation: "parent",
    label: 'parent',
    arrows: "to",
    color: {color: "green"},
  },
  {
    from: 4,
    to: 1,
    relation: "teacher",
    label: 'teacher',
    arrows: "to",
    color: {color: "blue"},
  },
  {
    from: 4,
    to: 2,
    relation: "teacher",
    label: 'teacher',
    arrows: "to",
    color: {color: "blue"},
  },
  {
    from: 4,
    to: 3,
    relation: "teacher",
    label: 'teacher',
    arrows: "to",
    color: {color: "blue"},
  },
];

export const NodesTest = [
  {
    id: "Organization 1",
    name: "Organization 1",
    type: "organization",
    color: {background: 'red'}
  },
  {id: "Project 1", name: "Project 1", type: "project", color: {background: 'orange'}},
  {id: "Project 2", name: "Project 2", type: "project", color: {background: 'orange'}, hidden: false},
  {id: "Objective 1", name: "Objective 1", type: "objective", color: {background: 'blue'}},
  {id: "Objective 2", name: "Objective 2", type: "objective", color: {background: 'blue'}},
  {id: "Objective 3", name: "Objective 3", type: "objective", color: {background: 'blue'}},
  {id: "Objective 4", name: "Objective 4", type: "objective", color: {background: 'blue'}},
  {id: "Capability 1", name: "Capability 1", type: "capability", color: {background: 'yellow'}},
  {id: "Capability 2", name: "Capability 2", type: "objective", color: {background: 'yellow'}},
  {id: "Taxonomy 1", name: "Taxonomy 1", type: "taxonomy", color: {background: 'purple'}},
  {id: "Taxonomy 2", name: "Taxonomy 2", type: "taxonomy", color: {background: 'purple'}},
  {id: "Service 1", name: "Service 1", type: "service", color: {background: 'green'}},
  {id: "Service 2", name: "Service 2", type: "service", color: {background: 'green'}},
  {id: "Service 3", name: "Service 3", type: "service", color: {background: 'green'}},
  {id: "System 1", name: "System 1", type: "system", color: {background: 'green'}},
  {id: "System 2", name: "System 2", type: "system", color: {background: 'green'}}
];

export const EdgesTest = [
  {
    from: "Organization 1",
    to: "Project 1",
    relation: "owns",
    label: 'owns',
    arrows: "to, from",
    color: {color: "red"},
  },
  {
    from: "Organization 1",
    to: "Project 2",
    relation: "owns",
    label: 'owns',
    arrows: "to",
    color: {color: "red"},
  },
  {
    from: "Organization 1",
    to: "System 1",
    relation: "owns",
    label: 'owns',
    arrows: "to",
    color: {color: "red"},
  },
  {
    from: "Organization 1",
    to: "System 2",
    relation: "owns",
    label: 'owns',
    arrows: "to",
    color: {color: "red"},
  },
  {
    from: "Organization 1",
    to: "Objective 1",
    relation: "has",
    label: 'has',
    arrows: "to",
    color: {color: "red"},
  },
  {
    from: "Organization 1",
    to: "Objective 2",
    relation: "owns",
    label: 'owns',
    arrows: "to",
    color: {color: "red"},
  },
  {
    from: "Organization 1",
    to: "Objective 3",
    relation: "owns",
    label: 'owns',
    arrows: "to",
    color: {color: "red"},
  },
  {
    from: "Organization 1",
    to: "Objective 4",
    relation: "owns",
    label: 'owns',
    arrows: "to",
    color: {color: "red"},
  },
  {
    from: "Project 1",
    to: "Objective 1",
    relation: "has",
    label: 'has',
    arrows: "to",
    color: {color: "orange"},
  },
  {
    from: "Project 1",
    to: "Objective 2",
    relation: "has",
    label: 'has',
    arrows: "to",
    color: {color: "orange"},
  },
  {
    from: "Project 2",
    to: "Objective 3",
    relation: "has",
    label: 'has',
    arrows: "to",
    color: {color: "orange"},
  },
  {
    from: "Project 2",
    to: "Objective 4",
    relation: "has",
    label: 'has',
    arrows: "to",
    color: {color: "orange"},
  },
  {
    from: "Capability 1",
    to: "Objective 1",
    relation: "satisfies",
    label: 'satisfies',
    arrows: "to",
    color: {color: "yellow"},
  },
  {
    from: "Capability 1",
    to: "Objective 2",
    relation: "satisfies",
    label: 'satisfies',
    arrows: "to",
    color: {color: "yellow"},
  },
  {
    from: "Capability 2",
    to: "Objective 3",
    relation: "satisfies",
    label: 'satisfies',
    arrows: "to",
    color: {color: "yellow"},
  },
  {
    from: "Capability 2",
    to: "Objective 4",
    relation: "satisfies",
    label: 'satisfies',
    arrows: "to",
    color: {color: "yellow"},
  },
  {
    from: "Taxonomy 1",
    to: "Capability 1",
    relation: "depends on",
    label: 'depends on',
    arrows: "to",
    color: {color: "purple"},
  },
  {
    from: "Taxonomy 2",
    to: "Capability 2",
    relation: "depends on",
    label: 'depends on',
    arrows: "to",
    color: {color: "purple"},
  },
  {
    from: "Service 1",
    to: "Capability 1",
    relation: "provides",
    label: 'provides',
    arrows: "to",
    color: {color: "green"},
  },
  {
    from: "Service 2",
    to: "Capability 1",
    relation: "provides",
    label: 'provides',
    arrows: "to",
    color: {color: "green"},
  },
  {
    from: "Service 3",
    to: "Capability 2",
    relation: "provides",
    label: 'provides',
    arrows: "to",
    color: {color: "green"},
  },
  {
    from: "System 1",
    to: "Service 1",
    relation: "implements",
    label: 'implements',
    arrows: "to",
    color: {color: "green"},
  },
  {
    from: "System 1",
    to: "Service 2",
    relation: "implements",
    label: 'implements',
    arrows: "to",
    color: {color: "green"},
  },
  {
    from: "System 2",
    to: "Service 3",
    relation: "implements",
    label: 'implements',
    arrows: "to",
    color: {color: "green"},
  }];

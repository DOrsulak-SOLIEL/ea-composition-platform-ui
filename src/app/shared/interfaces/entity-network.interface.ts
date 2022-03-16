export interface EADPNodeRsp {
  id: string | number,
  type: string,
  name: string,
}

export interface EADPEdgeRsp {
  from: string,
  relation: string,
  to: string,
  arrows?: string,
  id?: string,
  label?: string,
  source?: string,
  target?: string
}

export interface EADPNode {
  id: string,
  type: string,
  name: string,
  color?: string,
  label?: string,
  level?: number,
  levelColor?: string | undefined | null,
  hidden?: boolean
}

export interface EADPEdge {
  from: string,
  relation: string,
  to: string,
  arrows?: string,
  id?: string,
  label?: string,
  source?: string,
  target?: string,
  hidden?: boolean
}

export interface EADPNetwork {
  nodes: EADPNode[],
  edges: EADPEdge[]
}

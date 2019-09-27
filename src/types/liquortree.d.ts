import Vue from "vue";
export interface NodeStates {
  checked?: boolean;
  disabled?: boolean;
  draggable?: boolean;
  dragging?: boolean;
  dropable?: boolean;
  editable?: boolean;
  indeterminate?: boolean;
  matched?: boolean;
  selectable?: boolean;
  selected?: boolean;
  visible?: boolean;
}
export interface CustomNodeData {
  [key: string]: any;
}
export interface NodeData {
  id?: number;
  text: string;
  data?: CustomNodeData;
  children?: NodeData[];
  state?: NodeStates;
}

export interface Node {
  children: any;
  data: any;
  id: string;
  isBatch: boolean;
  isEditing: boolean;
  parent: SelectableNode | null;
  showChildren: boolean;
  states: NodeStates;
  tree: any;
  vm: Vue;
}

export class Selection {
  public select(extendList?: boolean): void;
  public unselect(): void;
  public check(): void;
  public uncheck(): void;
  public expand(): void;
  public collapse(): void;
  public remove(): void;
}

export type SelectableNode = Node & Selection;
export type SelectableNodeList = SelectableNode[] & Selection;

export class Tree {
  public find(criteria: any | string, multiple?: boolean): SelectableNodeList;
}

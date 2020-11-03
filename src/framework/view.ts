/** image */
/**
input h(): h("h1", {class: "title"}, "仮想DOM実践入門")
output vdom: 
  {
    nodeName: "h1",
    attributes: { class: "title" },
    children: "仮想DOM実践入門"
  }
*/

type NodeType = VNode | string | number;
type Attributes = { [key: string]: string | Function };

export interface View<State, Action> {
  (state: State, action: Action): VNode;
}

/** vdom */
export interface VNode {
  nodeName: keyof HTMLElementTagNameMap | SVGElementTagNameMap;
  attributes: Attributes;
  children: NodeType[];
}

/** vdomを作成する関数 */
export function h(
  nodeName: keyof HTMLElementTagNameMap | SVGElementTagNameMap,
  attributes: Attributes,
  ...children: NodeType[]
): VNode {
  return { nodeName, attributes, children };
}

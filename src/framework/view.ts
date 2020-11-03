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
  nodeName: keyof HTMLElementTagNameMap;
  attributes: Attributes;
  children: NodeType[];
}

/** vdomを作成する関数 */
export const h = (
  nodeName: keyof HTMLElementTagNameMap,
  attributes: Attributes,
  ...children: NodeType[]
): VNode => {
  return { nodeName, attributes, children };
};

/** リアルDOMを生成する */
export const createElement = (node: NodeType): HTMLElement | Text => {
  if (!isVNode(node)) {
    return document.createTextNode(node.toString());
  }
  const el = document.createElement(node.nodeName);
  setAttributes(el, node.attributes);
  node.children.forEach((child) => el.appendChild(createElement(child)));
};

const isVNode = (node: NodeType): node is VNode => {
  return typeof node !== "string" && typeof node !== "number";
};

/** targetに属性を設定する */
/** attr: {"class": "hoge", "onclick": function} */
const setAttributes = (target: HTMLElement, attrs: Attributes) => {
  for (let attr in attrs) {
    if (isEventAttr(attr)) {
      const eventName = attr.slice(2);
      target.addEventListener(eventName, attrs[attr] as EventListener);
    } else {
      target.setAttribute(attr, attrs[attr] as string);
    }
  }
};

/** onがついてたらイベント */
const isEventAttr = (attr: string): boolean => {
  return /^on/.test(attr);
};

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
  return el;
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

/**　差分検知 */
export enum ChangedType {
  /** no diff */
  None,

  /** nodeの型が違う */
  Type,

  /** テキストノードが違う */
  Text,

  /** ノード名(タグ名)が違う */
  Node,

  /** inputのvalueが違う */
  Value,

  /** 属性が違う */
  Attr,
}

export const hasChanged = (oldNode: NodeType, newNode: NodeType): ChangedType => {
  // different type
  if (typeof oldNode != typeof newNode) {
    return ChangedType.Type;
  }

  // different string
  if (!isVNode(oldNode) && oldNode !== newNode) {
    return ChangedType.Text;
  }

  if (isVNode(oldNode) && isVNode(newNode)) {
    if (oldNode.nodeName != newNode.nodeName) {
      return ChangedType.Node;
    }
    if (oldNode.attributes.value !== newNode.attributes.value) {
      return ChangedType.Value;
    }
    if (JSON.stringify(oldNode.attributes) !== JSON.stringify(newNode.attributes)) {
      return ChangedType.Attr;
    }
  }
  return ChangedType.None;
};

/**
 * 仮想DOMの差分を検知し、リアルDOMに反映する
 */
export const updateElement = (
  parent: HTMLElement,
  oldNode: NodeType,
  newNode: NodeType,
  index = 0
) => {
  // oldNodeがない場合は新しいNodeを作成する
  if (!oldNode) {
    parent.appendChild(createElement(newNode));
    return;
  }

  // newNodeがない場合は削除されたと判断し、そのNodeを削除する
  const target = parent.childNodes[index];
  if (!newNode) {
    parent.removeChild(target);
    return;
  }

  // 差分検知し、パッチ処理（変更箇所だけ反映）を行う
  const changeType = hasChanged(oldNode, newNode);
  switch (changeType) {
    case ChangedType.Type:
    case ChangedType.Text:
    case ChangedType.Node:
      parent.replaceChild(createElement(newNode), target);
      return;
    case ChangedType.Value:
      updateValue(target as HTMLInputElement, (newNode as VNode).attributes.value as string);
      return;
    case ChangedType.Attr:
      updateAttributes(
        target as HTMLInputElement,
        (oldNode as VNode).attributes,
        (newNode as VNode).attributes
      );
      return;
  }

  // 子要素の差分検知・リアルDOM反映を再帰的に実行する
  if (isVNode(oldNode) && isVNode(newNode)) {
    for (let i = 0; i < newNode.children.length || i < oldNode.children.length; i++) {
      updateElement(target as HTMLElement, oldNode.children[i], newNode.children[i], i);
    }
  }
};

const updateAttributes = (target: HTMLElement, oldAttrs: Attributes, newAttrs: Attributes) => {
  for (let attr in oldAttrs) {
    if (!isEventAttr(attr)) {
      target.removeAttribute(attr);
    }
  }

  for (let attr in newAttrs) {
    if (!isEventAttr(attr)) {
      target.setAttribute(attr, newAttrs[attr] as string);
    }
  }
};

const updateValue = (target: HTMLInputElement, newValue: string) => {
  target.value = newValue;
};

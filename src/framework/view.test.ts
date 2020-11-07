import { h, createElement } from "./view";

test("Convert to vdom", () => {
  const output = h("h1", { id: "counter", class: "title" }, "仮想DOM実践入門");
  const expected = {
    nodeName: "h1",
    attributes: { id: "counter", class: "title" },
    // @ts-ignore
    children: ["仮想DOM実践入門"],
  };
  expect(output).toStrictEqual(expected);
});

test("Convert to nested vdom", () => {
  const output = h(
    "div",
    {},
    h("h1", { class: "title" }, "仮想DOM実践入門"),
    h("p", { class: "content" }, "DOM操作1")
  );

  const expected = {
    nodeName: "div",
    attributes: {},
    children: [
      {
        nodeName: "h1",
        attributes: { class: "title" },
        children: ["仮想DOM実践入門"],
      },
      {
        nodeName: "p",
        attributes: { class: "content" },
        children: ["DOM操作1"],
      },
    ],
  };
  expect(output).toStrictEqual(expected);
});

test("Convert to real dom", () => {
  const vdom = h("h1", {}, "仮想DOM実践入門");
  const output = createElement(vdom);

  /** expected:
   *  <h1>仮想DOM実践入門</h1>
   */
  const expected = document.createElement("h1");
  expected.appendChild(document.createTextNode("仮想DOM実践入門"));

  expect(output).toStrictEqual(expected);
});

test("Convert to nested real dom", () => {
  const vdom = h(
    "div",
    {},
    h("h1", { class: "title" }, "仮想DOM実践入門"),
    h("p", { class: "content" }, "DOM操作1")
  );
  const output = createElement(vdom);

  /** expected
   * <div>
   *   <h1 class="title">仮想DOM実践入門</h1>
   *   <p class="content">DOM操作1</p>
   * </div>
   */
  const expected = document.createElement("div");
  const h1 = document.createElement("h1");
  h1.setAttribute("class", "title");
  h1.appendChild(document.createTextNode("仮想DOM実践入門"));
  const p = document.createElement("p");
  p.setAttribute("class", "content");
  p.appendChild(document.createTextNode("DOM操作1"));
  expected.appendChild(h1);
  expected.appendChild(p);

  expect(output).toStrictEqual(expected);
});

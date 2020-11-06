import { h } from "./view";

test("Convert to vdom", () => {
  const output = h("h1", { id: "counter", class: "title", children: "仮想DOM実践入門" });
  const expected = {
    nodeName: "h1",
    attributes: { id: "counter", class: "title", children: "仮想DOM実践入門" },
    // @ts-ignore
    children: [],
  };
  expect(output).toStrictEqual(expected);
});

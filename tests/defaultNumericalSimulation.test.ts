import { defaultUpdateVertexStates } from "../src/utils/defaultUpdateVertexStates";
import { EdgeSpecification, VertexSpecification } from "../src/NetworkGraph";

test("Empty vertex list remains empty.", () => {
  const oldVerticesPositions = new Map();
  const width = 100;
  const height = 100;
  const edges: Array<EdgeSpecification> = [];
  const vertices: Array<EdgeSpecification> = [];

  expect(
    defaultUpdateVertexStates(
      oldVerticesPositions,
      width,
      height,
      edges,
      vertices
    )
  ).toEqual(new Map());
});

test("Missing vertices are dropped.", () => {
  const oldVerticesPositions = new Map([
    ["a", { cx: 0, cy: 0, vx: 0, vy: 0, frozen: false }],
    ["b", { cx: 0, cy: 0, vx: 0, vy: 0, frozen: false }],
  ]);
  const width = 100;
  const height = 100;
  const edges: Array<EdgeSpecification> = [];
  const vertices: Array<VertexSpecification> = [{ id: "a" }];

  const newVerticesPositions = defaultUpdateVertexStates(
    oldVerticesPositions,
    width,
    height,
    edges,
    vertices
  );

  expect(newVerticesPositions.size).toBe(1);
  expect(newVerticesPositions.has("a")).toBe(true);
});

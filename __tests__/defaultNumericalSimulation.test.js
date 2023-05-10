import { updateVerticesPositions } from "../src/defaultNumericalSimulation.js";

test("Empty vertex list remains empty.", () => {
  const oldVerticesPositions = new Map();
  const width = 100;
  const height = 100;
  const edges = [];
  const vertices = [];

  expect(
    updateVerticesPositions(
      oldVerticesPositions,
      width,
      height,
      edges,
      vertices
    )
  ).toEqual(new Map());
});

test("Missing vertices are dropped.", () => {
  const oldVerticesPositions = new Map([{ id: "a" }, { id: "b" }]);
  const width = 100;
  const height = 100;
  const edges = [];
  const vertices = [{ id: "a" }];

  const newVerticesPositions = updateVerticesPositions(
    oldVerticesPositions,
    width,
    height,
    edges,
    vertices
  );

  expect(newVerticesPositions.size).toBe(1);
  expect(newVerticesPositions.has("a")).toBe(true);
});

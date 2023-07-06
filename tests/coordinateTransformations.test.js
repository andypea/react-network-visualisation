import {
  graphPositionToSvgPosition,
  svgPositionToGraphPosition,
} from "../src/coordinateTransformations.js";

const table = [
  {
    viewOrigin: [0, 0],
    viewSize: [1, 1],
    size: [1, 1],
    margin: 0,
    graphPosition: [0, 0],
  },
  {
    viewOrigin: [0, 0],
    viewSize: [1, 1],
    size: [1, 1],
    margin: 0,
    graphPosition: [1, 1],
  },
  {
    viewOrigin: [0, 0],
    viewSize: [1, 1],
    size: [1, 1],
    margin: 0,
    graphPosition: [0.5, 0.5],
  },
  {
    viewOrigin: [0, 0],
    viewSize: [1, 1],
    size: [1.2, 1.2],
    margin: 0.1,
    graphPosition: [0.5, 0.5],
  },
  {
    viewOrigin: [2, 3],
    viewSize: [5, 7],
    size: [11, 13],
    margin: 3,
    graphPosition: [5.5, 6.6],
  },
  {
    viewOrigin: [5.3, 6.9],
    viewSize: [2.2, 1.1],
    size: [1.3, 4.4],
    margin: 0.7,
    graphPosition: [0.5, 3.1],
  },
];

test.each(table)(
  "graphPositionToSvgPosition is the inverse of svgPositionToGraphPosition",
  ({ viewOrigin, viewSize, size, margin, graphPosition }) => {
    const coordinateTransformations = graphPositionToSvgPosition(
      viewOrigin,
      viewSize,
      size,
      margin
    );
    const inverseCoordinateTransformation = svgPositionToGraphPosition(
      viewOrigin,
      viewSize,
      size,
      margin
    );

    const actual = inverseCoordinateTransformation(
      coordinateTransformations(graphPosition)
    );

    expect(actual).toHaveLength(graphPosition.length);
    actual.forEach((x, i) => expect(x).toBeCloseTo(graphPosition[i], 5));
  }
);

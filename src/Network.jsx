import PropTypes from "prop-types";

import { DefaultVertexElement } from "./DefaultVertexElement.jsx";
import { Edge } from "./Edge.jsx";
import { StaticVertexWrapper } from "./StaticVertexWrapper.jsx";

export function Network({
  VertexWrapper = StaticVertexWrapper,
  VertexRender = DefaultVertexElement,
  width = 100,
  height = 100,
  vertices = [],
  edges = [],
  fill = "none",
  stroke = "black",
  ...otherProps
}) {
  // TODO: Don't include all other properties in verticesPositions.
  const verticesPositions = new Map(
    vertices.map(({ id, ...other }) => [
      id,
      {
        position: { cx: width * Math.random(), cy: height * Math.random() },
        ...other,
      },
    ])
  );

  return (
    <svg width={width} height={height} {...otherProps}>
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill={fill}
        stroke={stroke}
      />
      <g>
        <g>
          {edges
            .filter(
              (e) =>
                verticesPositions.has(e.source) &&
                verticesPositions.has(e.target)
            )
            .map((e) => {
              return (
                <Edge
                  key={e.id}
                  source={verticesPositions.get(e.source).position}
                  target={verticesPositions.get(e.target).position}
                />
              );
            })}
        </g>
        <g>
          {vertices.map((v) => (
            <VertexWrapper
              key={v.id}
              id={v.id}
              cx={verticesPositions.get(v.id).position.cx}
              cy={verticesPositions.get(v.id).position.cy}
              VertexRender={VertexRender}
              vertexSpecification={v}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

// TODO: These are not specific enough!
Network.propTypes = {
  VertexWrapper: PropTypes.func,
  VertexRender: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  vertices: PropTypes.array,
  edges: PropTypes.array,
  fill: PropTypes.string,
  stroke: PropTypes.string,
};

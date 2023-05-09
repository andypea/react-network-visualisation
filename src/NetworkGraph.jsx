import PropTypes from "prop-types";

import { DefaultVertexElement } from "./DefaultVertexElement.jsx";
import { DefaultEdgeElement } from "./DefaultEdgeElement.jsx";
import { StaticVertexWrapper } from "./StaticVertexWrapper.jsx";

export function NetworkGraph({
  VertexWrapper = StaticVertexWrapper,
  VertexRender = DefaultVertexElement,
  EdgeRender = DefaultEdgeElement,
  width = 100,
  height = 100,
  vertices = [],
  edges = [],
  backgroundColour = "white",
  stroke = "black",
}) {
  const verticesPositions = new Map(
    vertices.map(({ id, position }) => [
      id,
      {
        position: position ?? {
          cx: width * Math.random(),
          cy: height * Math.random(),
        },
      },
    ])
  );

  return (
    <svg width={width} height={height}>
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill={backgroundColour}
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
                <EdgeRender
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
              backgroundColour={backgroundColour}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

// TODO: These are not specific enough!
NetworkGraph.propTypes = {
  VertexWrapper: PropTypes.func,
  VertexRender: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  vertices: PropTypes.array,
  edges: PropTypes.array,
  backgroundColour: PropTypes.string,
  stroke: PropTypes.string,
  EdgeRender: PropTypes.func,
};

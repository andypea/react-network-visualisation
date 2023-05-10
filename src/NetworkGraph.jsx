import PropTypes from "prop-types";

import { DefaultVertexElement } from "./DefaultVertexElement.jsx";
import { DefaultEdgeElement } from "./DefaultEdgeElement.jsx";
import { StaticVertexWrapper } from "./StaticVertexWrapper.jsx";

/**
 * A static (by default) network graph.
 */
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
  // Create random positions for all vertices that aren't supplied with a position.
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
          {
            // Place all edges above the vertices in the SVG, so they don't obscure them.
            edges
              .filter(
                // Don't try and render any edges to non-existent vertices.
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
              })
          }
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

NetworkGraph.propTypes = {
  /**
   * Width of the graph in pixels.
   */
  width: PropTypes.number,

  /**
   * Height of the graph in pixels.
   */
  height: PropTypes.number,

  /**
   * Array of containing all edges in the graph.
   */
  edges: PropTypes.array,

  /**
   * Array containing all vertices in the graph.
   */
  vertices: PropTypes.array,

  /**
   * Background colour of the graph.
   */
  backgroundColour: PropTypes.string,

  /**
   * Colour of the box around the graph.
   */
  stroke: PropTypes.string,

  /**
   * Component to render at each vertex.
   */
  VertexRender: PropTypes.func,

  /**
   * Component to render at each edge.
   */
  EdgeRender: PropTypes.func,

  /**
   * Component to place each vertex in.
   * Allows people to add functionality to vertices, such as making them draggable.
   */
  VertexWrapper: PropTypes.func,
};

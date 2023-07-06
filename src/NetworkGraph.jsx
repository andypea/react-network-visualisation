import PropTypes from "prop-types";

import { DefaultVertexElement } from "./DefaultVertexElement.jsx";
import { DefaultEdgeElement } from "./DefaultEdgeElement.jsx";
import { StaticVertexWrapper } from "./StaticVertexWrapper.jsx";
import { useCallback, useRef, useState, useMemo } from "react";
import {
  graphPositionToSvgPosition,
  svgPositionToGraphPosition,
} from "./coordinateTransformations.js";

const defaultViewOrigin = [0, 0];
const defaultViewSize = [100, 100];

/**
 * A static (by default) network graph.
 */
export const NetworkGraph = ({
  VertexWrapper = StaticVertexWrapper,
  VertexRender = DefaultVertexElement,
  EdgeRender = DefaultEdgeElement,
  vertices = [],
  edges = [],
  backgroundColour = "white",
  stroke = "black",
  viewOrigin = defaultViewOrigin,
  viewSize = defaultViewSize,
  preserveAspectRatio = false,
  margin = 30,
  ...otherProps
}) => {
  const [size, setSize] = useState([undefined, undefined]);

  const resizeObserver = useRef(
    new ResizeObserver((entries) => {
      setSize([
        entries[0]?.contentBoxSize[0]?.inlineSize,
        entries[0]?.contentBoxSize[0]?.blockSize,
      ]);
    })
  );

  const updateResizeObserver = useCallback((node) => {
    resizeObserver.current.disconnect();

    if (node !== null) {
      const boundingClientRect = node.getBoundingClientRect();
      setSize([boundingClientRect.width, boundingClientRect.height]);
      resizeObserver.current.observe(node);
    }
  }, []);

  const verticesPositions = useMemo(() => {
    const coordinateTransformation = graphPositionToSvgPosition(
      viewOrigin,
      viewSize,
      size,
      margin
    );

    return new Map(
      vertices
        .filter(
          (v) => v?.position?.cx !== undefined && v?.position?.cy !== undefined
        )
        .map(({ id, position }) => {
          const svgPosition = coordinateTransformation([
            position.cx,
            position.cy,
          ]);
          return [
            id,
            {
              position: { cx: svgPosition[0], cy: svgPosition[1] },
            },
          ];
        })
    );
  }, [viewOrigin, viewSize, size, margin, vertices]);

  const topLeft = graphPositionToSvgPosition(
    viewOrigin,
    viewSize,
    size,
    margin
  )(viewOrigin).map((x) => x - margin);
  const bottomRight = graphPositionToSvgPosition(
    viewOrigin,
    viewSize,
    size,
    margin
  )([viewOrigin[0] + viewSize[0], viewOrigin[1] + viewSize[1]]).map(
    (x) => x + margin
  );

  const svgToGraphTransform = useCallback(
    (svgPosition) => {
      return svgPositionToGraphPosition(
        viewOrigin,
        viewSize,
        size,
        margin
      )(svgPosition);
    },
    [viewOrigin, viewSize, size, margin]
  );

  return (
    <svg className="network-graph" ref={updateResizeObserver} {...otherProps}>
      {size[0] !== undefined && size[1] !== undefined ? (
        <>
          <defs>
            <clipPath id="view">
              <rect
                x={topLeft[0]}
                y={topLeft[1]}
                width={bottomRight[0] - topLeft[0]}
                height={bottomRight[1] - topLeft[1]}
                fill="black"
              />
            </clipPath>
          </defs>
          <rect
            x={topLeft[0]}
            y={topLeft[1]}
            width={bottomRight[0] - topLeft[0]}
            height={bottomRight[1] - topLeft[1]}
            fill={backgroundColour}
            stroke={stroke}
          />
          <g clipPath="url(#view)">
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
              {vertices
                .filter((v) => verticesPositions.has(v.id))
                .map((v) => (
                  <VertexWrapper
                    key={v.id}
                    id={v.id}
                    cx={verticesPositions.get(v.id).position.cx}
                    cy={verticesPositions.get(v.id).position.cy}
                    VertexRender={VertexRender}
                    vertexSpecification={v}
                    backgroundColour={backgroundColour}
                    svgToGraphTransform={svgToGraphTransform}
                  />
                ))}
            </g>
          </g>
        </>
      ) : (
        <></>
      )}
    </svg>
  );
};

NetworkGraph.displayName = "NetworkGraph";

NetworkGraph.propTypes = {
  /**
   * Width of the SVG.
   */
  width: PropTypes.string,

  /**
   * Height of the SVG.
   */
  height: PropTypes.string,

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

  /**
   * The origin of the rectangle to be viewed (in graph units).
   */
  viewOrigin: PropTypes.arrayOf(PropTypes.number),

  /**
   * The size of the rectangle to be viewed (in graph units).
   */
  viewSize: PropTypes.arrayOf(PropTypes.number),

  preserveAspectRatio: PropTypes.bool,

  margin: PropTypes.number,
};

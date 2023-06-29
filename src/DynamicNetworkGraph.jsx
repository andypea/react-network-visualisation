import { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { updateVerticesPositions } from "./defaultNumericalSimulation.js";
import { DefaultVertexElement } from "./DefaultVertexElement.jsx";
import { DefaultEdgeElement } from "./DefaultEdgeElement.jsx";
import { NetworkGraph } from "./NetworkGraph.jsx";
import { DraggableVertexWrapper } from "./DraggableVertexWrapper.jsx";

/**
 * Dynamic network graph with draggable vertices.
 */
export function DynamicNetworkGraph({
  width = 100,
  height = 100,
  vertices = [],
  edges = [],
  backgroundColour = "white",
  stroke = "black",
  VertexRender = DefaultVertexElement,
  EdgeRender = DefaultEdgeElement,
  vertexPositionUpdater = updateVerticesPositions,
  ...otherProps
} = {}) {
  // Keeps track of the current vertex positions.
  const [verticesPositions, setVerticesPositions] = useState(new Map());
  const ref = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) =>
      console.log(entries)
    );

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Update the vertex positions on each frame.
  useEffect(() => {
    setVerticesPositions((oldVerticesPositions) =>
      vertexPositionUpdater(
        oldVerticesPositions,
        width,
        height,
        edges,
        vertices
      )
    );

    let frameId = null;

    function onFrame() {
      setVerticesPositions((oldVerticesPositions) =>
        vertexPositionUpdater(
          oldVerticesPositions,
          width,
          height,
          edges,
          vertices
        )
      );

      frameId = requestAnimationFrame(onFrame);
    }

    function start() {
      frameId = requestAnimationFrame(onFrame);
    }

    function stop() {
      cancelAnimationFrame(frameId);
      frameId = null;
    }

    start();
    return () => stop();
  }, [width, height, edges, vertices, vertexPositionUpdater]);

  /**
   * Manually move a vertex.
   * Called as vertices are dragged.
   *
   * @param {string} id - ID of the vertex to move.
   * @param {Object} position - New position for the vertex.
   */
  const moveVertex = useCallback((id, position) => {
    setVerticesPositions((oldVerticesPositions) =>
      new Map(oldVerticesPositions.entries()).set(id, {
        ...oldVerticesPositions.get(id),
        cx: position.x,
        cy: position.y,
      })
    );
  }, []);

  /**
   * Stop automatically updating the vertex position.
   * Called when a user starts dragging a vertex.
   *
   * @param {string} id - ID of the vertex to move.
   */
  const freezeVertex = useCallback((id) => {
    setVerticesPositions((oldVerticesPositions) =>
      new Map(oldVerticesPositions.entries()).set(id, {
        ...oldVerticesPositions.get(id),
        frozen: true,
      })
    );
  }, []);

  /**
   * Re-enable automatic updates of the vertex position.
   * Called when a vertex stops being dragged.
   *
   * @param {string} id - ID of the vertex to move.
   */
  const unfreezeVertex = useCallback((id) => {
    setVerticesPositions((oldVerticesPositions) =>
      new Map(oldVerticesPositions.entries()).set(id, {
        ...oldVerticesPositions.get(id),
        frozen: false,
      })
    );
  }, []);

  // Create a vertex wrapper that will permit dragging.
  // The use of `useCallback` prevents the vertices being
  // recreated by React on every frame.
  const VertexWrapper = useCallback(
    (props) => {
      return (
        <DraggableVertexWrapper
          {...props}
          moveVertex={moveVertex}
          freezeVertex={freezeVertex}
          unfreezeVertex={unfreezeVertex}
        />
      );
    },
    [freezeVertex, unfreezeVertex, moveVertex]
  );

  // Create an array of vertices with their current positions.
  // This will be passed to the <NetworkGraph /> component,
  // which will render the graph.
  const verticesWithPositions = vertices
    .filter((v) => {
      const vertexPos = verticesPositions.get(v.id);
      return vertexPos?.cx !== undefined && vertexPos?.cy !== undefined;
    })
    .map((v) => {
      const vertexPos = verticesPositions.get(v.id);
      return { ...v, position: { cx: vertexPos.cx, cy: vertexPos.cy } };
    });

  return (
    <NetworkGraph
      VertexWrapper={VertexWrapper}
      VertexRender={VertexRender}
      EdgeRender={EdgeRender}
      width={width}
      height={height}
      edges={edges}
      vertices={verticesWithPositions}
      stroke={stroke}
      backgroundColour={backgroundColour}
      {...otherProps}
      ref={ref}
    />
  );
}

DynamicNetworkGraph.propTypes = {
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
   * Function that updates the vertex positions on each frame.
   */
  vertexPositionUpdater: PropTypes.func,
};

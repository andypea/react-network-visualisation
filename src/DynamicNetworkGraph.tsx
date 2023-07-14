import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { updateVerticesPositionsImp } from "./defaultNumericalSimulation";
import { DefaultVertexElement } from "./DefaultVertexElement";
import { DefaultEdgeElement } from "./DefaultEdgeElement";
import {
  NetworkGraph,
  vertexSpecification,
  edgeSpecification,
  VertexElementProps,
  EdgeElementProps,
  VertexWrapperProps,
} from "./NetworkGraph";
import { DraggableVertexWrapper } from "./DraggableVertexWrapper";

const defaultViewSize: readonly [number, number] = [100, 100];
const defaultViewOrigin: readonly [number, number] = [0, 0];

export interface vertexPosition {
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  frozen: boolean;
}

export interface updateVerticesPositions {
  (
    oldVerticesPositions: Map<string, vertexPosition>,
    width: number,
    height: number,
    edges: Array<edgeSpecification>,
    vertices: Array<vertexSpecification>,
    friction?: number,
    timeStep?: number,
    springConstant?: number,
    interbodyForceStrength?: number
  ): Map<string, vertexPosition>;
}

export interface DynamicNetworkGraphProps
  extends React.ComponentPropsWithoutRef<"svg"> {
  vertices: Array<vertexSpecification>;
  edges: Array<edgeSpecification>;
  backgroundColour?: string;
  stroke?: string;
  VertexRender?: React.FunctionComponent<VertexElementProps>;
  EdgeRender?: React.FunctionComponent<EdgeElementProps>;
  vertexPositionUpdater?: updateVerticesPositions;
  viewOrigin?: readonly [number, number];
  viewSize?: readonly [number, number];
  preserveGraphAspectRatio?: boolean;
}

/**
 * Dynamic network graph with draggable vertices.
 */
export function DynamicNetworkGraph({
  vertices = [],
  edges = [],
  backgroundColour = "white",
  stroke = "black",
  VertexRender = DefaultVertexElement,
  EdgeRender = DefaultEdgeElement,
  vertexPositionUpdater = updateVerticesPositionsImp,
  viewOrigin = defaultViewOrigin,
  viewSize = defaultViewSize,
  preserveGraphAspectRatio = true,
  ...otherProps
}: DynamicNetworkGraphProps) {
  // Keeps track of the current vertex positions.
  const [verticesPositions, setVerticesPositions] = useState(new Map());

  // Update the vertex positions on each frame.
  useEffect(() => {
    setVerticesPositions((oldVerticesPositions) =>
      vertexPositionUpdater(
        oldVerticesPositions,
        viewSize[0],
        viewSize[1],
        edges,
        vertices
      )
    );

    let frameId: number | null = null;

    function onFrame() {
      setVerticesPositions((oldVerticesPositions) =>
        vertexPositionUpdater(
          oldVerticesPositions,
          viewSize[0],
          viewSize[1],
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
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    }

    start();
    return () => stop();
  }, [viewSize, edges, vertices, vertexPositionUpdater]);

  /**
   * Manually move a vertex.
   * Called as vertices are dragged.
   *
   * @param {string} id - ID of the vertex to move.
   * @param {Object} position - New position for the vertex.
   */
  const moveVertex = useCallback(
    (id: string, position: { x: number; y: number }) => {
      setVerticesPositions((oldVerticesPositions) =>
        new Map(oldVerticesPositions.entries()).set(id, {
          ...oldVerticesPositions.get(id),
          cx: position.x,
          cy: position.y,
        })
      );
    },
    []
  );

  /**
   * Stop automatically updating the vertex position.
   * Called when a user starts dragging a vertex.
   *
   * @param {string} id - ID of the vertex to move.
   */
  const freezeVertex = useCallback((id: string) => {
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
  const unfreezeVertex = useCallback((id: string) => {
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
    (props: VertexWrapperProps) => {
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
      viewOrigin={viewOrigin}
      viewSize={viewSize}
      edges={edges}
      vertices={verticesWithPositions}
      stroke={stroke}
      backgroundColour={backgroundColour}
      preserveGraphAspectRatio={preserveGraphAspectRatio}
      {...otherProps}
    />
  );
}

DynamicNetworkGraph.propTypes = {
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

  /**
   * The origin of the rectangle to be viewed (in graph units).
   */
  viewOrigin: PropTypes.arrayOf(PropTypes.number),

  /**
   * The size of the rectangle to be viewed (in graph units).
   */
  viewSize: PropTypes.arrayOf(PropTypes.number),
};

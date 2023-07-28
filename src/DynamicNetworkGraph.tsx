import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { defaultUpdateVertexStates } from "./utils/defaultUpdateVertexStates";
import { DefaultVertexComponent } from "./components/DefaultVertexComponent";
import { DefaultEdgeComponent } from "./components/DefaultEdgeComponent";
import {
  NetworkGraph,
  VertexSpecification,
  EdgeSpecification,
  VertexComponentProps,
  EdgeComponentProps,
  VertexWrapperProps,
  VertexPosition,
} from "./NetworkGraph";
import { DraggableVertexWrapper } from "./components/DraggableVertexWrapper";

const defaultViewSize: readonly [number, number] = [100, 100];
const defaultViewOrigin: readonly [number, number] = [0, 0];

export interface VertexState {
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  frozen: boolean;
}

export interface UpdateVertexStates {
  (
    oldVerticesPositions: Map<string, VertexState>,
    width: number,
    height: number,
    edges: Array<EdgeSpecification & { length?: number }>,
    vertices: Array<VertexSpecification & { position?: VertexPosition }>,
    friction?: number,
    timeStep?: number,
    springConstant?: number,
    interbodyForceStrength?: number
  ): Map<string, VertexState>;
}

export interface DynamicNetworkGraphProps<
  V extends VertexSpecification,
  E extends EdgeSpecification
> extends React.ComponentPropsWithoutRef<"svg"> {
  vertices: Array<V & { position?: VertexPosition }>;
  edges: Array<E & { length?: number }>;
  backgroundColour?: string;
  stroke?: string;
  VertexComponent?: React.ComponentType<VertexComponentProps<V>>;
  EdgeComponent?: React.ComponentType<EdgeComponentProps>;
  updateVertexStates?: UpdateVertexStates;
  viewOrigin?: readonly [number, number];
  viewSize?: readonly [number, number];
  preserveGraphAspectRatio?: boolean;
}

/**
 * Dynamic network graph with draggable vertices.
 */
export function DynamicNetworkGraph<
  V extends VertexSpecification,
  E extends EdgeSpecification
>({
  vertices = [],
  edges = [],
  backgroundColour = "white",
  stroke = "black",
  VertexComponent = DefaultVertexComponent,
  EdgeComponent = DefaultEdgeComponent,
  updateVertexStates = defaultUpdateVertexStates,
  viewOrigin = defaultViewOrigin,
  viewSize = defaultViewSize,
  preserveGraphAspectRatio = true,
  ...otherProps
}: DynamicNetworkGraphProps<V, E>) {
  // Keeps track of the current vertex positions.
  const [vertexStates, setVertexStates] = useState(new Map());

  // Update the vertex positions on each frame.
  useEffect(() => {
    setVertexStates((oldVertexStates) =>
      updateVertexStates(
        oldVertexStates,
        viewSize[0],
        viewSize[1],
        edges,
        vertices
      )
    );

    let frameId: number | null = null;

    function onFrame() {
      setVertexStates((oldVertexStates) =>
        updateVertexStates(
          oldVertexStates,
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
  }, [viewSize, edges, vertices, updateVertexStates]);

  /**
   * Manually move a vertex.
   * Called as vertices are dragged.
   *
   * @param {string} id - ID of the vertex to move.
   * @param {Object} position - New position for the vertex.
   */
  const moveVertex = useCallback(
    (id: string, position: { x: number; y: number }) => {
      setVertexStates((oldVertexStates) =>
        new Map(oldVertexStates.entries()).set(id, {
          ...oldVertexStates.get(id),
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
    setVertexStates((oldVertexStates) =>
      new Map(oldVertexStates.entries()).set(id, {
        ...oldVertexStates.get(id),
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
    setVertexStates((oldVertexStates) =>
      new Map(oldVertexStates.entries()).set(id, {
        ...oldVertexStates.get(id),
        frozen: false,
      })
    );
  }, []);

  // Create a vertex wrapper that will permit dragging.
  // The use of `useCallback` prevents the vertices being
  // recreated by React on every frame.
  const VertexWrapper = useCallback(
    (props: VertexWrapperProps<V>) => {
      return (
        <DraggableVertexWrapper<V>
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
      const vertexPos = vertexStates.get(v.id);
      return vertexPos?.cx !== undefined && vertexPos?.cy !== undefined;
    })
    .map((v) => {
      const vertexPos = vertexStates.get(v.id);
      return { ...v, position: { cx: vertexPos.cx, cy: vertexPos.cy } };
    });

  return (
    <NetworkGraph
      VertexWrapper={VertexWrapper}
      VertexComponent={VertexComponent}
      EdgeComponent={EdgeComponent}
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
  VertexComponent: PropTypes.func,

  /**
   * Component to render at each edge.
   */
  EdgeComponent: PropTypes.func,

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

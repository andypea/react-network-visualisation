import { useCallback, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";

import { DefaultVertexComponent } from "./components/DefaultVertexComponent";
import { DefaultEdgeComponent } from "./components/DefaultEdgeComponent";
import { StaticVertexWrapper } from "./components/StaticVertexWrapper";
import {
  graphPositionToSvgPosition,
  svgPositionToGraphPosition,
} from "./utils/coordinateTransformations";

export interface VertexSpecification {
  id: string;
}

export interface Position {
  cx: number;
  cy: number;
}

export interface VertexComponentProps<V extends VertexSpecification> {
  vertexSpecification: V;
  backgroundColour: string;
}

export interface VertexWrapperProps<V extends VertexSpecification> {
  id: string;
  cx: number;
  cy: number;
  VertexRender: React.ComponentType<VertexComponentProps<V>>;
  vertexSpecification: V;
  backgroundColour: string;
  svgToGraphTransform: (
    svgPosition: readonly [number, number]
  ) => [number, number];
}

export interface EdgeSpecification {
  id: string;
  sourceId: string;
  targetId: string;
}

export interface EdgeComponentProps {
  source: { cx: number; cy: number };
  target: { cx: number; cy: number };
}

export interface NetworkGraphProps<
  V extends VertexSpecification,
  E extends EdgeSpecification
> extends React.ComponentPropsWithoutRef<"svg"> {
  VertexWrapper?: React.ComponentType<VertexWrapperProps<V>>;
  VertexComponent?: React.ComponentType<VertexComponentProps<V>>;
  EdgeComponent?: React.ComponentType<EdgeComponentProps>;
  vertices?: Array<V & { position: Position }>;
  edges?: Array<E>;
  backgroundColour?: string;
  stroke?: string;
  viewOrigin?: readonly [number, number];
  viewSize?: readonly [number, number];
  preserveGraphAspectRatio?: boolean;
  margin?: number;
}

const defaultViewOrigin: readonly [number, number] = [0, 0];
const defaultViewSize: readonly [number, number] = [100, 100];

/**
 * A static (by default) network graph.
 */
export const NetworkGraph = <
  V extends VertexSpecification = VertexSpecification,
  E extends EdgeSpecification = EdgeSpecification
>({
  VertexWrapper = StaticVertexWrapper<V>,
  VertexComponent = DefaultVertexComponent,
  EdgeComponent = DefaultEdgeComponent,
  vertices = [],
  edges = [],
  backgroundColour = "white",
  stroke = "black",
  viewOrigin = defaultViewOrigin,
  viewSize = defaultViewSize,
  preserveGraphAspectRatio = true,
  margin = 30,
  ...otherProps
}: NetworkGraphProps<V, E>) => {
  const [size, setSize] = useState<readonly [number, number]>([150, 150]);

  const resizeObserver = useRef(
    new ResizeObserver((entries) => {
      setSize([
        entries[0]?.contentBoxSize[0]?.inlineSize,
        entries[0]?.contentBoxSize[0]?.blockSize,
      ]);
    })
  );

  const updateResizeObserver = useCallback((node: SVGSVGElement) => {
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
      margin,
      preserveGraphAspectRatio
    );

    return new Map(
      vertices
        .filter(
          (v) => v?.position?.cx !== undefined && v?.position?.cy !== undefined
        )
        .map(({ id, position }) => {
          const svgPosition = coordinateTransformation([
            position?.cx ?? 0,
            position?.cy ?? 0,
          ]);
          return [
            id,
            {
              position: { cx: svgPosition[0], cy: svgPosition[1] },
            },
          ];
        })
    );
  }, [viewOrigin, viewSize, size, margin, vertices, preserveGraphAspectRatio]);

  const topLeft = graphPositionToSvgPosition(
    viewOrigin,
    viewSize,
    size,
    margin,
    preserveGraphAspectRatio
  )(viewOrigin).map((x) => x - margin);
  const bottomRight = graphPositionToSvgPosition(
    viewOrigin,
    viewSize,
    size,
    margin,
    preserveGraphAspectRatio
  )([viewOrigin[0] + viewSize[0], viewOrigin[1] + viewSize[1]]).map(
    (x) => x + margin
  );

  const svgToGraphTransform = useCallback(
    (svgPosition: readonly [number, number]) => {
      return svgPositionToGraphPosition(
        viewOrigin,
        viewSize,
        size,
        margin,
        preserveGraphAspectRatio
      )(svgPosition);
    },
    [viewOrigin, viewSize, size, margin, preserveGraphAspectRatio]
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
                      verticesPositions.has(e.sourceId) &&
                      verticesPositions.has(e.targetId)
                  )
                  .map((e) => {
                    return (
                      <EdgeComponent
                        key={e.id}
                        source={
                          verticesPositions.get(e.sourceId)?.position ?? {
                            cx: 0,
                            cy: 0,
                          }
                        }
                        target={
                          verticesPositions.get(e.targetId)?.position ?? {
                            cx: 0,
                            cy: 0,
                          }
                        }
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
                    cx={verticesPositions.get(v.id)?.position?.cx ?? 0}
                    cy={verticesPositions.get(v.id)?.position?.cy ?? 0}
                    VertexRender={VertexComponent}
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

  /**
   * Whether to preserve the aspect ratio when mapping from Graph coords to SVG coords.
   */
  preserveGraphAspectRatio: PropTypes.bool,

  /**
   * The size of the margin to place around the graph (in SVG pixels)/
   */
  margin: PropTypes.number,
};

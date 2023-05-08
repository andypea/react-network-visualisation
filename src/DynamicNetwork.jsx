import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { updateVerticesPositions } from "./defaultNumericalSimulation.js";
import { DefaultVertexElement } from "./DefaultVertexElement.jsx";
import { DefaultEdgeElement } from "./DefaultEdgeElement.jsx";
import { Network } from "./Network.jsx";
import { DraggableVertexWrapper } from "./DraggableVertexWrapper.jsx";

export function DynamicNetwork({
  VertexRender = DefaultVertexElement,
  EdgeRender = DefaultEdgeElement,
  vertexPositionUpdater = updateVerticesPositions,
  width = 100,
  height = 100,
  vertices = [],
  edges = [],
  backgroundColour = "white",
  stroke = "black",
} = {}) {
  const [verticesPositions, setVerticesPositions] = useState(new Map());

  useEffect(() => {
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

  const moveVertex = useCallback((id, position) => {
    setVerticesPositions((oldVerticesPositions) =>
      new Map(oldVerticesPositions.entries()).set(id, {
        ...oldVerticesPositions.get(id),
        cx: position.x,
        cy: position.y,
      })
    );
  }, []);

  const freezeVertex = useCallback((id) => {
    setVerticesPositions((oldVerticesPositions) =>
      new Map(oldVerticesPositions.entries()).set(id, {
        ...oldVerticesPositions.get(id),
        frozen: true,
      })
    );
  }, []);

  const unfreezeVertex = useCallback((id) => {
    setVerticesPositions((oldVerticesPositions) =>
      new Map(oldVerticesPositions.entries()).set(id, {
        ...oldVerticesPositions.get(id),
        frozen: false,
      })
    );
  }, []);

  const verticesWithPositions = vertices.map((v) => {
    const vertexPos = verticesPositions.get(v.id);
    if (vertexPos?.cx !== undefined && vertexPos?.cy !== undefined) {
      return { ...v, position: { cx: vertexPos.cx, cy: vertexPos.cy } };
    } else {
      return v;
    }
  });

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

  return (
    <Network
      VertexWrapper={VertexWrapper}
      VertexRender={VertexRender}
      EdgeRender={EdgeRender}
      width={width}
      height={height}
      edges={edges}
      vertices={verticesWithPositions}
      stroke={stroke}
      backgroundColour={backgroundColour}
    />
  );
}

DynamicNetwork.propTypes = {
  VertexRender: PropTypes.func,
  EdgeRender: PropTypes.func,
  edges: PropTypes.array,
  vertices: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColour: PropTypes.string,
  stroke: PropTypes.string,
  vertexPositionUpdater: PropTypes.func,
};

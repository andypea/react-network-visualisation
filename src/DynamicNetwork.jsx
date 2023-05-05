import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { updateVerticesPositions } from "./numericalSimulation.js";
import { DefaultVertexElement } from "./DefaultVertexElement.jsx";
import { Network } from "./Network.jsx";

export function DynamicNetwork({
  vertexRender = (vertexSpecification) => (
    <DefaultVertexElement {...vertexSpecification} />
  ),
  width = 100,
  height = 100,
  ...props
} = {}) {
  const [verticesPositions, setVerticesPositions] = useState(new Map());

  const timeStep = 0.005;
  const friction = 10;
  const springConstant = 10;

  useEffect(() => {
    let frameId = null;

    function onFrame() {
      setVerticesPositions((oldVerticesPositions) =>
        updateVerticesPositions(
          oldVerticesPositions,
          width,
          height,
          friction,
          timeStep,
          props.edges,
          springConstant,
          props.vertices
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
  }, [width, height, props.edges, props.vertices]);

  const moveVertex = (id, position) => {
    setVerticesPositions((oldVerticesPositions) =>
      new Map(oldVerticesPositions.entries()).set(id, {
        ...oldVerticesPositions.get(id),
        cx: position.x,
        cy: position.y,
      })
    );
  };

  const freezeVertex = (id) => {
    setVerticesPositions((oldVerticesPositions) =>
      new Map(oldVerticesPositions.entries()).set(id, {
        ...oldVerticesPositions.get(id),
        frozen: true,
      })
    );
  };

  const unfreezeVertex = (id) => {
    setVerticesPositions((oldVerticesPositions) =>
      new Map(oldVerticesPositions.entries()).set(id, {
        ...oldVerticesPositions.get(id),
        frozen: false,
      })
    );
  };

  const verticesWithPositions = props.vertices.map((v) => {
    const vertexPos = verticesPositions.get(v.id);
    if (vertexPos?.cx !== undefined && vertexPos?.cy !== undefined) {
      return { ...v, position: { cx: vertexPos.cx, cy: vertexPos.cy } };
    } else {
      return v;
    }
  });

  return (
    <Network
      vertexRender={vertexRender}
      width={width}
      height={height}
      edges={props.edges}
      vertices={verticesWithPositions}
      moveVetex={moveVertex}
      freezeVertex={freezeVertex}
      unfreezeVertex={unfreezeVertex}
    />
  );
}

DynamicNetwork.propTypes = {
  vertexRender: PropTypes.func,
  edges: PropTypes.array,
  vertices: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};

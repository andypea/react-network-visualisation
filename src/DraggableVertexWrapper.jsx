import { useState, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Vertex wrapper that makes the vertices draggable.
 */
export const DraggableVertexWrapper = (props) => {
  const thisVertex = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleOnPointerDown = (event) => {
    thisVertex.current.setPointerCapture(event.pointerId);

    setDragging(true);
    props.freezeVertex(props.id);

    // const screenToLocalTransformationMatrix = thisVertex.current.getScreenCTM();
    const pointerScreenPosition = new DOMPointReadOnly(
      event.pageX,
      event.pageY
    );
    // const pointerLocalPosition = pointerScreenPosition.matrixTransform(screenToLocalTransformationMatrix.inverse());
    setOffset({
      x: pointerScreenPosition.x - props.cx,
      y: pointerScreenPosition.y - props.cy,
    });
  };

  const handleOnPointerMove = (event) => {
    if (dragging) {
      // const screenToLocalTransformationMatrix = thisVertex.current.getScreenCTM();
      const pointerScreenPosition = new DOMPointReadOnly(
        event.pageX,
        event.pageY
      );
      // const pointerLocalPosition = pointerScreenPosition.matrixTransform(screenToLocalTransformationMatrix.inverse());
      props.moveVertex(props.id, {
        x: pointerScreenPosition.x - offset.x,
        y: pointerScreenPosition.y - offset.y,
      });
    }
  };

  const handleOnPointerUp = (event) => {
    setDragging(false);
    props.unfreezeVertex(props.id);
    thisVertex.current.releasePointerCapture(event.pointerId);
  };

  return (
    <g
      ref={thisVertex}
      transform={`translate(${props.cx} ${props.cy})`}
      onPointerDown={handleOnPointerDown}
      onPointerMove={handleOnPointerMove}
      onPointerUp={handleOnPointerUp}
    >
      <props.VertexRender
        vertexSpecification={props.vertexSpecification}
        backgroundColour={props.backgroundColour}
      />
    </g>
  );
};

DraggableVertexWrapper.propTypes = {
  /**
   * Function that pauses automatic updates of the vertex's position, called when dragging begins.
   */
  freezeVertex: PropTypes.func.isRequired,

  /**
   * Function that re-enabled updates of the vertex's position, called when dragging stops.
   */
  unfreezeVertex: PropTypes.func.isRequired,

  /**
   * Function that moves the vertex.
   */
  moveVertex: PropTypes.func.isRequired,

  /**
   * ID of the current vertex.
   */
  id: PropTypes.string.isRequired,

  /**
   * Position of the current vertex (x-value).
   */
  cx: PropTypes.number.isRequired,

  /**
   * Position of the current vertex (y-value).
   */
  cy: PropTypes.number.isRequired,

  /**
   * Component that renders the visible vertex.
   */
  VertexRender: PropTypes.func.isRequired,

  /**
   * The vertex specification supplied to the network graph.
   */
  vertexSpecification: PropTypes.object.isRequired,

  /**
   * The background colour of the network graph.
   */
  backgroundColour: PropTypes.string,
};

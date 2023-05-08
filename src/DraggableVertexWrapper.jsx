import { useState, useRef } from "react";
import PropTypes from "prop-types";

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
  freezeVertex: PropTypes.func.isRequired,
  unfreezeVertex: PropTypes.func.isRequired,
  moveVertex: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  VertexRender: PropTypes.func.isRequired,
  vertexSpecification: PropTypes.object.isRequired,
  backgroundColour: PropTypes.string,
};

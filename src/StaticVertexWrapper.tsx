import PropTypes from "prop-types";

/**
 * A component that wraps each vertex and sets the position.
 */
export const StaticVertexWrapper = (props: VertexWrapperProps) => {
  return (
    <g transform={`translate(${props.cx} ${props.cy})`}>
      <props.VertexRender
        vertexSpecification={props.vertexSpecification}
        backgroundColour={props.backgroundColour}
      />
    </g>
  );
};

StaticVertexWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  VertexRender: PropTypes.func.isRequired,
  vertexSpecification: PropTypes.exact({
    id: PropTypes.string.isRequired,
    position: PropTypes.exact({
      cx: PropTypes.number.isRequired,
      cy: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  backgroundColour: PropTypes.string.isRequired,
  svgToGraphTransform: PropTypes.func.isRequired,
};

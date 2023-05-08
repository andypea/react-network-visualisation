import PropTypes from "prop-types";

export const StaticVertexWrapper = (props) => {
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
  cx: PropTypes.number,
  cy: PropTypes.number,
  VertexRender: PropTypes.func,
  vertexSpecification: PropTypes.object,
  backgroundColour: PropTypes.string,
  strokeColour: PropTypes.string,
};

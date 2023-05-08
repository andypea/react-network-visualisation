import PropTypes from "prop-types";

export const StaticVertexWrapper = (props) => {
  return (
    <g transform={`translate(${props.cx} ${props.cy})`}>
      <props.VertexRender {...props.vertexSpecification} />
    </g>
  );
};

StaticVertexWrapper.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  VertexRender: PropTypes.func,
  vertexSpecification: PropTypes.object,
};

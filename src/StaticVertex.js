import PropTypes from "prop-types";

export const StaticVertex = (props) => {
  return (
    <g transform={`translate(${props.cx} ${props.cy})`}>
      <props.VertexRender {...props.vertexSpecification} />
    </g>
  );
};

StaticVertex.propTypes = {
  VertexRender: PropTypes.func.isRequired,
  vertexSpecification: PropTypes.object.isRequired,
  cx: PropTypes.number,
  cy: PropTypes.number,
};

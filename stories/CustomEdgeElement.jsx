import PropTypes from "prop-types";

export const CustomEdgeElement = ({ source, target }) => {
  return (
    <line
      x1={source.cx}
      y1={source.cy}
      x2={target.cx}
      y2={target.cy}
      stroke="pink"
      strokeWidth="10px"
      strokeDasharray={[1, 2, 3]}
    />
  );
};

CustomEdgeElement.propTypes = {
  source: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
};

import PropTypes from "prop-types";

export const Edge = ({ source, target }) => {
  return (
    <line
      x1={source.cx}
      y1={source.cy}
      x2={target.cx}
      y2={target.cy}
      stroke="grey"
    />
  );
};

Edge.propTypes = {
  source: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
};

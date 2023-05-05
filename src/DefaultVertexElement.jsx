import PropTypes from "prop-types";

export const DefaultVertexElement = ({ fill = "none", label = "" }) => {
  return (
    <g>
      <circle r="5" fill={fill} stroke="black" />
      <text
        dominantBaseline="middle"
        textAnchor="middle"
        y="20"
        stroke="white"
        strokeWidth="5"
        style={{ userSelect: "none" }}
      >
        {label}
      </text>
      <text
        dominantBaseline="middle"
        textAnchor="middle"
        y="20"
        style={{ userSelect: "none" }}
      >
        {label}
      </text>
    </g>
  );
};

DefaultVertexElement.propTypes = {
  fill: PropTypes.string,
  label: PropTypes.string,
};

import PropTypes from "prop-types";

export const DefaultVertexElement = (props) => {
  const vertexSpecification = {
    fill: "none",
    label: "",
    ...props.vertexSpecification,
  };
  return (
    <g>
      <circle r="5" fill={vertexSpecification.fill} stroke="black" />
      <text
        dominantBaseline="middle"
        textAnchor="middle"
        y="20"
        stroke={props.backgroundColour ?? "white"}
        strokeWidth="5"
        style={{ userSelect: "none" }}
      >
        {vertexSpecification.label}
      </text>
      <text
        dominantBaseline="middle"
        textAnchor="middle"
        y="20"
        style={{ userSelect: "none" }}
      >
        {vertexSpecification.label}
      </text>
    </g>
  );
};

DefaultVertexElement.propTypes = {
  vertexSpecification: PropTypes.object,
  backgroundColour: PropTypes.string,
};

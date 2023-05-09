import PropTypes from "prop-types";

export const CustomVertexElement = (props) => {
  const vertexSpecification = {
    fill: "none",
    label: "",
    ...props.vertexSpecification,
  };
  return (
    <g>
      <text
        dominantBaseline="middle"
        textAnchor="middle"
        stroke={props.backgroundColour ?? "white"}
        strokeWidth="5"
        style={{ userSelect: "none" }}
      >
        {"🌊" + vertexSpecification.label}
      </text>
      <text
        dominantBaseline="middle"
        textAnchor="middle"
        style={{ userSelect: "none" }}
      >
        {"🌊" + vertexSpecification.label}
      </text>
    </g>
  );
};

CustomVertexElement.propTypes = {
  vertexSpecification: PropTypes.object,
  backgroundColour: PropTypes.string,
};

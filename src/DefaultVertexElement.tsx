import PropTypes from "prop-types";

/**
 * The default component to render at each vertex.
 */
export const DefaultVertexElement = (props: VertexElementProps) => {
  // Set some default property values if they are missing.
  const vertexSpecification = {
    fill: "none",
    label: "",
    ...props.vertexSpecification,
  };
  return (
    <g>
      <circle r="5" fill={vertexSpecification.fill} stroke="black" />
      <text
        // Create a plain background for the text.
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
  /**
   * The vertex specification supplied to the network graph.
   */
  vertexSpecification: PropTypes.object,

  /**
   * The background colour of the network graph.
   */
  backgroundColour: PropTypes.string,
};

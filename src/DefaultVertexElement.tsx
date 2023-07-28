import PropTypes from "prop-types";
import { VertexElementProps, vertexSpecification } from "./NetworkGraph";

/**
 * The default component to render at each vertex.
 */
export const DefaultVertexElement = (
  props: VertexElementProps<vertexSpecification>
) => {
  // Set some default property values if they are missing.
  const vertexSpecification = {
    fill: "none",
    label: "",
    ...props.vertexSpecification,
  };
  return (
    <g>
      <circle r="5" fill={vertexSpecification.fill ?? "none"} stroke="black" />
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
  vertexSpecification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.exact({
      cx: PropTypes.number.isRequired,
      cy: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,

  /**
   * The background colour of the network graph.
   */
  backgroundColour: PropTypes.string.isRequired,
} as object;

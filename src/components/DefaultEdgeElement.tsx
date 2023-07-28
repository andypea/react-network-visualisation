import PropTypes from "prop-types";
import { EdgeElementProps } from "../NetworkGraph";

/**
 * The default component to render at each edge.
 */
export const DefaultEdgeElement = ({ source, target }: EdgeElementProps) => {
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

DefaultEdgeElement.propTypes = {
  /**
   * The position of the source vertex.
   */
  source: PropTypes.exact({
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
  }).isRequired,

  /**
   * The position of the target vertex.
   */
  target: PropTypes.exact({
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
  }).isRequired,
};

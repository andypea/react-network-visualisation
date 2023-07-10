interface vertexPosition {
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  frozen: boolean;
}

interface EdgeElementProps {
  source: vertexPosition;
  target: vertexPosition;
}

interface VertexElementProps {
  vertexSpecification: vertexSpecification;
  backgroundColour: string;
}

interface VertexElementProps {}

interface vertexSpecification {
  id: string;
  position?: { cx: number; cy: number };
}

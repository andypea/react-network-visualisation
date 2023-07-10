interface vertexPosition {
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  frozen: boolean;
}

interface EdgeElementProps {
  source: { cx: number; cy: number };
  target: { cx: number; cy: number };
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

interface edgeSpecification {
  id: string;
  source: string;
  target: string;
  length?: number;
}

interface VertexWrapperProps {
  id: string;
  cx: number;
  cy: number;
  VertexRender: React.FunctionComponent<VertexElementProps>;
  vertexSpecification: vertexSpecification;
  backgroundColour: string;
  svgToGraphTransform: (
    svgPosition: readonly [number, number]
  ) => readonly [number, number];
}

interface NetworkGraphProps {
  VertexWrapper?: React.FunctionComponent<VertexWrapperProps>;
  VertexRender?: React.FunctionComponent<VertexElementProps>;
  EdgeRender?: React.FunctionComponent<EdgeElementProps>;
  vertices?: Array<vertexSpecification>;
  edges?: Array<edgeSpecification>;
  backgroundColour?: string;
  stroke?: string;
  viewOrigin?: readonly [number, number];
  viewSize?: readonly [number, number];
  preserveAspectRatio?: boolean;
  margin?: number;
}

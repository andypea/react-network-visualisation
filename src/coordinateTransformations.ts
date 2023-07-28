export const graphPositionToSvgPosition =
  (
    viewOrigin: readonly [number, number],
    viewSize: readonly [number, number],
    size: readonly [number, number],
    margin: number,
    preserveGraphAspectRatio: boolean
  ) =>
  (graphPosition: readonly [number, number]): [number, number] => {
    const scalingFactorValues = scalingFactors(
      size,
      margin,
      viewSize,
      preserveGraphAspectRatio
    );

    return [
      scalingFactorValues[0] * (graphPosition[0] - viewOrigin[0]) -
        (scalingFactorValues[0] * viewSize[0] - (size[0] - 2 * margin)) / 2 +
        margin,
      scalingFactorValues[1] * (graphPosition[1] - viewOrigin[1]) -
        (scalingFactorValues[1] * viewSize[1] - (size[1] - 2 * margin)) / 2 +
        margin,
    ];
  };

export const svgPositionToGraphPosition =
  (
    viewOrigin: readonly [number, number],
    viewSize: readonly [number, number],
    size: readonly [number, number],
    margin: number,
    preserveGraphAspectRatio: boolean
  ) =>
  (svgPosition: readonly [number, number]): [number, number] => {
    const scalingFactorValues = scalingFactors(
      size,
      margin,
      viewSize,
      preserveGraphAspectRatio
    );

    return [
      (svgPosition[0] -
        margin +
        (scalingFactorValues[0] * viewSize[0] - (size[0] - 2 * margin)) / 2) /
        scalingFactorValues[0] +
        viewOrigin[0],
      (svgPosition[1] -
        margin +
        (scalingFactorValues[1] * viewSize[1] - (size[1] - 2 * margin)) / 2) /
        scalingFactorValues[1] +
        viewOrigin[1],
    ];
  };

const scalingFactors = (
  size: readonly [number, number],
  margin: number,
  viewSize: readonly [number, number],
  preserveGraphAspectRatio: boolean
): [number, number] => {
  let scalingFactors: [number, number] = [
    (size[0] - 2 * margin) / viewSize[0],
    (size[1] - 2 * margin) / viewSize[1],
  ];

  if (preserveGraphAspectRatio) {
    const minScalingFactor = Math.min(...scalingFactors);
    scalingFactors = [minScalingFactor, minScalingFactor];
  }

  return scalingFactors;
};

export const graphPositionToSvgPosition =
  (
    viewOrigin: readonly [number, number],
    viewSize: readonly [number, number],
    size: readonly [number, number],
    margin: number
  ) =>
  (graphPosition: [number, number]) => {
    const scalingFactor = Math.min(
      (size[0] - 2 * margin) / viewSize[0],
      (size[1] - 2 * margin) / viewSize[1]
    );

    return [
      scalingFactor * (graphPosition[0] - viewOrigin[0]) -
        (scalingFactor * viewSize[0] - (size[0] - 2 * margin)) / 2 +
        margin,
      scalingFactor * (graphPosition[1] - viewOrigin[1]) -
        (scalingFactor * viewSize[1] - (size[1] - 2 * margin)) / 2 +
        margin,
    ];
  };

export const svgPositionToGraphPosition =
  (
    viewOrigin: readonly [number, number],
    viewSize: readonly [number, number],
    size: readonly [number, number],
    margin: number
  ) =>
  (svgPosition: readonly [number, number]) => {
    const scalingFactor = Math.min(
      (size[0] - 2 * margin) / viewSize[0],
      (size[1] - 2 * margin) / viewSize[1]
    );

    return [
      (svgPosition[0] -
        margin +
        (scalingFactor * viewSize[0] - (size[0] - 2 * margin)) / 2) /
        scalingFactor +
        viewOrigin[0],
      (svgPosition[1] -
        margin +
        (scalingFactor * viewSize[1] - (size[1] - 2 * margin)) / 2) /
        scalingFactor +
        viewOrigin[1],
    ];
  };

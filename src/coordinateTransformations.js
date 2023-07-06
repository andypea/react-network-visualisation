export const graphPositionToSvgPosition =
  (viewOrigin, viewSize, size, margin) => (graphPosition) => {
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
  (viewOrigin, viewSize, size, margin) => (svgPosition) => {
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

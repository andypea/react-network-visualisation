/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DynamicNetworkGraph } from "../src/DynamicNetworkGraph";
import { ResizeObserver } from "./mocks/resizeObserver.mock";

global.ResizeObserver = ResizeObserver;

test("loads a basic graph", async () => {
  render(
    <DynamicNetworkGraph
      data-testid="network-graph"
      vertices={[
        { id: "One", fill: "red", label: "One", position: { cx: 25, cy: 25 } },
        {
          id: "Two",
          fill: "orange",
          label: "Two",
          position: { cx: 75, cy: 25 },
        },
        {
          id: "Three",
          fill: "yellow",
          label: "Three",
          position: { cx: 25, cy: 75 },
        },
        {
          id: "Four",
          fill: "green",
          label: "Four",
          position: { cx: 75, cy: 75 },
        },
      ]}
      edges={[
        { id: "OneTwo", sourceId: "One", targetId: "Two" },
        { id: "OneFour", sourceId: "One", targetId: "Four" },
        { id: "TwoThree", sourceId: "Two", targetId: "Three" },
        { id: "ThreeFour", sourceId: "Three", targetId: "Four" },
      ]}
    />
  );

  const networkGraphElement = screen.getByTestId("network-graph");

  expect(networkGraphElement.getElementsByTagName("line")).toHaveLength(4);
  expect(networkGraphElement.getElementsByTagName("circle")).toHaveLength(4);
});

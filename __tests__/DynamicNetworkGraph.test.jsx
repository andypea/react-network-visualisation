/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DynamicNetworkGraph } from "../src/DynamicNetworkGraph.jsx";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

test("loads a basic graph", async () => {
  // ARRANGE
  render(
    <DynamicNetworkGraph
      data-testid="network-graph"
      vertices={[
        {
          id: "One",
          fill: "red",
          label: "One",
          position: { cx: 100, cy: 100 },
        },
        {
          id: "Two",
          fill: "orange",
          label: "Two",
          position: { cx: 300, cy: 100 },
        },
        {
          id: "Three",
          fill: "yellow",
          label: "Three",
          position: { cx: 100, cy: 300 },
        },
        {
          id: "Four",
          fill: "green",
          label: "Four",
          position: { cx: 300, cy: 300 },
        },
      ]}
      edges={[
        { id: "OneTwo", source: "One", target: "Two" },
        { id: "OneFour", source: "One", target: "Four" },
        { id: "TwoThree", source: "Two", target: "Three" },
        { id: "ThreeFour", source: "Three", target: "Four" },
      ]}
    />
  );

  const networkGraphElement = screen.getByTestId("network-graph");

  // ASSERT
  expect(networkGraphElement.getElementsByTagName("line")).toHaveLength(4);
  expect(networkGraphElement.getElementsByTagName("circle")).toHaveLength(4);
});

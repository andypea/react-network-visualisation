/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NetworkGraph } from "../src/NetworkGraph";
import { ResizeObserver } from "./mocks/resizeObserver.mock";

global.ResizeObserver = ResizeObserver;

test("loads a basic graph", async () => {
  // ARRANGE
  render(
    <NetworkGraph
      width="400"
      height="400"
      data-testid="network-graph"
      vertices={[
        {
          id: "One",
          fill: "red",
          label: "One",
          position: { cx: 0, cy: 0 },
        },
        {
          id: "Two",
          fill: "orange",
          label: "Two",
          position: { cx: 100, cy: 0 },
        },
        {
          id: "Three",
          fill: "yellow",
          label: "Three",
          position: { cx: 0, cy: 100 },
        },
        {
          id: "Four",
          fill: "green",
          label: "Four",
          position: { cx: 100, cy: 100 },
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

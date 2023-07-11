import { DynamicNetworkGraph } from "../src/DynamicNetworkGraph";
import { CustomEdgeElement } from "./CustomEdgeElement";
import { CustomVertexElement } from "./CustomVertexElement";

export default {
  title: "Examples/DynamicNetworkGraph",
  component: DynamicNetworkGraph,
  tags: ["autodocs"],
  argTypes: {
    backgroundColour: { control: "color" },
    stroke: { control: "color" },
    VertexRender: { table: { category: "advanced", defaultValue: "" } },
    EdgeRender: { table: { category: "advanced", defaultValue: "" } },
    vertexPositionUpdater: {
      table: { category: "advanced", defaultValue: "" },
    },
  },
  args: {
    width: "100%",
    height: "100%",
    viewSize: [100, 100],
    vertices: [
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
    ],
    edges: [
      { id: "OneTwo", source: "One", target: "Two", length: 10 * 3 },
      { id: "OneThree", source: "One", target: "Three", length: 10 * 4 },
      { id: "OneFour", source: "One", target: "Four", length: 10 * 5 },
      { id: "TwoThree", source: "Two", target: "Three", length: 10 * 5 },
      { id: "TwoFour", source: "Two", target: "Four", length: 10 * 4 },
      { id: "ThreeFour", source: "Three", target: "Four", length: 10 * 3 },
    ],
  },
};

export const Māhutonga = {
  args: {
    vertices: [
      {
        id: "Gacrux",
        label: "Gacrux",
        fill: "yellow",
        position: { cx: 50, cy: 33 },
      },
      {
        id: "Mimosa",
        label: "Mimosa",
        fill: "white",
        position: { cx: 25, cy: 38 },
      },
      {
        id: "Acrux",
        label: "Acrux",
        fill: "white",
        position: { cx: 50, cy: 68 },
      },
      {
        id: "Imai",
        label: "Imai",
        fill: "white",
        position: { cx: 75, cy: 31 },
      },
      {
        id: "Ginan",
        label: "Ginan",
        fill: "lightblue",
        position: { cx: 60, cy: 63 },
      },
    ],
    edges: [
      { id: "GacruxAcrux", source: "Gacrux", target: "Acrux", length: 75 },
      { id: "MimosaImai", source: "Mimosa", target: "Imai", length: 50 },
    ],
  },
};

export const Rectangle = {
  args: {},
};

export const RandomTriangle = {
  args: {
    vertices: [
      { id: "A", fill: "indigo", label: "A" },
      { id: "B", fill: "violet", label: "B" },
      { id: "C", fill: "black", label: "C" },
    ],
    edges: [
      { id: "AB", source: "A", target: "B", length: 100 },
      { id: "AC", source: "A", target: "C", length: 100 },
      { id: "BC", source: "B", target: "C", length: 100 },
    ],
  },
};

export const CustomEdges = {
  args: {
    EdgeRender: CustomEdgeElement,
  },
};

export const CustomVertices = {
  args: { VertexRender: CustomVertexElement },
};

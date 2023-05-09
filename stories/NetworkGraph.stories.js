import { NetworkGraph } from "../src/NetworkGraph.jsx";
import { CustomVertexElement } from "./CustomVertexElement.jsx";
import { CustomEdgeElement } from "./CustomEdgeElement.jsx";

export default {
  title: "Examples/NetworkGraph",
  component: NetworkGraph,
  tags: ["autodocs"],
  args: {
    width: 400,
    height: 400,
    vertices: [
      { id: "One", fill: "red", label: "Foo", position: { cx: 100, cy: 100 } },
      {
        id: "Two",
        fill: "orange",
        label: "Bar",
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
    ],
    edges: [
      { id: "OneTwo", source: "One", target: "Two" },
      { id: "OneThree", source: "One", target: "Three" },
      { id: "OneFour", source: "One", target: "Four" },
      { id: "TwoThree", source: "Two", target: "Three" },
      { id: "TwoFour", source: "Two", target: "Four" },
      { id: "ThreeFour", source: "Three", target: "Four" },
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
        position: { cx: 200, cy: 50 },
      },
      {
        id: "Mimosa",
        label: "Mimosa",
        fill: "white",
        position: { cx: 100, cy: 150 },
      },
      {
        id: "Acrux",
        label: "Acrux",
        fill: "white",
        position: { cx: 200, cy: 350 },
      },
      {
        id: "Imai",
        label: "Imai",
        fill: "white",
        position: { cx: 300, cy: 125 },
      },
      {
        id: "Ginan",
        label: "Ginan",
        fill: "lightblue",
        position: { cx: 240, cy: 250 },
      },
    ],
    edges: [
      { id: "GacruxAcrux", source: "Gacrux", target: "Acrux" },
      { id: "MimosaImai", source: "Mimosa", target: "Imai" },
    ],
  },
};

export const Square = {
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
      { id: "AB", source: "A", target: "B" },
      { id: "AC", source: "A", target: "C" },
      { id: "BC", source: "B", target: "C" },
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

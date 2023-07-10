import { NetworkGraph } from "../src/NetworkGraph";
import { CustomVertexElement } from "./CustomVertexElement";
import { CustomEdgeElement } from "./CustomEdgeElement";

export default {
  title: "Examples/NetworkGraph",
  component: NetworkGraph,
  tags: ["autodocs"],
  args: {
    width: "100%",
    height: "100%",
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
        position: { cx: 50, cy: 13 },
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
        position: { cx: 50, cy: 88 },
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
      { id: "GacruxAcrux", source: "Gacrux", target: "Acrux" },
      { id: "MimosaImai", source: "Mimosa", target: "Imai" },
    ],
  },
};

export const Square = {
  args: {},
};

export const Triangle = {
  args: {
    vertices: [
      { id: "A", fill: "indigo", label: "A", position: { cx: 0, cy: 0 } },
      { id: "B", fill: "violet", label: "B", position: { cx: 100, cy: 50 } },
      { id: "C", fill: "black", label: "C", position: { cx: 0, cy: 100 } },
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

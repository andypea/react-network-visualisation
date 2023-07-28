import { NetworkGraph } from "../src/NetworkGraph";
import { CustomVertexElement } from "./CustomVertexElement";
import { CustomEdgeElement } from "./CustomEdgeElement";

export default {
  title: "Examples/NetworkGraph",
  component: NetworkGraph,
  tags: ["autodocs"],
  argTypes: {
    backgroundColour: { control: "color" },
    stroke: { control: "color" },
    VertexRender: { table: { category: "advanced", defaultValue: "" } },
    EdgeRender: { table: { category: "advanced", defaultValue: "" } },
    VertexWrapper: { table: { category: "advanced", defaultValue: "" } },
    vertexPositionUpdater: {
      table: { category: "advanced", defaultValue: "" },
    },
  },
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
      { id: "OneTwo", sourceId: "One", targetId: "Two" },
      { id: "OneThree", sourceId: "One", targetId: "Three" },
      { id: "OneFour", sourceId: "One", targetId: "Four" },
      { id: "TwoThree", sourceId: "Two", targetId: "Three" },
      { id: "TwoFour", sourceId: "Two", targetId: "Four" },
      { id: "ThreeFour", sourceId: "Three", targetId: "Four" },
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
      { id: "GacruxAcrux", sourceId: "Gacrux", targetId: "Acrux" },
      { id: "MimosaImai", sourceId: "Mimosa", targetId: "Imai" },
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
      { id: "AB", sourceId: "A", targetId: "B" },
      { id: "AC", sourceId: "A", targetId: "C" },
      { id: "BC", sourceId: "B", targetId: "C" },
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

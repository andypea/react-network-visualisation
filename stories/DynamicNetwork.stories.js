import { DynamicNetwork } from "../src/DynamicNetwork.jsx";

export default {
  title: "Examples/DynamicNetwork",
  component: DynamicNetwork,
  tags: ["autodocs"],
  args: {
    width: 400,
    height: 400,
    backgroundColour: "lightgrey",
  },
};

export const Māhutonga = {
  args: {
    vertices: [
      {
        id: "Gacrux",
        label: "Gacrux",
        fill: "yellow",
        position: { cx: 200, cy: 100 },
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
        position: { cx: 200, cy: 250 },
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
      { id: "GacruxAcrux", source: "Gacrux", target: "Acrux", length: 300 },
      { id: "MimosaImai", source: "Mimosa", target: "Imai", length: 200 },
    ],
  },
};

export const Square = {
  args: {
    vertices: [
      { id: "One", fill: "red", label: "One", position: { cx: 100, cy: 100 } },
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
    ],
    edges: [
      { id: "OneTwo", source: "One", target: "Two", length: 100 },
      { id: "OneThree", source: "One", target: "Three", length: 100 },
      { id: "OneFour", source: "One", target: "Four", length: 100 },
      { id: "TwoThree", source: "Two", target: "Three", length: 100 },
      { id: "TwoFour", source: "Two", target: "Four", length: 100 },
      { id: "ThreeFour", source: "Three", target: "Four", length: 100 },
    ],
  },
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

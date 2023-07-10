# react-simple-network-graph

## Introduction

This package contains React components that render network graphs.
It exports two components:

- `<NetworkGraph />`, which will render a static network graph; and
- `<DynamicNetworkGraph />`, which will render a dynamic graph, with draggable vertices and a numerical simulation that adjusts the vertex positions until an optimised edge length is obtained.

![Graph of a star constellation](https://raw.github.com/andypea/react-simple-network-graph/master/public/mahutonga.png?sanitize=true)

The package is not optimised for the display of huge networks.
However, its has minimal dependencies and is very lightweight.
Both the visual display of the graphs and the movement of the dynamic graph can be customised.

## Examples

See the project website: <https://andypea.github.io/react-simple-network-graph>

## Installation

The components exported by this package are [React](https://react.dev/) components.
You can use them within your existing React app or [create a new one](https://react.dev/learn/start-a-new-react-project).

Once you have created your React app install the react-svg-stars package:

```
npm install react-simple-network-graph
```

or

```
yarn install react-simple-network-graph
```

## Usage

Once installed, you can import and use the `NetworkGraph` or `DynamicNetworkGraph` component within your app:

```
import { DynamicNetworkGraph } from 'react-simple-network-graph';

...

<DynamicNetworkGraph
    width={400}
    height={400}
    vertices={[
      { id: "Gacrux", label: "Gacrux", fill: "yellow", position: { cx: 200, cy: 100 }, },
      { id: "Mimosa", label: "Mimosa", fill: "white", position: { cx: 100, cy: 150 }, },
      { id: "Acrux", label: "Acrux", fill: "white", position: { cx: 200, cy: 250 }, },
      { id: "Imai", label: "Imai", fill: "white", position: { cx: 300, cy: 125 }, },
      { id: "Ginan", label: "Ginan", fill: "lightblue", position: { cx: 240, cy: 250 }, },
    ]}
    edges={[
      { id: "GacruxAcrux", source: "Gacrux", target: "Acrux", length: 300 },
      { id: "MimosaImai", source: "Mimosa", target: "Imai", length: 200 },
    ]}
    />

...
```

## Configuration

See the project website: <https://andypea.github.io/react-simple-network-graph>

## Release

Releases of this package can be found on its NPM page: <https://www.npmjs.com/package/react-simple-network-graph>

## Developer docs

See `docs/developer_docs.md`.

import { UpdateVertexStates, VertexState } from "../DynamicNetworkGraph";
import { VertexSpecification, VertexPosition } from "../NetworkGraph";

interface force {
  x: number;
  y: number;
}

/**
 * Update the vertex positions.
 *
 * Uses Verlet integration, which will gradually optimise the edge lengths
 * until they approach the lengths requested in their specification.
 * Also includes a term which will push vertices apart.
 *
 * @param oldVerticesPositions The pre-update vertex postions.
 * @param width The max x-value of each vertex.
 * @param height The max y-value of each vertex.
 * @param edges Edge specification for the graph. Each edge to optimise should have a `length` property.
 * @param vertices Vertex specification for the graph. Any vertex positions included will be ignored.
 * @param [friction] The amount of friction applied to each vertex.
 * @param [timeStep] How far to step forward in each timeStep.
 * @param [springConstant] How springy each edge is.
 * @param [interbodyForceStrength] The strength of the inter-body force. Negative numbers will cause vertices to be pushed apart.
 */

export const defaultUpdateVertexStates: UpdateVertexStates = (
  oldVertexStates,
  width,
  height,
  edges,
  vertices,
  friction = 10,
  timeStep = 0.003,
  springConstant = 10,
  interbodyForceStrength = -1000
) => {
  // Drop all unused vertices from the vertex positions Map and add new vertices.
  const newVertexStates = reconcileVertexStates(
    vertices,
    oldVertexStates,
    width,
    height
  );

  const forces: Map<string, force> = new Map(
    vertices.map((vertex) => [vertex.id, { x: 0, y: 0 }])
  );

  // Add a force representing friction to each vertex.
  for (const vertex of vertices) {
    const vertexPosition = newVertexStates.get(vertex.id);
    const force = forces.get(vertex.id) ?? { x: 0, y: 0 };

    forces.set(vertex.id, {
      x: force.x - friction * vertexPosition.vx,
      y: force.y - friction * vertexPosition.vy,
    });
  }

  // Add a force to each pair of vertices joined by an edge that optimises the edge length.
  for (const e of edges) {
    if (
      !newVertexStates.has(e.sourceId) ||
      !newVertexStates.has(e.targetId) ||
      !e.length
    ) {
      continue;
    }

    const source = newVertexStates.get(e.sourceId);
    const target = newVertexStates.get(e.targetId);

    const distance = Math.sqrt(
      Math.pow(target.cx - source.cx, 2) + Math.pow(target.cy - source.cy, 2)
    );

    const forceScalar = springConstant * (distance - e.length);

    const forceSourceToTarget = {
      x: (forceScalar * (target.cx - source.cx)) / distance,
      y: (forceScalar * (target.cy - source.cy)) / distance,
    };

    const forceSource = forces.get(e.sourceId) ?? { x: 0, y: 0 };
    forces.set(e.sourceId, {
      x: forceSource.x + forceSourceToTarget.x,
      y: forceSource.y + forceSourceToTarget.y,
    });

    const forceTarget = forces.get(e.targetId) ?? { x: 0, y: 0 };
    forces.set(e.targetId, {
      x: forceTarget.x - forceSourceToTarget.x,
      y: forceTarget.y - forceSourceToTarget.y,
    });
  }

  for (let i = 0; i < vertices.length; i++) {
    const vertexIId = vertices[i].id;
    for (let j = i + 1; j < vertices.length; j++) {
      const vertexJId = vertices[j].id;

      const vertexIPosition = newVertexStates.get(vertexIId);
      const vertexJPosition = newVertexStates.get(vertexJId);

      const offset = {
        x: vertexJPosition.cx - vertexIPosition.cx,
        y: vertexJPosition.cy - vertexIPosition.cy,
      };

      const oneOverdistanceCubed = Math.pow(
        Math.pow(offset.x, 2) + Math.pow(offset.y, 2),
        -3 / 2
      );

      const newForceOnI = {
        x: interbodyForceStrength * offset.x * oneOverdistanceCubed,
        y: interbodyForceStrength * offset.y * oneOverdistanceCubed,
      };

      const forceI = forces.get(vertexIId) ?? { x: 0, y: 0 };
      const forceJ = forces.get(vertexJId) ?? { x: 0, y: 0 };

      forces.set(vertexIId, {
        x: forceI.x + newForceOnI.x,
        y: forceI.y + newForceOnI.y,
      });

      forces.set(vertexJId, {
        x: forceJ.x - newForceOnI.x,
        y: forceJ.y - newForceOnI.y,
      });
    }
  }

  // Update the position and velocity of each vertex.
  for (const vertex of vertices) {
    const oldPosition = newVertexStates.get(vertex.id);
    newVertexStates.set(vertex.id, {
      cx: clamp(
        oldPosition.cx +
          (oldPosition.frozen ? 0 : 1) * timeStep * oldPosition.vx,
        0,
        width
      ),
      cy: clamp(
        oldPosition.cy +
          (oldPosition.frozen ? 0 : 1) * timeStep * oldPosition.vy,
        0,
        height
      ),
      vx: oldPosition.frozen
        ? 0
        : oldPosition.vx + timeStep * (forces.get(vertex.id)?.x ?? 0),
      vy: oldPosition.frozen
        ? 0
        : oldPosition.vy + timeStep * (forces.get(vertex.id)?.y ?? 0),
      frozen: oldPosition.frozen,
    });
  }

  return newVertexStates;
};

const reconcileVertexStates = (
  vertices: Array<VertexSpecification & { position?: VertexPosition }>,
  oldVerticesPositions: Map<string, VertexState>,
  width: number,
  height: number
) => {
  const newVerticesPositions = new Map();

  for (const vertex of vertices) {
    const defaultVertexPosition = {
      cx: Math.random() * width,
      cy: Math.random() * height,
      vx: 0,
      vy: 0,
      frozen: false,
    };
    const originalVertexPosition =
      vertex.position?.cx !== undefined && vertex.position?.cy !== undefined
        ? { cx: vertex.position.cx, cy: vertex.position.cy }
        : {};
    const oldVertexPosition = oldVerticesPositions.get(vertex.id) ?? {};
    newVerticesPositions.set(vertex.id, {
      ...defaultVertexPosition,
      ...originalVertexPosition,
      ...oldVertexPosition,
    });
  }

  return newVerticesPositions;
};

const clamp = (x: number, min: number, max: number) =>
  Math.min(Math.max(x, min), max);

/**
 * Update the vertex positions.
 *
 * Uses Verlet integration, which will gradually optimise the edge lengths
 * until they approach the lengths requested in their specification.
 * Also includes a term which will push vertices apart.
 *
 * @param {Object[]} oldVerticesPositions The pre-update vertex postions.
 * @param {number} width The max x-value of each vertex.
 * @param {number} height The max y-value of each vertex.
 * @param {Object[]} edges Edge specification for the graph. Each edge to optimise should have a `length` property.
 * @param {Object[]} vertices Vertex specification for the graph. Any vertex positions included will be ignored.
 * @param {number} [friction] The amount of friction applied to each vertex.
 * @param {number} [timeStep] How far to step forward in each timeStep.
 * @param {number} [springConstant] How springy each edge is.
 * @param {number} [interbodyForceStrength] The strength of the inter-body force. Negative numbers will cause vertices to be pushed apart.
 */
export const updateVerticesPositions = (
  oldVerticesPositions,
  width,
  height,
  edges,
  vertices,
  friction = 10,
  timeStep = 0.003,
  springConstant = 10,
  interbodyForceStrength = -1000 // interbodyForceStrength = -100000
) => {
  // Drop all unused vertices from the vertex positions Map and add new vertices.
  const newVerticesPositions = reconcileVertexPositions(
    vertices,
    oldVerticesPositions,
    width,
    height
  );

  const forces = new Map(vertices.map((vertex) => [vertex.id, { x: 0, y: 0 }]));

  // Add a force representing friction to each vertex.
  for (const vertex of vertices) {
    const vertexPosition = newVerticesPositions.get(vertex.id);
    const force = forces.get(vertex.id);

    forces.set(vertex.id, {
      x: force.x - friction * vertexPosition.vx,
      y: force.y - friction * vertexPosition.vy,
    });
  }

  // Add a force to each pair of vertices joined by an edge that optimises the edge length.
  for (const e of edges) {
    if (
      !newVerticesPositions.has(e.source) ||
      !newVerticesPositions.has(e.target) ||
      e.length === undefined
    ) {
      continue;
    }

    const source = newVerticesPositions.get(e.source);
    const target = newVerticesPositions.get(e.target);

    const distance = Math.sqrt(
      Math.pow(target.cx - source.cx, 2) + Math.pow(target.cy - source.cy, 2)
    );

    const forceScalar = springConstant * (distance - e.length);

    const forceSourceToTarget = {
      x: (forceScalar * (target.cx - source.cx)) / distance,
      y: (forceScalar * (target.cy - source.cy)) / distance,
    };

    const forceSource = forces.get(e.source);
    forces.set(e.source, {
      x: forceSource.x + forceSourceToTarget.x,
      y: forceSource.y + forceSourceToTarget.y,
    });

    const forceTarget = forces.get(e.target);
    forces.set(e.target, {
      x: forceTarget.x - forceSourceToTarget.x,
      y: forceTarget.y - forceSourceToTarget.y,
    });
  }

  for (let i = 0; i < vertices.length; i++) {
    const vertexIId = vertices[i].id;
    for (let j = i + 1; j < vertices.length; j++) {
      const vertexJId = vertices[j].id;

      const vertexIPosition = newVerticesPositions.get(vertexIId);
      const vertexJPosition = newVerticesPositions.get(vertexJId);

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

      const forceI = forces.get(vertexIId);
      const forceJ = forces.get(vertexJId);

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
    const oldPosition = newVerticesPositions.get(vertex.id);
    newVerticesPositions.set(vertex.id, {
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
        : oldPosition.vx + timeStep * forces.get(vertex.id).x,
      vy: oldPosition.frozen
        ? 0
        : oldPosition.vy + timeStep * forces.get(vertex.id).y,
      frozen: oldPosition.frozen,
    });
  }

  return newVerticesPositions;
};

const reconcileVertexPositions = (
  vertices,
  oldVerticesPositions,
  width,
  height
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

const clamp = (x, min, max) => Math.min(Math.max(x, min), max);

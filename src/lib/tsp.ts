type Graph = number[][];
type Path = number[];

interface Options {
  startingPoint: number;
  returnToStart: boolean;
}

export default function twoOpt(graph: Graph, options: Options): Path {
  const { startingPoint, returnToStart } = options;
  const N = graph.length;
  const initialPath = Array.from({ length: N }, (_, i) => (i + startingPoint) % N);
  let bestPath = initialPath.slice();
  let bestCost = getCost(graph, bestPath, returnToStart);

  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 1; i < N - 1; i++) {
      for (let j = i + 1; j < N; j++) {
        const newPath = reversePath(bestPath, i, j);
        const newCost = getCost(graph, newPath, returnToStart);
        if (newCost < bestCost) {
          bestPath = newPath;
          bestCost = newCost;
          improved = true;
        }
      }
    }
  }

  return bestPath;
}

function getCost(graph: Graph, path: Path, returnToStart: boolean): number {
  let cost = 0;
  for (let i = 0; i < path.length - 1; i++) {
    cost += graph[path[i]][path[i + 1]];
  }
  if (returnToStart) {
    cost += graph[path[path.length - 1]][path[0]];
  }
  return cost;
}

function reversePath(path: Path, i: number, j: number): Path {
  const reversedPath = path.slice(0, i);
  for (let k = j; k >= i; k--) {
    reversedPath.push(path[k]);
  }
  reversedPath.push(...path.slice(j + 1));
  return reversedPath;
}
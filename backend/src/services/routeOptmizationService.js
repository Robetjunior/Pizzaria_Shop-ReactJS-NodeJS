// src/services/routeOptimizationService.js
import { fetchUsers } from "./userService.js";

// Função auxiliar para calcular a distância euclidiana entre dois pontos
function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Função para calcular a rota otimizada
export async function calculateOptimizedRoute() {
  const users = await fetchUsers(); // Buscar usuários/clientes do banco de dados
  const startPoint = { x: 0, y: 0 }; // Ponto de partida da empresa
  let currentPoint = startPoint;
  let route = [];
  let distances = [];
  let visited = new Set();

  while (visited.size < users.length) {
    let nearest = null;
    let nearestDistance = Infinity;

    users.forEach((user, index) => {
      if (!visited.has(index)) {
        const distance = calculateDistance(
          currentPoint.x,
          currentPoint.y,
          user.x_coordinate,
          user.y_coordinate
        );
        if (distance < nearestDistance) {
          nearest = user;
          nearestDistance = distance;
        }
      }
    });

    if (nearest) {
      visited.add(users.indexOf(nearest));
      route.push(nearest);
      distances.push(nearestDistance);
      currentPoint = { x: nearest.x_coordinate, y: nearest.y_coordinate };
    }
  }

  // Opcional: calcular a distância de retorno para o ponto de início para completar o ciclo
  distances.push(
    calculateDistance(
      currentPoint.x,
      currentPoint.y,
      startPoint.x,
      startPoint.y
    )
  );

  // Retorna a rota e a distância total (opcional)
  const totalDistance = distances.reduce((acc, val) => acc + val, 0);
  return { route, totalDistance };
}

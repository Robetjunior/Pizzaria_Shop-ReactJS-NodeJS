export function generateOrderItems(totalInCents) {
  // Exemplo: Gera 3 itens fictícios
  const itemsCount = 3;
  let remainingAmount = totalInCents;
  const items = [];

  for (let i = 0; i < itemsCount; i++) {
    const isLastItem = i === itemsCount - 1;
    const priceInCents = isLastItem
      ? remainingAmount
      : Math.floor(Math.random() * remainingAmount);

    items.push({
      id: `item-${i}`,
      priceInCents: priceInCents,
      quantity: 1, // Para simplificar, a quantidade é 1
      product: {
        name: `Produto ${i + 1}`,
      },
    });

    remainingAmount -= priceInCents;
  }

  return items;
}

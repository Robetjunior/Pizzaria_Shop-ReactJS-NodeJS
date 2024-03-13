export function formatPhoneNumberToInternational(phone) {
  // Remove caracteres não numéricos
  const numericPhone = phone.replace(/\D/g, "");

  // Assume que o número já está no formato correto se começar com '55'
  if (numericPhone.startsWith("55")) {
    return `+${numericPhone}`;
  }

  // Adiciona o prefixo internacional para números brasileiros ('55') e retorna formatado
  return `+55${numericPhone}`;
}

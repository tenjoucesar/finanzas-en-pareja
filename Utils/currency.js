export const commaFormatCurrency = (input) => {
  if (!input) return '';

  return `₡${input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export const getInputValueWithoutCurrency = (value) => Number(
  value.replace('₡', '')
    .replaceAll(',', '')
);

export const getTotalAmountCurrency = (costs) => {
  let total = 0;
  costs.map((cost) => total = total + cost.amount);

  return commaFormatCurrency(total);
};

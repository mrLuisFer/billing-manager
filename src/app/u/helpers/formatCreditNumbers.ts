export default function formatCreditNumber(number: string): string {
  const justNumbers = number.replace(/\D/g, '');
  if (!justNumbers) return number;
  const hiddenDigits = '*'.repeat(justNumbers.length - 4);
  if (justNumbers != null) {
    const groupNumbers = justNumbers.match(/.{1,4}/g)?.join(' ')!;
    const formattedNumber = hiddenDigits + groupNumbers.slice(-5);
    return formattedNumber;
  }
  return number;
}

export const formatCreditNumberWithSpaces = (number: string): string => {
  const justNumbers = number.replace(/\D/g, '');
  const groupNumbers = justNumbers.match(/.{1,4}/g)?.join(' ')!;
  return groupNumbers;
};

import { useEffect, useState } from 'react';

export default function useGetTypeCreditCard(number: string) {
  const [cardType, setCardType] = useState<string>('');

  const firstNumber = number.charAt(0);
  useEffect(() => {
    setCardType(() => {
      switch (firstNumber) {
        case '4':
          return 'Visa';
        case '5':
          return 'MasterCard';
        case '3':
          return 'American Express';
        default:
          return 'Desconocida';
      }
    });
  }, [firstNumber]);

  return cardType;
}

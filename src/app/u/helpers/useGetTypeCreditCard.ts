import { useEffect, useState } from 'react';

interface ICardType {
  name: string;
  color: string;
}

const cardTypes: {
  [key: string]: ICardType;
} = {
  visa: {
    name: 'Visa',
    color: '#003399',
  },
  mastercard: {
    name: 'MasterCard',
    color: '#FFD700',
  },
  americanExpress: {
    name: 'American Express',
    color: '#002663',
  },
  discover: {
    name: 'Discover',
    color: '#8A2BE2',
  },
  dinersClub: {
    name: 'Diners Club',
    color: '#FF0000',
  },
  unknown: {
    name: 'Desconocida',
    color: '#808080',
  },
};

export default function useGetTypeCreditCard(number: string): ICardType {
  const [cardType, setCardType] = useState<ICardType>({
    name: 'Desconocida',
    color: 'gray',
  });

  const firstNumber = number.charAt(0);
  useEffect(() => {
    setCardType(() => {
      switch (firstNumber) {
        case '4':
          return cardTypes.visa;
        case '5':
          return cardTypes.mastercard;
        case '3':
          return cardTypes.americanExpress;
        default:
          if (/^4\d{15}$/.test(number)) {
            return cardTypes.visa;
          }
          // Mastercard
          if (/^5[1-5]\d{14}$/.test(number)) {
            return cardTypes.mastercard;
          }
          // American Express
          if (/^3[47]\d{13}$/.test(number)) {
            return cardTypes.americanExpress;
          }
          // Discover
          if (/^6(?:011|5\d{2})\d{12}$/.test(number)) {
            return cardTypes.discover;
          }
          // Diners Club
          if (/^3(?:0[0-5]|[68]\d)\d{11}$/.test(number)) {
            return cardTypes.dinersClub;
          }
          // Add more card types as needed
          return cardTypes.unknown;
      }
    });
  }, [firstNumber, number]);

  return cardType;
}

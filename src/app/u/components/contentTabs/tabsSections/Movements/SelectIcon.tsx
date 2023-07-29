import { TbArrowsExchange2 } from 'react-icons/tb';
import { MdAttachMoney } from 'react-icons/md';
import { AiOutlineStock } from 'react-icons/ai';
import { FaQuestion } from 'react-icons/fa6';

export default function SelectIcon({ iconName }: { iconName: string }) {
  switch (iconName) {
    case 'MdAttachMoney':
      return <MdAttachMoney />;
    case 'TbArrowsExchange2':
      return <TbArrowsExchange2 />;
    case 'AiOutlineStock':
      return <AiOutlineStock />;
    default:
      return <FaQuestion size="1rem" />;
  }
}

import { TbArrowsExchange2 } from 'react-icons/tb';
import { MdAttachMoney } from 'react-icons/md';
import { AiOutlineStock } from 'react-icons/ai';
import { FaQuestion, FaShirt } from 'react-icons/fa6';
import { BsSpotify, BsPaypal } from 'react-icons/bs';
import { CgGym } from 'react-icons/cg';
import { BiSolidBank } from 'react-icons/bi';
import { SlGameController } from 'react-icons/sl';
import { FaCloud, FaAmazon } from 'react-icons/fa';
import { IoFastFoodOutline } from 'react-icons/io5';
import { SiUber } from 'react-icons/si';
import { RiNetflixFill } from 'react-icons/ri';
import { PiFilmSlateBold } from 'react-icons/pi';

const icons = {
  MdAttachMoney: <MdAttachMoney />,
  TbArrowsExchange2: <TbArrowsExchange2 />,
  AiOutlineStock: <AiOutlineStock />,
  BsSpotify: <BsSpotify />,
  CgGym: <CgGym />,
  BiSolidBank: <BiSolidBank />,
  SlGameController: <SlGameController />,
  FaCloud: <FaCloud />,
  FaAmazon: <FaAmazon />,
  IoFastFoodOutline: <IoFastFoodOutline />,
  SiUber: <SiUber />,
  BsPaypal: <BsPaypal />,
  RiNetflixFill: <RiNetflixFill />,
  FaShirt: <FaShirt />,
  PiFilmSlateBold: <PiFilmSlateBold />,
};

export default function SelectIcon({ iconName }: { iconName: string }) {
  return icons[iconName as never] || <FaQuestion size="1rem" />;
}

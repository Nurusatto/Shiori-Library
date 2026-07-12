import Image from "next/image";
import { UserObject } from "../model/type";

export const Avatar = ({ avatar }: UserObject) => {
  return (
    <>
      <Image src={avatar} alt="Avatar" width={40} height={40} />
    </>
  );
};

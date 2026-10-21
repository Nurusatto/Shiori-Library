import { Developer } from "./developer";
import { ShioriFlower } from "./shiori-flower";

type prop = {
  type?: "developer" | "shioriFlower";
};

export const Footer = ({ type = "developer" }: prop) => {
  return (
    <>
      {type === "developer" && <Developer />}
      {type === "shioriFlower" && <ShioriFlower />}
    </>
  );
};

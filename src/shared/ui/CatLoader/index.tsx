import Image from "next/image";
import cat from "@/shared/image/loader/catLoader.png";

import styles from "./style.module.scss";

export const CatLoader = () => {
  return (
    <div className={styles.container}>
      <Image src={cat} alt="loader" className={styles.cat} />
    </div>
  );
};

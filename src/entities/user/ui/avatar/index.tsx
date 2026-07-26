import Image from "next/image";
import styles from "./style.module.scss";
import type { AvatarProps } from "@/entities/user/model/type";
import clsx from "clsx";

export const Avatar = ({
  avatar,
  alt = "Avatar",
  size = "md",
  shape = "circle",
  className,
}: AvatarProps) => {
  return (
    <div
      className={clsx(styles.avatar, styles[size], styles[shape], className)}
    >
      {avatar ? (
        <Image
          src={avatar}
          alt={alt}
          fill
          sizes="100vw"
          className={styles.image}
        />
      ) : (
        <span className={styles.text}>U</span>
      )}
    </div>
  );
};

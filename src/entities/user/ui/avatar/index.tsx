import Image from "next/image";
import styles from "./style.module.scss";
import type { AvatarProps } from "@/entities/user/model/type";
import clsx from "clsx";
import { avatarPixels } from "../../model/const";

export const Avatar = ({
  avatar,
  alt = "Avatar",
  size = "md",
  shape = "circle",
  className,
  priority = false,
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
          priority={priority}
          sizes={avatarPixels[size] + "px"}
          className={styles.image}
        />
      ) : (
        <span className={styles.text}>U</span>
      )}
    </div>
  );
};

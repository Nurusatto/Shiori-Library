import Image from "next/image";
import styles from "./style.module.scss";
import type { AvatarProps } from "@/entities/user/model/type";

export const Avatar = ({ avatar, shape }: AvatarProps) => {
  if (shape === "circle") {
    return (
      <div className={styles.avatarContainer}>
        {avatar ? (
          <Image src={avatar} alt="Avatar" width={40} height={40} />
        ) : (
          <span className={styles.avatarText}>U</span>
        )}
      </div>
    );
  }
  return null;
};

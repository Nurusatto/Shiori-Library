"use client";

import { Avatar } from "@/entities/user/ui/avatar";
import styles from "@/features/auth/ui/avatarDropMenu/style.module.scss";
import { useState } from "react";
import { useUserStore } from "@/app/_store/useUserStore";
import { useRouter } from "next/navigation";

export const AvatarDropMenu = () => {
  const router = useRouter();
  const { profile, status } = useUserStore();
  const currentAvatar = profile?.avatar ?? null;
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    setActive(!active);
  };
  return (
    <button
      className={styles.AvatarButton}
      onClick={handleClick}
      disabled={status === "loading"}
    >
      <Avatar avatar={currentAvatar} shape="circle" />
      <div className={`${styles.AvatarMenu} ${active ? styles.isActive : ""}`}>
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </div>
    </button>
  );
};

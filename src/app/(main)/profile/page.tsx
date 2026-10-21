import { ProfileContent } from "@/widgets/profile-content/ui";
import { ProfileSideBar } from "@/widgets/profile-sidebar";

import styles from "./style.module.scss";

export default function Profile() {
  return (
    <main className={`container ${styles.page}`}>
      <div className={styles.header}>
        <ProfileSideBar />
        <ProfileContent />
      </div>
    </main>
  );
}

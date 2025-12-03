import styles from "./style.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={`container ${styles.FooterInner}`}>
        <p className={styles.FooterTitle}>
          Your assistant Shori is always here to help you find the right book!
        </p>
        <p className={styles.FooterCopyright}>© 2025 Shiori library.</p>
        <h2 className={styles.FooterDev}>Made with ❤️ by NurusattoDesu</h2>
      </div>
    </footer>
  );
};

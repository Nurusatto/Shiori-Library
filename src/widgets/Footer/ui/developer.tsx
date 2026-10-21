import styles from "./style.module.scss";

export const Developer = () => {
  return (
    <footer className={styles.footerDev}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.title}>
          Your assistant Shori is always here to help you find the right book!
        </p>
        <p className={styles.copyright}>© 2025 Shiori library.</p>
        <h2 className={styles.developer}>Made with ❤️ by NurusattoDesu</h2>
      </div>
    </footer>
  );
};

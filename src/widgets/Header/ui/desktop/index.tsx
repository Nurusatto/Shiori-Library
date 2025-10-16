import styles from "./styles.module.scss";

export const HeaderDesktop = () => {
  return (
    <header>
      <div className={`container ${styles.HeaderInner}`}>
        <h1>header</h1>
      </div>
    </header>
  );
};

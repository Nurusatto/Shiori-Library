import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          padding: "32px",
          borderRadius: "24px",
          border: "var(--border-1)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <Image
            src="/utils/notFound.png"
            width={180}
            height={140}
            alt="Иллюстрация: робот и надпись Страница не найдена"
            style={{ margin: "0 auto", objectFit: "contain" }}
            priority
          />
        </div>

        <h1
          style={{
            fontSize: "28px",
            fontWeight: "800",
            marginBottom: "8px",
            color: "var(--color-text-primary)",
          }}
        >
          Страница не найдена
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            marginBottom: "24px",
            lineHeight: "1.5",
          }}
        >
          Запрашиваемый ресурс не существует или был перемещен.
        </p>

        <Link
          href="/"
          style={{
            display: "block",
            width: "100%",
            padding: "12px 20px",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text-primary)",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

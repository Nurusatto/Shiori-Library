export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="container"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </>
  );
}

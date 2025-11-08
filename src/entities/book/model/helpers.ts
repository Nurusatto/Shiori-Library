export const getDescription = (
  desc?: string | { type?: string; value: string }
) => (typeof desc === "string" ? desc : desc?.value ?? "");

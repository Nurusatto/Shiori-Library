export type UserObject = {
  avatar: string;
};

/**
 * xs — 24px
 * sm — 32px
 * md — 40px
 * lg — 64px
 * xl — 96px
 */
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  size?: AvatarSize;
  avatar: string | null;
  shape?: "circle" | "square";
  alt?: string;
  className?: string;
}

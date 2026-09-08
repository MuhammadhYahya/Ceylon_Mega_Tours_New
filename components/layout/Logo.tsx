import Image from "next/image";
import logoSrc from "@/public/logo.png";

/**
 * The Ceylon Mega Tours badge. Statically imported so Next derives the
 * intrinsic dimensions at build time and no layout shift is possible.
 *
 * The mark already contains the words "Ceylon Mega Tours", but at 36px that
 * text is illegible, so the wordmark beside it carries the accessible name and
 * this image is decorative.
 */
export default function Logo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logoSrc}
      alt=""
      aria-hidden="true"
      priority={priority}
      className={className}
    />
  );
}

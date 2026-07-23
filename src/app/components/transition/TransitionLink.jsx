'use client';
import { useRouter } from 'next/navigation';
import { useTransitionStore } from '@/app/store/useTransitionStore';
import Link from 'next/link';

export default function TransitionLink({
  href,
  label,
  children,
  className,
  ariaLabel,
}) {
  const router = useRouter();
  const startTransition = useTransitionStore((state) => state.startTransition);
  const isActive = useTransitionStore((state) => state.isActive);

  const handleClick = (e) => {
    // If we're already transitioning or already on the exact same page, don't trigger again
    if (isActive) {
      e.preventDefault();
      return;
    }

    // Only when we actually want a transition
    e.preventDefault();
    startTransition(label);

    // Wait for the dot to cover the screen
    setTimeout(() => {
      router.push(href);
    }, 1000);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

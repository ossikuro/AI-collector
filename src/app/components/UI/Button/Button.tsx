import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonStyle = 'naked' | 'framed' | 'CTA';
export type ButtonSize = 'L' | 'S';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: ButtonStyle;
  size?: ButtonSize;
  icon?: ReactNode;
  tooltip?: string;
}

export function Button({
  buttonStyle = 'framed',
  size = 'L',
  icon,
  tooltip,
  children,
  className,
  type = 'button',
  ...buttonProps
}: ButtonProps) {
  const hasIcon = Boolean(icon);
  const hasText = Boolean(children);
  const isIconOnly = hasIcon && !hasText;

  const classNames = [
    styles.button,
    styles[buttonStyle],
    styles[size],
    isIconOnly ? styles.iconOnly : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      data-tooltip={isIconOnly ? tooltip || buttonProps['aria-label'] : undefined}
      type={type}
      {...buttonProps}
    >
      {hasIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {hasText ? <span className={styles.label}>{children}</span> : null}
    </button>
  );
}

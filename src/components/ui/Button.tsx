import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
};

export function Button({ href, children, variant = 'primary', className }: ButtonProps) {
  const buttonClass = classNames('btn', {
    'btn--primary': variant === 'primary',
    'btn--outline': variant === 'outline',
  }, className);

  return (
    <a href={href} className={buttonClass}>
      {children}
    </a>
  );
}
import { clsx } from '@/lib/clsx';

export default function Eyebrow({
  children,
  as: Tag = 'p',
  className,
}: {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div';
  className?: string;
}) {
  return <Tag className={clsx('eyebrow', className)}>{children}</Tag>;
}

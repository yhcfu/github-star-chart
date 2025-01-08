import { cn } from '@/lib/utils';
import { LoaderCircle, type LucideProps } from 'lucide-react';

export interface IProps extends LucideProps {
  className?: string;
}

export const Spinner = ({ className, ...props }: IProps) => {
  return <LoaderCircle className={cn('animate-spin', className)} {...props} />;
};

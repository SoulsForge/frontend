import * as React from "react";

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input, InputProps } from './input';

import { cn } from '@/lib/utils';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
          ref={ref}
          {...props}
        />
        <button
          type='button'
          className='absolute top-2.5 right-2 text-primary/90 hover:text-primary'
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOffIcon className='h-5 w-5' />
          ) : (
            <EyeIcon className='h-5 w-5' />
          )}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

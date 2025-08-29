'use client';

import React, { useState } from 'react';
import {
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useDelayGroup,
  FloatingPortal,
  offset,
  flip,
  shift,
  arrow,
} from '@floating-ui/react';

interface FloatingTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FloatingTooltip({ 
  children, 
  content, 
  delay = 500,
  className = '' 
}: FloatingTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = React.useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(8),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, { delay });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });
  useDelayGroup(context, { id: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={`bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg z-50 max-w-xs ${className}`}
          >
            {content}
            <div
              ref={arrowRef}
              className="absolute w-2 h-2 bg-gray-900 transform rotate-45"
              style={{
                left: '50%',
                top: '-4px',
                marginLeft: '-4px',
              }}
            />
          </div>
        )}
      </FloatingPortal>
    </>
  );
}

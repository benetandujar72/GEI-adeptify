'use client';

import React, { useState, useRef } from 'react';
import {
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  useListNavigation,
  FloatingPortal,
  offset,
  flip,
  shift,
} from '@floating-ui/react';

interface FloatingDropdownProps {
  trigger: React.ReactNode;
  items: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }>;
  className?: string;
}

export function FloatingDropdown({ trigger, items, className = '' }: FloatingDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const listNavigation = useListNavigation(context, {
    listRef: useRef([]),
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {trigger}
      </div>
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={`bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[200px] z-50 ${className}`}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                {...getItemProps()}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer flex items-center space-x-2 transition-colors ${
                  activeIndex === index
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}

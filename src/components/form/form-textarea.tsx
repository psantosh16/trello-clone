"use client";

import { forwardRef, KeyboardEventHandler, useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

interface FormTextAreaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onClick,
      onKeyDown,
      defaultValue,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Textarea
            id={id}
            name={id}
            ref={ref}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            required={required}
            placeholder={placeholder}
            disabled={pending || disabled}
            className={cn(
              "resize-none focus-visible::ring-0 focus-visible::ring-offset-0 focus::ring-0 ring-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={errors ? `${id}-error` : undefined}
            defaultValue={defaultValue}
          />
        </div>
        {errors && errors[id] && (
          <div
            id={`${id}-error`}
            className="text-xs font-semibold text-red-500"
          >
            {errors[id]?.join(", ")}
          </div>
        )}
      </div>
    );
  }
);

FormTextArea.displayName = "FormTextArea";

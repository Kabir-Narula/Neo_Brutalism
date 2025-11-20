"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLayout } from "@/context/LayoutContext";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  multiline?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function EditableText({
  value,
  onSave,
  className,
  multiline = false,
  as: Component = "span",
}: EditableTextProps) {
  const { isEditMode } = useLayout();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onSave(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      handleBlur();
    }
    if (e.key === "Escape") {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (isEditMode) {
    if (isEditing) {
      return multiline ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full bg-neo-black text-neo-lime border-2 border-neo-lime p-2 font-mono text-sm outline-none shadow-neo",
            className
          )}
          rows={4}
        />
      ) : (
        <div className={cn("relative group inline-block", multiline ? "w-full" : "w-auto")}>
            <Component
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsEditing(true);
            }}
            className={cn(
                "cursor-text border-2 border-dashed border-neo-blue/50 hover:border-neo-blue hover:bg-neo-blue/5 p-1 rounded transition-all relative",
                className
            )}
            >
            {value}
            </Component>
            <div className="absolute -top-3 -right-3 bg-neo-blue text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <Pencil size={12} />
            </div>
        </div>
      );
    }

    return (
      <div className={cn("relative group inline-block", multiline ? "w-full" : "w-auto")}>
        <Component
            onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setIsEditing(true);
            }}
            className={cn(
            "cursor-text border-2 border-dashed border-transparent hover:border-neo-blue hover:bg-neo-blue/5 p-1 rounded transition-all",
            className
            )}
        >
            {value}
        </Component>
        <div className="absolute -top-3 -right-3 bg-neo-blue text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            <Pencil size={12} />
        </div>
      </div>
    );
  }

  return <Component className={className}>{value}</Component>;
}

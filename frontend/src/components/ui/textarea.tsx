import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className="w-full p-2 border border-gray-300 rounded-md"
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
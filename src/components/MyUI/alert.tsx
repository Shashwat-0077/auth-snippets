import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const AlertVariants = cva("p-3 rounded-md flex items-center gap-x-2", {
    variants: {
        variant: {
            error: "bg-destructive/15  text-destructive",
            success: "bg-emerald-500/15 text-emerald-500",
        },
    },
    defaultVariants: {
        variant: "error",
    },
});

export interface DivProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof AlertVariants> {
    asChild?: boolean;
    message?: string;
}

const Alert = React.forwardRef<HTMLDivElement, DivProps>(
    ({ className, variant, message, asChild = false, ...props }, ref) => {
        return message ? (
            <div className={cn(AlertVariants({ variant, className }))}>
                <CheckCircledIcon className="h-4 w-4" />
                <p>{message}</p>
            </div>
        ) : (
            <></>
        );
    }
);
Alert.displayName = "Alert";

export { Alert, AlertVariants };

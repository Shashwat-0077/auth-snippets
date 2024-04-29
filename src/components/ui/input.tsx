import * as React from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, disabled, type, ...props }, ref) => {
        const [show, setShow] = React.useState<"show" | "hide">("hide");

        return type === "password" ? (
            <div
                className={cn(
                    "flex items-center w-full h-10 rounded-md border border-input px-3 py-1 transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-ring",
                    disabled ? "cursor-not-allowed opacity-50" : "",
                    className
                )}
            >
                <input
                    {...props}
                    ref={ref}
                    // here the disabled is undefined is the component does'nt receive the disabled prop so that why we need to pass the true and false value by checking if disabled is true or not
                    disabled={disabled ? true : false}
                    type={
                        !disabled
                            ? show === "hide"
                                ? "password"
                                : "text"
                            : "password"
                    }
                    className={cn(
                        "w-full bg-transparent transition-colors focus-visible:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                />
                <button
                    type="button"
                    className={cn(
                        "size-[20px] grid place-content-center ml-3 rounded-full outline-none focus-visible:bg-slate-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                    onClick={() => {
                        show === "hide" ? setShow("show") : setShow("hide");
                    }}
                    disabled={disabled ? true : false}
                >
                    {!disabled ? (
                        show === "hide" ? (
                            <EyeClosedIcon />
                        ) : (
                            <EyeOpenIcon />
                        )
                    ) : (
                        <EyeClosedIcon></EyeClosedIcon>
                    )}
                </button>
            </div>
        ) : (
            <input
                {...props}
                ref={ref}
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1  shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };

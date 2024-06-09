import { cn } from "@/lib/utils";
import { HTMLAttributes, PropsWithChildren } from "react";

export default function Container({
    className,
    children,
    variant = "md",
}: PropsWithChildren<{
    variant?: "xs" | "sm" | "md" | "lg" | "xl";
}> &
    HTMLAttributes<HTMLDivElement>) {
    const maxW = {
        xs: "max-w-[480px]",
        sm: "max-w-[512px]",
        md: "max-w-[768px]",
        lg: "max-w-[1024px]",
        xl: "max-w-[1280px]",
    };

    return (
        <div className={cn("mx-auto px-4", className, maxW[variant])}>
            {children}
        </div>
    );
}

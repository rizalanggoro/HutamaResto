import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function Navbar({
    variant = "lg",
}: PropsWithChildren<{
    variant?: "xs" | "sm" | "md" | "lg" | "xl";
}>) {
    const maxW = {
        xs: "max-w-[480px]",
        sm: "max-w-[512px]",
        md: "max-w-[768px]",
        lg: "max-w-[1024px]",
        xl: "max-w-[1280px]",
    };

    return (
        <>
            <header className="bg-background/70 border-b backdrop-blur fixed w-full top-0 h-16">
                <nav
                    className={cn(
                        "h-16 items-center flex mx-auto px-4",
                        maxW[variant]
                    )}
                >
                    <p className="font-semibold">HutamaResto</p>
                </nav>
            </header>
        </>
    );
}

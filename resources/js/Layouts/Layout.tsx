import NavbarComponent from "@/Components/Navbar";
import {cn} from "@/lib/utils";

type Props = {
    children: React.ReactNode;
    variant?: "sm" | "md" | "lg" | "xl";
};

export default function Layout({children, variant = "lg"}: Props) {
    return (
        <>
            <NavbarComponent/>

            <main
                className={cn(
                    "pt-16 mx-auto px-4",
                    variant === "sm" && "max-w-lg",
                    variant === "md" && "max-w-3xl",
                    variant === "lg" && "max-w-5xl",
                    variant === "xl" && "max-w-7xl"
                )}
            >
                {children}
            </main>
        </>
    );
}

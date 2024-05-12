import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

export default function LandingPage() {
    return (
        <>
            <p>Ini adalah landing page</p>

            <Button asChild variant={"link"}>
                <Link href={route("login")}>Login customer</Link>
            </Button>
            <Button asChild variant={"link"}>
                <Link href={route("admin.login")}>Login admin</Link>
            </Button>
            <Button asChild variant={"link"}>
                <Link href={route("superadmin.login")}>Login super admin</Link>
            </Button>

            <br />

            <Button asChild variant={"link"}>
                <Link href={route("dashboard")}>Dashboard customer</Link>
            </Button>
            <Button asChild variant={"link"}>
                <Link href={route("admin.dashboard")}>Dashboard admin</Link>
            </Button>
            <Button asChild variant={"link"}>
                <Link href={route("superadmin.dashboard")}>
                    Dashboard super admin
                </Link>
            </Button>
        </>
    );
}

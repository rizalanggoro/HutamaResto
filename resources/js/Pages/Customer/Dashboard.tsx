import { Button } from "@/Components/ui/button";
import Layout from "@/Layouts/Layout";
import { Link } from "@inertiajs/react";

export default function Dashboard({ user }: { user: any }) {
    return (
        <>
            <Layout>
                <p>Dashboard untuk customer</p>
                <p>{JSON.stringify(user)}</p>

                <Button asChild>
                    <Link href={route("logout")} method="post">
                        Logout
                    </Link>
                </Button>
            </Layout>
        </>
    );
}

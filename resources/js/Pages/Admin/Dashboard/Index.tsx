import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { Link } from "@inertiajs/react";
import { LogOut } from "lucide-react";

type Props = {
    user: any;
    franchise: any;
};

export default function Page(props: Props) {
    return (
        <>
            <DashboardAdminLayout>
                <div className="py-8">
                    <BreadcrumbComponent
                        items={[
                            {
                                title: "Halaman utama",
                            },
                        ]}
                    />

                    <p className="text-2xl font-semibold mt-4">
                        Halo, {props.user.name}
                    </p>
                    <p>
                        Berikut ringkasan untuk franchise yang Anda kelola:{" "}
                        <span className="font-semibold">
                            {props.franchise.name}
                        </span>
                    </p>

                    <Button asChild variant={"destructive"} className="mt-8">
                        <Link href={route("logout")} method="post">
                            <LogOut className="w-4 h-4 mr-2" />
                            Keluar
                        </Link>
                    </Button>
                </div>
            </DashboardAdminLayout>
        </>
    );
}

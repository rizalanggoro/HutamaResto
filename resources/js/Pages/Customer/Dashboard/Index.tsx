import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { Link } from "@inertiajs/react";
import { LogOut } from "lucide-react";

type Props = {
    user: any;
};

export default function Page(props: Props) {
    return (
        <>
            <DashboardCustomerLayout>
                <div className="py-8">
                    <BreadcrumbComponent items={[{ title: "Halaman utama" }]} />
                    <p className="font-semibold text-2xl mt-4">
                        Halo, {props.user.name}!
                    </p>
                    <p>Berikut ringkasan untuk Anda</p>

                    <Button asChild variant={"destructive"} className="mt-8">
                        <Link href={route("logout")} method="post">
                            <LogOut className="mr-2 w-4 h-4" />
                            Keluar
                        </Link>
                    </Button>
                </div>
            </DashboardCustomerLayout>
        </>
    );
}

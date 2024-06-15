import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { LogOut } from "lucide-react";

export default function Page(props: PageProps) {
  return (
    <>
      <Head>
        <title>Dashboard: Halaman utama</title>
      </Head>

      <DashboardCustomerLayout user={props.auth.user}>
        <div className="py-8">
          <BreadcrumbComponent items={[{ title: "Halaman utama" }]} />
          <p className="font-semibold text-2xl mt-4">
            Halo, {props.auth.user.name}!
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

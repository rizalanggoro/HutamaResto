import BreadcrumbComponent from "@/Components/Breadcrumb";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Page(props: PageProps) {
  return (
    <>
      <Head title="Halaman Utama" />
      <DashboardCustomerLayout>
        <div>
          <BreadcrumbComponent items={[{ title: "Halaman utama" }]} />
          <p className="font-semibold text-2xl mt-4">
            Halo, {props.auth.user.name}!
          </p>
          <p>Berikut ringkasan untuk Anda</p>
        </div>
      </DashboardCustomerLayout>
    </>
  );
}

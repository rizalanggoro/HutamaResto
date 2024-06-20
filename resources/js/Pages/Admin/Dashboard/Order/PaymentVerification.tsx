import BreadcrumbComponent from "@/Components/Breadcrumb";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";

export default function Page() {
  return (
    <>
      <DashboardAdminLayout>
        <div className="py-8 pr-2">
          <BreadcrumbComponent
            items={[{ title: "Halaman utama", href: route("admin.dashboard") }]}
          />
          <p className="text-2xl font-semibold">Verifikasi Pembayaran</p>
          <p>ini halaman verifikasi pembauaran untuk adin</p>
        </div>
      </DashboardAdminLayout>
    </>
  );
}

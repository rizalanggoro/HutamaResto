import BreadcrumbComponent from "@/Components/Breadcrumb";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";

export default function Page() {
  return (
    <>
      <DashboardAdminLayout>
        <div className="py-8 pr-2">
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Verifikasi pembayaran" },
            ]}
          />
          <p className="text-2xl font-semibold mt-4">Verifikasi Pembayaran</p>
        </div>
      </DashboardAdminLayout>
    </>
  );
}

import BreadcrumbComponent from "@/Components/Breadcrumb";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { Head } from "@inertiajs/react";

export default function Page() {
  return (
    <>
      <Head title="Daftar Ulasan" />
      <DashboardAdminLayout>
        <div>
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Daftar ulasan" },
            ]}
          />

          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold">Daftar Ulasan</p>
            <p className="text-muted-foreground">
              Pantau dan tindak lanjuti setiap ulasan dari pelanggan secara
              cepat untuk memastikan peningkatan kualitas pelayanan di restoran
              yang Anda kelola
            </p>
          </div>
        </div>
      </DashboardAdminLayout>
    </>
  );
}

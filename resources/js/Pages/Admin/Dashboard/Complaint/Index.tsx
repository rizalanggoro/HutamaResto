import BreadcrumbComponent from "@/Components/Breadcrumb";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";

export default function Page() {
  return (
    <>
      <DashboardAdminLayout>
        <div>
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Daftar aduan" },
            ]}
          />

          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold">Daftar Aduan</p>
            <p className="text-muted-foreground">
              Pantau dan tindak lanjuti setiap aduan pelanggan secara cepat
              untuk memastikan peningkatan kualitas pelayanan di restoran yang
              Anda kelola
            </p>
          </div>
        </div>
      </DashboardAdminLayout>
    </>
  );
}

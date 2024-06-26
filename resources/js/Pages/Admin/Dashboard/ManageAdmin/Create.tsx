import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { Head, useForm } from "@inertiajs/react";
import { Loader2, Plus } from "lucide-react";
import { FormEventHandler } from "react";

export default function Page() {
  const formCreateAdmin = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    formCreateAdmin.post(route("admin.dashboard.manageAdmin.create"));
  };

  return (
    <>
      <Head title="Tambah Admin" />
      <DashboardAdminLayout>
        <div>
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              {
                title: "Kelola Admin",
                href: route("admin.dashboard.manageAdmin"),
              },
              { title: "Tambah admin" },
            ]}
          />
          <div className="mt-4 space-y-2 max-w-lg">
            <p className="text-2xl font-semibold">Tambah Admin</p>
            <p className="text-muted-foreground">
              Tambahkan akun admin baru yang memiliki hak akses terhadap
              restoran Anda
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="max-w-lg mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Registrasi</CardTitle>
                <CardDescription>
                  Masukkan beberapa informasi berikut untuk menambahkan admin
                  baru
                </CardDescription>
              </CardHeader>

              <div className="space-y-2 px-6">
                {/* name */}
                <div className="space-y-1">
                  <Label>Nama lengkap</Label>
                  <Input
                    name="name"
                    value={formCreateAdmin.data.name}
                    onChange={(e) =>
                      formCreateAdmin.setData({
                        ...formCreateAdmin.data,
                        name: e.target.value,
                      })
                    }
                  />
                  {formCreateAdmin.errors.name && (
                    <p className="text-destructive text-sm">
                      {formCreateAdmin.errors.name}
                    </p>
                  )}
                </div>

                {/* email */}
                <div className="space-y-1">
                  <Label>Alamat email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formCreateAdmin.data.email}
                    onChange={(e) =>
                      formCreateAdmin.setData({
                        ...formCreateAdmin.data,
                        email: e.target.value,
                      })
                    }
                  />
                  {formCreateAdmin.errors.email && (
                    <p className="text-destructive text-sm">
                      {formCreateAdmin.errors.email}
                    </p>
                  )}
                </div>

                {/* password */}
                <div className="space-y-1">
                  <Label>Kata sandi</Label>
                  <Input
                    type="password"
                    name="password"
                    value={formCreateAdmin.data.password}
                    onChange={(e) =>
                      formCreateAdmin.setData({
                        ...formCreateAdmin.data,
                        password: e.target.value,
                      })
                    }
                  />
                  {formCreateAdmin.errors.password && (
                    <p className="text-destructive text-sm">
                      {formCreateAdmin.errors.password}
                    </p>
                  )}
                </div>

                {/* confirm password */}
                <div className="space-y-1">
                  <Label>Konfirmasi kata sandi</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formCreateAdmin.data.confirmPassword}
                    onChange={(e) =>
                      formCreateAdmin.setData({
                        ...formCreateAdmin.data,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  {formCreateAdmin.errors.confirmPassword && (
                    <p className="text-destructive text-sm">
                      {formCreateAdmin.errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <CardFooter className="justify-end flex mt-6">
                <Button type="submit" disabled={formCreateAdmin.processing}>
                  {formCreateAdmin.processing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Tambah
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </DashboardAdminLayout>
    </>
  );
}

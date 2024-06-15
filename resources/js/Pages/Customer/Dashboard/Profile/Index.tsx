import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Loader2, Save } from "lucide-react";
import { FormEventHandler } from "react";

export default function Page(props: PageProps) {
  const { data, setData, errors, put, processing } = useForm({
    name: props.auth.user.name,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route("dashboard.profile"));
  };

  return (
    <>
      <Head>
        <title>Profil saya</title>
      </Head>

      <DashboardCustomerLayout user={props.auth.user}>
        <div className="py-8 max-w-lg">
          <BreadcrumbComponent
            items={[
              {
                title: "Halaman utama",
                href: route("dashboard"),
              },
              {
                title: "Profil saya",
              },
            ]}
          />
          <p className="text-2xl font-semibold mt-4">Profil Saya</p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-1 mt-4">
              <Label>Nama lengkap</Label>
              <Input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>

            <div className="space-y-1 mt-2">
              <Label>Alamat email</Label>
              <Input value={props.auth.user.email} disabled />
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={processing}>
                {processing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="mr-2 w-4 h-4" />
                )}
                Simpan perubahan
              </Button>
            </div>
          </form>
        </div>
      </DashboardCustomerLayout>
    </>
  );
}

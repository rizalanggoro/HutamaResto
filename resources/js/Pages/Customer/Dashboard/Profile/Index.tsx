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
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { PageProps } from "@/types";
import { User } from "@/types/models";
import { Head, useForm } from "@inertiajs/react";
import { Loader2, Save } from "lucide-react";
import { FormEventHandler } from "react";

export default function Page(props: PageProps<{ auth: { user: User } }>) {
  const { data, setData, put, processing } = useForm({
    name: props.auth.user.name,
    address: props.auth.user.address,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route("dashboard.profile"));
  };

  return (
    <>
      <Head title="Profil Saya" />
      <DashboardCustomerLayout>
        <div className="max-w-lg">
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
          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold">Profil Saya</p>
            <p className="text-muted-foreground">
              Berikan informasi profile yang valid agar memudahkan dalam proses
              pemesanan
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Profil</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Anda dapat mengubah beberapa informasi terkait profil Anda
                  sebagai berikut ini
                </CardDescription>
              </CardHeader>

              <div className="px-6 space-y-2">
                <div className="space-y-1">
                  <Label>Nama lengkap</Label>
                  <Input
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <Label>Alamat email</Label>
                  <Input value={props.auth.user.email} disabled />
                </div>

                <div className="space-y-1">
                  <Label>Alamat rumah</Label>
                  <Input
                    value={data.address}
                    onChange={(e) =>
                      setData({ ...data, address: e.target.value })
                    }
                  />
                </div>
              </div>

              <CardFooter className="flex justify-end mt-6">
                <Button type="submit" disabled={processing}>
                  {processing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="mr-2 w-4 h-4" />
                  )}
                  Simpan perubahan
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </DashboardCustomerLayout>
    </>
  );
}

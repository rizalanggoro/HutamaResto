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
import { PageProps } from "@/types";
import { Franchise } from "@/types/models";
import { Head, useForm } from "@inertiajs/react";
import { Save } from "lucide-react";
import { FormEventHandler } from "react";

export default function Page(
  props: PageProps<{
    franchise: Franchise;
  }>,
) {
  const { data, setData, put, processing } = useForm({
    id_franchise: props.franchise.id,
    name: props.franchise.name,
    address: props.franchise.address,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("admin.dashboard.profile"));
  };

  return (
    <>
      <Head title="Profil Restoran" />
      <DashboardAdminLayout>
        <div className="max-w-lg">
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Profil restoran" },
            ]}
          />
          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold">Profil Restoran</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Profil</CardTitle>
                <CardDescription>
                  Masukkan beberapa informasi berikut ini terkait dengan
                  restoran yang Anda kelola
                </CardDescription>
              </CardHeader>
              <div className="px-6 space-y-2">
                <div className={"space-y-1"}>
                  <Label>Nama restoran</Label>
                  <Input
                    value={data.name}
                    onChange={(e) =>
                      setData({
                        ...data,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={"space-y-1"}>
                  <Label>Alamat restoran</Label>
                  <Input
                    value={data.address}
                    onChange={(e) =>
                      setData({
                        ...data,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <CardFooter className="mt-4 flex justify-end">
                <Button type={"submit"}>
                  <Save className={"w-4 h-4 mr-2"} />
                  Simpan perubahan
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </DashboardAdminLayout>
    </>
  );
}

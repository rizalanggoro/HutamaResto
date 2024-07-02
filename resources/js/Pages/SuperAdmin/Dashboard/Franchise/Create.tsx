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
import { Textarea } from "@/Components/ui/textarea";
import DashboardSuperAdminLayout from "@/Layouts/DashboardSuperAdmin";
import { Head, useForm } from "@inertiajs/react";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const { data, setData, errors, post, processing } = useForm({
    image: null as File | null,
    name: "",
    address: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null | ArrayBuffer>(
    null,
  );

  useEffect(() => {
    if (data.image) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(data.image);
    }
  }, [data.image]);

  return (
    <>
      <Head title="Tambah Waralaba" />
      <DashboardSuperAdminLayout>
        <div className="max-w-lg">
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("superadmin.dashboard") },
              {
                title: "Daftar waralaba",
                href: route("superadmin.dashboard.franchise"),
              },
              { title: "Tambah waralaba" },
            ]}
          />

          <div className="mt-4 space-y-2">
            <p className={"font-semibold text-2xl"}>Tambah Waralaba</p>
            <p className="text-muted-foreground">
              Perluas usaha HutamaResto dengan memperbanyak jumlah waralaba ke
              seluruh wilayah Indonesia
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              post(route("superadmin.dashboard.franchise.create"));
            }}
          >
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Profil</CardTitle>
                <CardDescription>
                  Masukkan beberapa informasi berikut ini untuk menambahkan
                  waralaba baru
                </CardDescription>
              </CardHeader>
              <div className="px-6 space-y-2">
                {previewImage && (
                  <img
                    src={previewImage as string}
                    className="rounded-md h-56 object-cover w-full border"
                  />
                )}

                <div className="space-y-1">
                  <Label htmlFor="picture">Gambar restoran</Label>
                  <Input
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        const image = files[0];
                        setData({ ...data, image });
                      }
                    }}
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="file:text-muted-foreground"
                  />
                  {errors.image && (
                    <p className="text-sm text-destructive">{errors.image}</p>
                  )}
                </div>

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
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                <div className={"space-y-1"}>
                  <Label>Alamat restoran</Label>
                  <Textarea
                    className="resize-none"
                    value={data.address}
                    onChange={(e) =>
                      setData({
                        ...data,
                        address: e.target.value,
                      })
                    }
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address}</p>
                  )}
                </div>
              </div>

              <CardFooter className="mt-6 flex justify-end">
                <Button type={"submit"} disabled={processing}>
                  {processing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className={"w-4 h-4 mr-2"} />
                  )}
                  Buat waralaba
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </DashboardSuperAdminLayout>
    </>
  );
}

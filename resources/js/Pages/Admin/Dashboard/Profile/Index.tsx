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
import { useToast } from "@/Components/ui/use-toast";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { PageProps } from "@/types";
import { Franchise } from "@/types/models";
import { Head, useForm } from "@inertiajs/react";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page(
  props: PageProps<{
    franchise: Franchise;
  }>,
) {
  const { data, setData, post, processing, errors } = useForm({
    name: props.franchise.name,
    address: props.franchise.address,
    image: null as File | null,
  });
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null,
  );

  const { toast } = useToast();

  useEffect(() => {
    if (data.image) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(data.image);
    }
  }, [data.image]);

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
            <p className="text-muted-foreground">
              Profil restoran yang benar dapat membantu pelanggan menemukan
              restoran yang Anda kelola dengan mudah dan cepat
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              post(route("admin.dashboard.profile"), {
                onSuccess: () =>
                  toast({
                    title: "Berhasil!",
                    description: "Profil restoran berhasil diperbarui!",
                  }),
              });
            }}
          >
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Profil</CardTitle>
                <CardDescription>
                  Masukkan beberapa informasi berikut ini terkait dengan
                  restoran yang Anda kelola
                </CardDescription>
              </CardHeader>
              <div className="px-6 space-y-2">
                <img
                  src={
                    previewImage
                      ? (previewImage as string)
                      : props.franchise.image
                  }
                  className="rounded-md h-56 object-cover w-full border"
                />

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
                    <Save className={"w-4 h-4 mr-2"} />
                  )}
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

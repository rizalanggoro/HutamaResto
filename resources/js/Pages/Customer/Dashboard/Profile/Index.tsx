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
import { useToast } from "@/Components/ui/use-toast";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { PageProps } from "@/types";
import { User } from "@/types/models";
import { Head, router, useForm } from "@inertiajs/react";
import { Loader2, Save } from "lucide-react";
import { FormEventHandler, useEffect, useState } from "react";

export default function Page(props: PageProps<{ auth: { user: User } }>) {
  const { data, setData, post, processing, errors } = useForm({
    name: props.auth.user.name,
    address: props.auth.user.address,
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

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("dashboard.profile"), {
      onSuccess: () => {
        router.reload();
        toast({
          title: "Berhasil!",
          description: "Perubahan profile berhasil disimpan!",
        });
      },
    });
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
                {(props.auth.user.image || previewImage) && (
                  <img
                    src={
                      previewImage
                        ? (previewImage as string)
                        : props.auth.user.image
                    }
                    className="rounded-md h-56 object-cover w-full border"
                  />
                )}

                <div className="space-y-1">
                  <Label htmlFor="picture">Gambar profile</Label>
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

                <div className="space-y-1">
                  <Label>Nama lengkap</Label>
                  <Input
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
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
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address}</p>
                  )}
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

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Image, Loader2, Plus } from "lucide-react";
import { FormEventHandler, useEffect, useState } from "react";

export default function Page(props: PageProps<{}>) {
  const [imagePreview, setImagePreview] = useState<string | null>();

  const { data, setData, errors, post, processing } = useForm({
    name: "",
    description: "",
    availability: true,
    type: "food",
    image: null as File | null,
    price: 0 as number,
  });
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("admin.dashboard.menu.create"));
  };

  useEffect(() => {
    if (data.image) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          setImagePreview(result as string);
        }
      };
      fileReader.readAsDataURL(data.image);
    }
  }, [data.image]);

  return (
    <>
      <Head title="Tambah Menu" />
      <DashboardAdminLayout>
        <div className="max-w-lg">
          <BreadcrumbComponent
            items={[
              {
                title: "Halaman utama",
                href: "/admin/dashboard",
              },
              {
                title: "Daftar menu",
                href: "/admin/dashboard/menu",
              },
              {
                title: "Tambah menu",
              },
            ]}
          />

          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold">Tambah Menu</p>
            <p className="text-muted-foreground">
              Tambahkan pilihan menu baru yang menarik untuk meningkatkan
              variasi hidangan dan kepuasan pelanggan secara keseluruhan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Menu</CardTitle>
                <CardDescription>
                  Masukkan beberapa informasi berikut untuk menambahkan variasi
                  menu baru
                </CardDescription>
              </CardHeader>

              <div className="space-y-2 px-6">
                <div className="flex justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      className="block rounded h-56 w-full object-cover"
                    />
                  ) : (
                    <div className="h-56 w-full border border-dashed rounded flex justify-center items-center text-muted-foreground">
                      <Image />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="picture">Gambar menu</Label>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="file:text-muted-foreground"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        setData({ ...data, image: files[0] });
                      }
                    }}
                  />
                  {errors.image && (
                    <p className="text-sm text-destructive">{errors.image}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>Nama menu</Label>
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

                <div className="space-y-1">
                  <Label>Deskripsi menu</Label>
                  <Textarea
                    value={data.description}
                    onChange={(e) =>
                      setData({
                        ...data,
                        description: e.target.value,
                      })
                    }
                    className="resize-none min-h-32"
                  ></Textarea>
                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>Harga menu</Label>
                  <Input
                    type="number"
                    value={data.price}
                    onChange={(e) =>
                      setData({
                        ...data,
                        price: Number(e.target.value),
                      })
                    }
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive">{errors.price}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>Ketersediaan menu</Label>
                  <Select
                    defaultValue={
                      data.availability ? "available" : "unavailable"
                    }
                    onValueChange={(e) =>
                      setData({
                        ...data,
                        availability: e === "available",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Ketersediaan menu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Tersedia</SelectItem>
                      <SelectItem value="unavailable">
                        Tidak tersedia
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.availability && (
                    <p className="text-sm text-destructive">
                      {errors.availability}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>Tipe menu</Label>
                  <Select
                    defaultValue={data.type}
                    onValueChange={(e) =>
                      setData({
                        ...data,
                        type: e,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Jenis menu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Makanan</SelectItem>
                      <SelectItem value="beverage">Minuman</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-sm text-destructive">{errors.type}</p>
                  )}
                </div>
              </div>

              <CardFooter className="flex justify-end mt-6">
                <Button type="submit" disabled={processing}>
                  {processing ? (
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

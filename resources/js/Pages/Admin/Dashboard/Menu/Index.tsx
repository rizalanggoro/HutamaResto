import BreadcrumbComponent from "@/Components/Breadcrumb";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardFooter, CardHeader } from "@/Components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Franchise, Menu } from "@/types/models";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Edit2, Image, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type CustomMenu = Menu & { order_items_count: number };

export default function Page(
  props: PageProps<{
    franchise: Franchise;
    menus: CustomMenu[];
  }>,
) {
  const [selectedMenu, setSelectedMenu] = useState<CustomMenu>();

  const updateMenuAvailabilityForm = useForm({ availability: false });
  const [
    isDialogUpdateMenuAvailabilityOpen,
    setIsDialogUpdateMenuAvailabilityOpen,
  ] = useState(false);

  const deleteMenuForm = useForm();
  const [isDialogDeleteMenuOpen, setIsDialogDeleteMenuOpen] = useState(false);

  const onClickButtonUpdateMenuAvailability = () =>
    updateMenuAvailabilityForm.patch(
      route("admin.dashboard.menu.updateAvailability", {
        id: selectedMenu?.id,
      }),
      {
        onSuccess: () => router.reload(),
        onFinish: () => {
          setSelectedMenu(undefined);
          setIsDialogUpdateMenuAvailabilityOpen(false);
        },
      },
    );

  const onClickButtonDeleteMenu = () =>
    deleteMenuForm.delete(
      route("admin.dashboard.menu.delete", { id: selectedMenu?.id }),
      {
        onSuccess: () => router.reload(),
        onFinish: () => {
          setSelectedMenu(undefined);
          setIsDialogDeleteMenuOpen(false);
        },
      },
    );

  return (
    <>
      <Head title="Daftar Menu" />
      <DashboardAdminLayout>
        <div>
          <BreadcrumbComponent
            items={[
              {
                title: "Halaman utama",
                href: "/admin/dashboard",
              },
              {
                title: "Daftar menu",
              },
            ]}
          />

          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold">Daftar Menu</p>
            <p className="text-muted-foreground">
              Berikut daftar makanan dan minuman yang terdapat pada{" "}
              {props.franchise.name}
            </p>
          </div>

          <div className="flex items-center mt-8 gap-2">
            <Tabs
              defaultValue={
                (route().params.type as string | undefined) ?? "all"
              }
              onValueChange={(e) =>
                router.reload({
                  data: { type: e === "all" ? undefined : e },
                })
              }
            >
              <TabsList>
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="food">Makanan</TabsTrigger>
                <TabsTrigger value="beverage">Minuman</TabsTrigger>
              </TabsList>
            </Tabs>
            <Select
              defaultValue={
                (route().params.availability as string | undefined) ?? "all"
              }
              onValueChange={(e) =>
                router.reload({
                  data: { availability: e === "all" ? undefined : e },
                })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Ketersediaan</SelectLabel>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="available">Tersedia</SelectItem>
                  <SelectItem value="unavailable">Tidak tersedia</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex-1"></div>

            <Button asChild variant={"outline"}>
              <Link href="/admin/dashboard/menu/create">
                <Plus className="w-4 h-4 mr-2" />
                Tambah menu
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {props.menus.map((menu, index) => (
              <Card key={"menu-item-" + index}>
                <CardHeader className="grid grid-cols-1 gap-2 p-4">
                  {index % 2 === 0 ? (
                    <img
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="w-full h-48 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-48 object-cover rounded border border-dashed flex items-center justify-center">
                      <Image className="text-muted-foreground" />
                    </div>
                  )}

                  <div>
                    <Badge
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedMenu(menu);
                        setIsDialogUpdateMenuAvailabilityOpen(true);
                      }}
                      variant={menu.availability === 0 ? "outline" : "default"}
                    >
                      {menu.availability === 0 ? "Tidak tersedia" : "Tersedia"}
                    </Badge>
                    <p
                      className={cn(
                        "font-semibold mt-2",
                        menu.availability === 0 && "line-through",
                      )}
                    >
                      {menu.name}
                    </p>
                    <p
                      className={cn(
                        "text-muted-foreground text-sm",
                        menu.availability === 0 && "line-through",
                      )}
                    >
                      {menu.description}
                    </p>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-end gap-1 px-4 pb-4">
                  <Button variant={"outline"} className="flex-1">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Ubah
                  </Button>
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => {
                      setSelectedMenu(menu);
                      setIsDialogDeleteMenuOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* <Card className="mt-4 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/70">
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Ketersediaan</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.menus.map((menu, index) => (
                  <TableRow
                    className={cn(menu.availability || "bg-muted")}
                    key={"menu-item-" + index}
                  >
                    <TableCell
                      className={cn(menu.availability || "line-through")}
                    >
                      {menu.name}
                    </TableCell>
                    <TableCell
                      className={cn(menu.availability || "line-through")}
                    >
                      {menu.description}
                    </TableCell>
                    <TableCell>
                      <Button
                        size={"sm"}
                        variant={menu.availability ? "secondary" : "ghost"}
                        onClick={() => {
                          updateMenuAvailabilityForm.setData({
                            availability: !menu.availability,
                          });
                          setSelectedMenu(menu);
                          setIsDialogUpdateMenuAvailabilityOpen(true);
                        }}
                      >
                        {menu.availability ? "Tersedia" : "Tidak tersedia"}
                      </Button>
                    </TableCell>
                    <TableCell className="flex gap-1">
                      <Button size={"icon"} variant={"secondary"}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size={"icon"}
                        variant={"destructive"}
                        onClick={() => {
                          setSelectedMenu(menu);
                          setIsDialogDeleteMenuOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card> */}
        </div>
      </DashboardAdminLayout>

      {/* dialog update ketersediaan menu */}
      <AlertDialog
        open={isDialogUpdateMenuAvailabilityOpen}
        onOpenChange={(e) => setIsDialogUpdateMenuAvailabilityOpen(e)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ketersediaan menu</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin akan mengubah ketersediaan menu{" "}
              <span className="font-semibold">{selectedMenu?.name ?? "-"}</span>{" "}
              menjadi{" "}
              <span className="font-semibold">
                {selectedMenu?.availability ? "tidak tersedia" : "tersedia"}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={updateMenuAvailabilityForm.processing}>
              Batal
            </AlertDialogCancel>
            <Button
              onClick={onClickButtonUpdateMenuAvailability}
              disabled={updateMenuAvailabilityForm.processing}
            >
              {updateMenuAvailabilityForm.processing && (
                <Loader2 className="animate-spin mr-2 w-4 h-4" />
              )}
              Ubah
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* dialog konfirmasi hapus menu */}
      <AlertDialog
        open={isDialogDeleteMenuOpen}
        onOpenChange={(e) => setIsDialogDeleteMenuOpen(e)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus Menu</AlertDialogTitle>
            {(selectedMenu?.order_items_count ?? 0) > 0 ? (
              <AlertDialogDescription>
                Menu yang akan Anda hapus masih terikat dengan{" "}
                {selectedMenu?.order_items_count ?? 0} pesanan. Silahkan
                selesaikan pesanan tersebut terlebih dahulu
              </AlertDialogDescription>
            ) : (
              <AlertDialogDescription>
                Apakah Anda yakin akan menghapus menu{" "}
                <span className="font-semibold">
                  {selectedMenu?.name ?? "-"}
                </span>{" "}
                dari database? Tindakan Anda bersifat permanen dan tidak dapat
                dipulihkan
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMenuForm.processing}>
              Batal
            </AlertDialogCancel>
            {selectedMenu?.order_items_count === 0 && (
              <Button
                disabled={deleteMenuForm.processing}
                variant={"destructive"}
                onClick={onClickButtonDeleteMenu}
              >
                {deleteMenuForm.processing && (
                  <Loader2 className="animate-spin mr-2 w-4 h-4" />
                )}
                Hapus
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

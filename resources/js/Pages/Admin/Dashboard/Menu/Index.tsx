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
import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Franchise, Menu } from "@/types/models";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Edit2, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type CustomMenu = Menu & { order_items_count: number };

export default function Page(
  props: PageProps<{
    franchise: Franchise;
    menus: CustomMenu[];
  }>
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
      }
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
      }
    );

  return (
    <>
      <Head title="Daftar menu" />

      <DashboardAdminLayout>
        <div className="py-8 pr-2">
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

          <p className="text-2xl font-semibold mt-4">Daftar Menu</p>
          <p>
            Berikut daftar makanan dan minuman yang terdapat pada{" "}
            {props.franchise.name}
          </p>

          <div className="flex justify-between items-center mt-8">
            <Tabs
              defaultValue={"all"}
              onValueChange={(e) => {
                router.reload({
                  data: { filter: e === "all" ? undefined : e },
                });
              }}
            >
              <TabsList>
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="food">Makanan</TabsTrigger>
                <TabsTrigger value="beverage">Minuman</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button asChild>
              <Link href="/admin/dashboard/menu/create">
                <Plus className="w-4 h-4 mr-2" />
                Tambah menu
              </Link>
            </Button>
          </div>

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Ketersediaan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.menus.map((menu, index) => (
                <TableRow className={cn(menu.availability || "bg-muted")}>
                  <TableCell>{index + 1}</TableCell>
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

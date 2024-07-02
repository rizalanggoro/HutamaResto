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
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import DashboardSuperAdminLayout from "@/Layouts/DashboardSuperAdmin";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Franchise } from "@/types/models";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Loader2, Plus, Trash } from "lucide-react";
import { useState } from "react";

export default function Page(
  props: PageProps<{
    franchises: Franchise[];
  }>,
) {
  const formDeleteFranchise = useForm();
  const [selectedFranchise, setSelectedFranchise] = useState<Franchise>();
  const [isDialogConfirmDeleteOpen, setIsDialogConfirmDeleteOpen] =
    useState(false);

  return (
    <>
      <Head title="Daftar Waralaba" />
      <DashboardSuperAdminLayout>
        <div>
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("superadmin.dashboard") },
              { title: "Daftar waralaba" },
            ]}
          />

          <div className="mt-4 space-y-2">
            <p className="font-semibold text-2xl">Daftar Waralaba</p>
            <p className="text-muted-foreground">
              Berikut daftar beberapa waralaba HutamaResto di berbagai wilayah
              di seluruh Indonesia
            </p>
          </div>

          <div className="flex items-center justify-end mt-8">
            <Button asChild variant={"outline"}>
              <Link href={route("superadmin.dashboard.franchise.create")}>
                <Plus className={"w-4 h-4 mr-2"} />
                Tambah waralaba
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {props.franchises.map((franchise, index) => (
              <Card
                key={"franchise-item-" + index}
                className="overflow-hidden group flex flex-col"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={franchise.image}
                    className={cn(
                      "inline-block h-48 object-cover w-full group-hover:scale-110 duration-300",
                      franchise.is_open === 0 && "grayscale",
                    )}
                  />
                </div>

                <CardHeader className="flex-1">
                  <Badge
                    className="w-fit"
                    variant={franchise.is_open === 0 ? "outline" : "default"}
                  >
                    {franchise.is_open === 0 ? "Tutup" : "Buka"}
                  </Badge>
                  <CardTitle className="text-lg">{franchise.name}</CardTitle>
                  <CardDescription>{franchise.address}</CardDescription>
                </CardHeader>

                <CardFooter>
                  <Button
                    variant={"destructive"}
                    className="w-full"
                    onClick={() => {
                      setSelectedFranchise(franchise);
                      setIsDialogConfirmDeleteOpen(true);
                    }}
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Hapus
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </DashboardSuperAdminLayout>

      {/* dialog confirm delete franchise */}
      <AlertDialog
        open={isDialogConfirmDeleteOpen}
        onOpenChange={(e) => setIsDialogConfirmDeleteOpen(e)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin akan menghapus waralaba{" "}
              <span className="font-semibold">
                {selectedFranchise?.name ?? "-"}
              </span>{" "}
              yang beralamat di{" "}
              <span className="font-semibold">
                {selectedFranchise?.address}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <Button
              variant={"destructive"}
              disabled={formDeleteFranchise.processing}
              onClick={() =>
                formDeleteFranchise.delete(
                  route("superadmin.dashboard.franchise.delete", {
                    id: selectedFranchise?.id,
                  }),
                  {
                    onSuccess: () => {
                      setIsDialogConfirmDeleteOpen(false);
                      router.reload();
                    },
                  },
                )
              }
            >
              {formDeleteFranchise.processing && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

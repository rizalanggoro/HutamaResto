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
import { Card } from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { PageProps } from "@/types";
import { Franchise, User } from "@/types/models";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Page(
  props: PageProps<{
    franchise: Franchise;
    users: User[];
  }>,
) {
  const [isDialogConfirmDeleteOpen, setIsDialogConfirmDeleteOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const formDeleteAdmin = useForm();

  return (
    <>
      <Head title="Kelola Admin" />
      <DashboardAdminLayout>
        <div>
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Kelola admin" },
            ]}
          />
          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold ">Kelola Admin</p>
            <p className="text-muted-foreground">
              Berikut daftar beberapa admin yang memiliki hak akses untuk
              mengelola {props.franchise.name}
            </p>
          </div>

          <div className="mt-8 justify-end flex">
            <Button variant={"outline"} asChild>
              <Link href={route("admin.dashboard.manageAdmin.create")}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah admin
              </Link>
            </Button>
          </div>

          <Card className="mt-4 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/70">
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.users.map((user, index) => (
                  <TableRow key={"user-item-" + index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button
                        disabled={props.users.length <= 1}
                        variant={"destructive"}
                        size={"icon"}
                        onClick={() => {
                          setSelectedUser(user);
                          setIsDialogConfirmDeleteOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </DashboardAdminLayout>

      {/* dialog confirm delete admin */}
      <AlertDialog
        open={isDialogConfirmDeleteOpen}
        onOpenChange={(e) => setIsDialogConfirmDeleteOpen(e)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin akan menghapus hak akses admin untuk pengguna{" "}
              <span className="font-semibold">{selectedUser?.name ?? "-"}</span>{" "}
              dengan alamat email{" "}
              <span className="font-semibold">
                {selectedUser?.email ?? "-"}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <Button
              onClick={() =>
                formDeleteAdmin.delete(
                  route("admin.dashboard.manageAdmin.delete", {
                    id: selectedUser?.id,
                  }),
                  {
                    onFinish: () => {
                      setSelectedUser(undefined);
                      setIsDialogConfirmDeleteOpen(false);
                    },
                  },
                )
              }
              variant={"destructive"}
              disabled={formDeleteAdmin.processing}
            >
              {formDeleteAdmin.processing && (
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

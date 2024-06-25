import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
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
import { Head } from "@inertiajs/react";
import { Plus, Trash2 } from "lucide-react";

export default function Page(
  props: PageProps<{
    franchise: Franchise;
    users: User[];
  }>,
) {
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
          <div className="mt-4 flex items-center gap-4 justify-between">
            <div>
              <p className="text-2xl font-semibold ">Kelola Admin</p>
              <p className="mt-2">
                Berikut daftar beberapa admin yang memiliki hak akses untuk
                mengelola {props.franchise.name}
              </p>
            </div>
            <Button variant={"outline"}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah admin
            </Button>
          </div>

          <Table className="mt-8">
            <TableHeader>
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
                    <Button variant={"destructive"} size={"icon"}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DashboardAdminLayout>
    </>
  );
}

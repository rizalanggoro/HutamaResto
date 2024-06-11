import DashboardSuperAdminLayout from "@/Layouts/DashboardSuperAdmin";
import BreadcrumbComponent from "@/Components/Breadcrumb";
import {Franchise} from "@/types/models";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/Components/ui/table";
import {Button} from "@/Components/ui/button";
import {Plus} from "lucide-react";
import {Link} from "@inertiajs/react";

type Props = {
  franchises: Franchise[]
}

export default function Page(props: Props) {
  return <>
    <DashboardSuperAdminLayout>
      <div className={'py-8 pr-2'}>
        <BreadcrumbComponent items={[
          {title: 'Halaman utama', href: route('superadmin.dashboard')},
          {title: 'Daftar waralaba'},
        ]}/>

        <div className={'flex items-center justify-between'}>
          <div>
            <p className={'font-semibold text-2xl mt-4'}>Daftar Waralaba</p>
            <p>Berikut daftar waralaba dari HutamaResto</p>
          </div>

          <Button asChild>
            <Link href={route('superadmin.dashboard.franchise.create')}>
              <Plus className={'w-4 h-4 mr-2'}/>
              Tambah waralaba
            </Link>
          </Button>
        </div>

        <Table className={'mt-4'}>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Alamat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.franchises.map((franchise, index) =>
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{franchise.name}</TableCell>
                <TableCell>{franchise.address}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardSuperAdminLayout>
  </>
}

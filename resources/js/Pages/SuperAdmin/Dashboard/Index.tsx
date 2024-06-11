import DashboardSuperAdminLayout from "@/Layouts/DashboardSuperAdmin";
import BreadcrumbComponent from "@/Components/Breadcrumb";
import {User} from "@/types/models";
import {Button} from "@/Components/ui/button";
import {LogOut} from "lucide-react";
import {Link} from "@inertiajs/react";

type Props = {
  user: User,
}

export default function Page(props: Props) {
  return <>
    <DashboardSuperAdminLayout>
      <div className={'py-8 pr-2'}>
        <BreadcrumbComponent items={[
          {title: 'Halaman utama'}
        ]}/>

        <p className={'font-semibold text-2xl mt-4'}>Halo, {props.user.name}!</p>

        <Button asChild variant={'destructive'} className={'mt-4'}>
          <Link href={route('logout')} method={'post'}>
            <LogOut className={'w-4 h-4 mr-2'}/>
            Keluar
          </Link>
        </Button>
      </div>
    </DashboardSuperAdminLayout>
  </>
}

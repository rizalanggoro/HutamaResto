import DashboardSuperAdminLayout from "@/Layouts/DashboardSuperAdmin";
import BreadcrumbComponent from "@/Components/Breadcrumb";
import {Button} from "@/Components/ui/button";
import {Save} from "lucide-react";
import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";
import {useForm} from "@inertiajs/react";
import {FormEventHandler} from "react";

export default function Page() {
  const {data, setData, errors, post, processing} = useForm({
    name: '',
    address: '',
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
  }

  return <>
    <DashboardSuperAdminLayout>
      <div className={'py-8 pr-2 max-w-lg'}>
        <BreadcrumbComponent items={[
          {title: 'Halaman utama', href: route('superadmin.dashboard')},
          {title: 'Daftar waralaba', href: route('superadmin.dashboard.franchise')},
          {title: 'Tambah waralaba'},
        ]}/>

        <p className={'mt-4 font-semibold text-2xl'}>Tambah Waralaba</p>
        <p>Lengkapi beberapa informasi berikut ini untuk menambahkan waralaba baru</p>

        <form onSubmit={handleSubmit} className={'mt-4'}>
          <div className={'space-y-2'}>
            <div className={'space-y-1'}>
              <Label>Masukkan nama waralaba</Label>
              <Input value={data.name} onChange={(e) => setData({
                ...data,
                name: e.target.value,
              })}/>
            </div>
            <div className={'space-y-1'}>
              <Label>Masukkan alamat waralaba</Label>
              <Input value={data.address} onChange={(e) => setData({
                ...data,
                address: e.target.value,
              })}/>
            </div>
          </div>

          <div className={'mt-4 flex justify-end'}>
            <Button type={'submit'}>
              <Save className={'w-4 h-4 mr-2'}/>
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </DashboardSuperAdminLayout>
  </>
}

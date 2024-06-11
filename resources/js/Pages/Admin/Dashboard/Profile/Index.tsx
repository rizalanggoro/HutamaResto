import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import BreadcrumbComponent from "@/Components/Breadcrumb";
import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";
import {Franchise} from "@/types/models";
import {FormEventHandler} from "react";
import {Button} from "@/Components/ui/button";
import {Save} from "lucide-react";
import {useForm} from "@inertiajs/react";

type Props = {
    franchise: Franchise,
}

export default function Page(props: Props) {
    const {data, setData, put, processing} = useForm({
        id_franchise: props.franchise.id,
        name: props.franchise.name,
        address: props.franchise.address,
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        put(route('admin.dashboard.profile'))
    }

    return <>
        <DashboardAdminLayout>
            <div className={'py-8 pr-2 max-w-xl'}>
                <BreadcrumbComponent items={[
                    {title: 'Halaman utama', href: route('admin.dashboard')},
                    {title: 'Profil restoran'},
                ]}/>
                <p className={'text-2xl font-semibold mt-4'}>Profil Restoran</p>

                <form onSubmit={handleSubmit}>
                    <div className={'mt-4 space-y-1'}>
                        <Label>Nama restoran</Label>
                        <Input value={data.name} onChange={(e) => setData({
                            ...data,
                            name: e.target.value,
                        })}/>
                    </div>
                    <div className={'mt-4 space-y-1'}>
                        <Label>Alamat restoran</Label>
                        <Input value={data.address} onChange={(e) => setData({
                            ...data,
                            address: e.target.value,
                        })}/>
                    </div>

                    <div className={'mt-4 flex justify-end'}>
                        <Button type={'submit'}>
                            <Save className={'w-4 h-4 mr-2'}/>
                            Simpan perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardAdminLayout>
    </>
}

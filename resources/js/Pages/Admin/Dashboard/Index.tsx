import DashboardAdminLayout from "@/Layouts/DashboardAdmin";

type Props = {
    franchise: any;
};

export default function Page({ franchise }: Props) {
    return (
        <>
            <DashboardAdminLayout>
                <p>Halaman index dashboard untuk admin</p>

                {JSON.stringify(franchise)}
            </DashboardAdminLayout>
        </>
    );
}

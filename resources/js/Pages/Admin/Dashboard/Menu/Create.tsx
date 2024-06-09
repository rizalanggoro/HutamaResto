import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler } from "react";

type Props = {
    idFranchise: number;
};

export default function Page(props: Props) {
    const { data, setData, errors, post, processing } = useForm({
        idFranchise: props.idFranchise,
        name: "",
        description: "",
        availability: true,
        type: "food",
    });
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("admin.dashboard.menu.create"));
    };

    return (
        <>
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
                                href: "/admin/dashboard/menu",
                            },
                            {
                                title: "Tambah menu",
                            },
                        ]}
                    />

                    <p className="text-2xl font-semibold mt-4">Tambah Menu</p>
                    <p>
                        Masukkan beberapa informasi berikut untuk menambahkan
                        menu baru
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="max-w-[480px] mt-4"
                    >
                        <div className="space-y-2">
                            <div className="space-y-1">
                                <Label>Masukkan nama menu</Label>
                                <Input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label>Masukkan deskripsi menu</Label>
                                <Textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            description: e.target.value,
                                        })
                                    }
                                    className="resize-none min-h-32"
                                ></Textarea>
                                {errors.description && (
                                    <p className="text-sm text-destructive">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label>Masukkan ketersediaan menu</Label>
                                <Select
                                    defaultValue={
                                        data.availability
                                            ? "available"
                                            : "unavailable"
                                    }
                                    onValueChange={(e) =>
                                        setData({
                                            ...data,
                                            availability: e === "available",
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Ketersediaan menu" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">
                                            Tersedia
                                        </SelectItem>
                                        <SelectItem value="unavailable">
                                            Tidak tersedia
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.availability && (
                                    <p className="text-sm text-destructive">
                                        {errors.availability}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label>Masukkan tipe menu</Label>
                                <Select
                                    defaultValue={data.type}
                                    onValueChange={(e) =>
                                        setData({
                                            ...data,
                                            type: e,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Jenis menu" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="food">
                                            Makanan
                                        </SelectItem>
                                        <SelectItem value="beverage">
                                            Minuman
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.type && (
                                    <p className="text-sm text-destructive">
                                        {errors.type}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <Button type="submit" disabled={processing}>
                                {processing && (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                )}
                                Tambah
                            </Button>
                        </div>
                    </form>
                </div>
            </DashboardAdminLayout>
        </>
    );
}

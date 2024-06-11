import ContainerComponent from "@/Components/Container";
import NavbarComponent from "@/Components/Navbar";
import {Button} from "@/Components/ui/button";
import {Input} from "@/Components/ui/input";
import {Label} from "@/Components/ui/label";
import {Link, useForm} from "@inertiajs/react";
import {Loader2} from "lucide-react";
import {FormEventHandler} from "react";

type Props = {
    role: number;
};

export default function Login(props: Props) {
    const {data, setData, errors, post, processing} = useForm({
        email: "customer@example.com",
        password: "password",
        role: props.role,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const routes: {
            [key: number]: string;
        } = {
            0: "login",
            1: "admin.login",
            2: "superadmin.login",
        };

        post(route(routes[props.role]));
    };

    return (
        <>
            <NavbarComponent/>
            <ContainerComponent variant="xs" className="pt-24 pb-8">
                <h3 className="text-2xl font-semibold">
                    Selamat datang kembali di HutamaResto
                </h3>
                <p>
                    Silahkan masukkan beberapa informasi berikut untuk
                    melanjutkan ke aplikasi HutamaResto
                </p>

                <form onSubmit={handleSubmit} className="mt-8">
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <Label>Masukkan alamat email</Label>
                            <Input
                                value={data.email}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        email: e.target.value,
                                    })
                                }
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label>Masukkan kata sandi</Label>
                            <Input
                                value={data.password}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            {processing && (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                            )}
                            Masuk
                        </Button>
                    </div>
                </form>

                <div className="text-center mt-2">
                    {props.role === 0 && (
                        <Button asChild variant={"link"} size={"sm"}>
                            <Link href={route("register")}>
                                Belum terdaftar sebagai customer? Daftar
                                sekarang
                            </Link>
                        </Button>
                    )}
                </div>
            </ContainerComponent>
        </>
    );
}

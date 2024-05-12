import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

type Props = {
    role: number;
};

export default function Login(props: Props) {
    const { data, setData, errors, post } = useForm({
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
            <p>Ini adalah halaman login untuk semua role</p>
            <p>Login sebagai {props.role}</p>

            <p>{JSON.stringify(errors)}</p>

            <form onSubmit={handleSubmit}>
                <Label>Masukkan alamat email</Label>
                <Input
                    value={data.email}
                    onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                    }
                />

                <Label>Masukkan kata sandi</Label>
                <Input
                    value={data.password}
                    onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                    }
                />

                <Button type="submit">Masuk</Button>
            </form>

            {props.role === 0 && (
                <Button asChild variant={"link"}>
                    <Link href={route("register")}>Daftar customer</Link>
                </Button>
            )}
        </>
    );
}

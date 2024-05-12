import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login() {
    const { data, setData, post, errors } = useForm({
        email: "customer@example.com",
        password: "password",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <p>Halaman login customer</p>

            <form onSubmit={handleSubmit}>
                <Input
                    value={data.email}
                    onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                    }
                />
                {errors.email && (
                    <>
                        <p>{errors.email}</p>
                    </>
                )}

                <Input
                    value={data.password}
                    onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                    }
                />

                <Button type="submit">Masuk</Button>
            </form>
        </>
    );
}

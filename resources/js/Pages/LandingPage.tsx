import ContainerComponent from "@/Components/Container";
import NavbarComponent from "@/Components/Navbar";
import {Button} from "@/Components/ui/button";
import {Card, CardDescription, CardHeader, CardTitle,} from "@/Components/ui/card";
import {Link} from "@inertiajs/react";

type Props = {
    franchises: {
        name: string;
        address: string;
    }[];
};

export default function LandingPage(props: Props) {
    return (
        <>
            <NavbarComponent/>

            <ContainerComponent>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Minima porro hic fugiat dolores, velit, at ducimus totam
                    cupiditate harum animi perferendis pariatur laudantium?
                    Saepe consectetur, dignissimos quod natus eos autem.
                </p>

                <p>Ini adalah landing page</p>

                <Button asChild variant={"link"}>
                    <Link href={route("login")}>Login customer</Link>
                </Button>
                <Button asChild variant={"link"}>
                    <Link href={route("admin.login")}>Login admin</Link>
                </Button>
                <Button asChild variant={"link"}>
                    <Link href={route("superadmin.login")}>
                        Login super admin
                    </Link>
                </Button>

                <br/>

                <Button asChild variant={"link"}>
                    <Link href={route("dashboard")}>Dashboard customer</Link>
                </Button>
                <Button asChild variant={"link"}>
                    <Link href={route("admin.dashboard")}>Dashboard admin</Link>
                </Button>
                <Button asChild variant={"link"}>
                    <Link href={route("superadmin.dashboard")}>
                        Dashboard super admin
                    </Link>
                </Button>

                <p className="font-semibold text-2xl mt-8">Daftar Franchise</p>
                <p>Berikut adalah beberapa daftar franchise dari HutamaResto</p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                    {props.franchises.map((franchise, index) => (
                        <Card>
                            <CardHeader>
                                <CardTitle>{franchise.name}</CardTitle>
                                <CardDescription>
                                    {franchise.address}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </ContainerComponent>
        </>
    );
}

import ContainerComponent from "@/Components/Container";
import NavbarComponent from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { PageProps } from "@/types";
import { Franchise, User } from "@/types/models";
import { Head, Link } from "@inertiajs/react";
import { LandPlot, Percent, Utensils } from "lucide-react";

export default function LandingPage(
  props: PageProps<{
    franchises: Franchise[];
    user?: User;
  }>
) {
  return (
    <>
      <Head>
        <title>Halaman utama</title>
      </Head>

      <NavbarComponent user={props.user} />

      <ContainerComponent>
        <main className="pt-16 pb-8">
          <section className="mt-32">
            <p className="font-extrabold text-5xl leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-teal-600 from-primary">
                Rasakan Keajaiban Rasa,{" "}
              </span>
              Setiap Suapan Membawa Kebahagiaan
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Selamat datang di HutamaResto, tempat di mana setiap hidangan
              disiapkan dengan cinta dan keahlian. Nikmati pengalaman kuliner
              yang tak terlupakan dengan cita rasa autentik dan pelayanan
              terbaik. Mari, temukan kelezatan sejati di sini.
            </p>

            <div className="mt-8 flex items-center gap-2">
              <Button>
                <Utensils className="w-4 h-4 mr-2" />
                Daftar menu
              </Button>
              <Button variant={"outline"}>
                <Percent className="w-4 h-4 mr-2" />
                Daftar promo
              </Button>
            </div>
          </section>

          <section className="mt-32">
            <p className="text-3xl font-semibold leading-tight">
              HutamaResto: Menyebar Cita Rasa ke Seluruh Negeri
            </p>
            <p className="text-muted-foreground mt-2">
              Temukan HutamaResto di dekat Anda! Kami telah hadir di berbagai
              kota, menyajikan hidangan lezat dengan cita rasa autentik. Lihat
              daftar lokasi franchise kami yang sudah ada dan nikmati pengalaman
              kuliner terbaik di tempat terdekat Anda. Selalu ada HutamaResto
              yang siap menyambut Anda dengan kelezatan yang tak tertandingi.
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {props.franchises.map((franchise, index) => (
                <Card
                  key={"card-item-franchise-" + index}
                  className="overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1632181933699-d45280e5c7de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="inline-block h-48 object-cover w-full"
                  />

                  <CardHeader>
                    <CardTitle>{franchise.name}</CardTitle>
                    <CardDescription>{franchise.address}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Button variant={"outline"} className="mt-4">
              <LandPlot className="w-4 h-4 mr-2" />
              Lihat lainnya
            </Button>
          </section>

          <section className="mt-8 bg-muted/70 p-8 rounded-lg">
            <p className="text-3xl font-semibold leading-tight">
              Bergabunglah dengan Keluarga HutamaResto
            </p>
            <p className="text-muted-foreground mt-2">
              Jadilah bagian dari kesuksesan HutamaResto! Kami mengundang Anda
              untuk bergabung dalam jaringan franchise kami yang terus
              berkembang. Dengan dukungan penuh dan sistem yang terbukti, Anda
              dapat memulai bisnis kuliner dengan percaya diri. Daftar sekarang
              dan mari kita bersama-sama menyajikan kelezatan kepada lebih
              banyak orang.
            </p>
          </section>

          <Separator className="mt-8" />
        </main>

        <Button asChild variant={"link"}>
          <Link href={route("login")}>Login customer</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link href={route("admin.login")}>Login admin</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link href={route("superadmin.login")}>Login super admin</Link>
        </Button>

        <br />

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
      </ContainerComponent>
    </>
  );
}

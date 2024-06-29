import ContainerComponent from "@/Components/Container";
import FranchiseItemComponent from "@/Components/FranchiseItem";
import NavbarComponent from "@/Components/Navbar";
import { PageProps } from "@/types";
import { Franchise } from "@/types/models";
import { Head } from "@inertiajs/react";

export default function Page(
  props: PageProps<{
    franchises: Franchise[];
  }>,
) {
  return (
    <>
      <Head title="Daftar Restoran" />
      <NavbarComponent />
      <ContainerComponent>
        <div className="pt-24 pb-8">
          <div className="space-y-2">
            <p className="text-3xl font-semibold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-teal-600 from-primary">
                HutamaResto:
              </span>{" "}
              Menyebar Cita Rasa ke Seluruh Negeri
            </p>
            <p className="text-muted-foreground">
              Temukan HutamaResto di dekat Anda! Kami telah hadir di berbagai
              kota, menyajikan hidangan lezat dengan cita rasa autentik. Lihat
              daftar lokasi franchise kami yang sudah ada dan nikmati pengalaman
              kuliner terbaik di tempat terdekat Anda. Selalu ada HutamaResto
              yang siap menyambut Anda dengan kelezatan yang tak tertandingi.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-8">
            {props.franchises.map((franchise, index) => (
              <FranchiseItemComponent
                key={"franchise-item-" + index}
                franchise={franchise}
              />
            ))}
          </div>
        </div>
      </ContainerComponent>
    </>
  );
}

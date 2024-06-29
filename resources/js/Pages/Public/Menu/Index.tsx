import ContainerComponent from "@/Components/Container";
import MenuItemComponent from "@/Components/MenuItem";
import NavbarComponent from "@/Components/Navbar";
import { PageProps } from "@/types";
import { Menu } from "@/types/models";
import { Head } from "@inertiajs/react";

export default function Page(
  props: PageProps<{
    menus: Menu[];
  }>,
) {
  return (
    <>
      <Head title="Daftar Menu" />
      <NavbarComponent />
      <ContainerComponent>
        <div className="pt-24 pb-8">
          <div className="space-y-2">
            <p className="text-3xl font-semibold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-teal-600 from-primary">
                HutamaResto:
              </span>{" "}
              Temukan Kelezatan dengan Menjelajahi Semua Pilihan Hidangan
            </p>
            <p className="text-muted-foreground">
              Di sini, Anda dapat menemukan berbagai hidangan lezat yang
              disajikan dengan bahan-bahan berkualitas terbaik untuk memuaskan
              selera Anda. Selamat menikmati pengalaman kuliner yang tak
              terlupakan di restoran kami.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-8">
            {props.menus.map((menu, index) => (
              <MenuItemComponent key={"menu-item-" + index} menu={menu} />
            ))}
          </div>
        </div>
      </ContainerComponent>
    </>
  );
}

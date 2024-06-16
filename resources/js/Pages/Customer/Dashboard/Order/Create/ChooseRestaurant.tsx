import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { PageProps } from "@/types";
import { Franchise } from "@/types/models";
import { Head, Link } from "@inertiajs/react";
import { Utensils } from "lucide-react";

export default function Page(
  props: PageProps<{
    franchises: Franchise[];
  }>
) {
  return (
    <>
      <Head title="Dashboard: Buat pesanan" />

      <DashboardCustomerLayout>
        <div className="py-8 pr-2">
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("dashboard") },
              { title: "Pesanan saya", href: route("dashboard.order") },
              { title: "Buat pesanan (pilih restoran)" },
            ]}
          />

          <p className="font-semibold text-2xl mt-4">Pilih Restoran</p>
          <p>
            Jelajahi berbagai lokasi kami di seluruh negeri dan nikmati
            kelezatan di setiap sudut kota
          </p>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {props.franchises.map((franchise, index) => (
              <Card
                key={"franchise-item-" + index}
                className="overflow-hidden flex flex-col"
              >
                <img
                  src="https://images.unsplash.com/photo-1632181933699-d45280e5c7de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="h-40 w-full object-cover"
                />

                <CardHeader className="p-4 flex-1">
                  <CardTitle className="text-lg">{franchise.name}</CardTitle>
                  <CardDescription>{franchise.address}</CardDescription>
                </CardHeader>

                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" variant={"outline"} asChild>
                    <Link
                      href={route("dashboard.order.create.chooseMenu", {
                        franchiseId: franchise.id,
                      })}
                    >
                      <Utensils className="w-4 h-4 mr-2" />
                      Lihat menu
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </DashboardCustomerLayout>
    </>
  );
}

import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Franchise } from "@/types/models";
import { Head, Link } from "@inertiajs/react";
import { Utensils } from "lucide-react";

export default function Page(
  props: PageProps<{
    franchises: Franchise[];
  }>,
) {
  return (
    <>
      <Head title="Dashboard: Buat pesanan" />
      <DashboardCustomerLayout>
        <div>
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("dashboard") },
              { title: "Pesanan saya", href: route("dashboard.order") },
              { title: "Buat pesanan (pilih restoran)" },
            ]}
          />

          <div className="mt-4 space-y-2">
            <p className="font-semibold text-2xl">Pilih Restoran</p>
            <p className="text-muted-foreground">
              Jelajahi berbagai lokasi kami di seluruh negeri dan nikmati
              kelezatan di setiap sudut kota
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-8">
            {props.franchises.map((franchise, index) => (
              <Card
                key={"franchise-item-" + index}
                className="overflow-hidden flex flex-col"
              >
                <img
                  src={franchise.image}
                  className={cn(
                    "h-40 w-full object-cover",
                    franchise.is_open === 0 && "grayscale",
                  )}
                />

                <CardHeader className="p-4 flex-1">
                  <Badge
                    className="w-fit"
                    variant={franchise.is_open === 0 ? "outline" : "default"}
                  >
                    {franchise.is_open === 0 ? "Tutup" : "Buka"}
                  </Badge>
                  <CardTitle className="text-lg">{franchise.name}</CardTitle>
                  <CardDescription>{franchise.address}</CardDescription>
                </CardHeader>

                <CardFooter className="p-4 pt-0">
                  {franchise.is_open === 0 ? (
                    <Button className="w-full" variant={"outline"} disabled>
                      <Utensils className="w-4 h-4 mr-2" />
                      Lihat menu
                    </Button>
                  ) : (
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
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </DashboardCustomerLayout>
    </>
  );
}

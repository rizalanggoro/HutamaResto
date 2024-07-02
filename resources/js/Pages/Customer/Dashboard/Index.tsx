import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { PageProps } from "@/types";
import { Menu, Order, OrderItem } from "@/types/models";
import { Head, Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { FormattedDate, FormattedNumber } from "react-intl";

export default function Page(
  props: PageProps<{
    ordersThisMonth: (Order & {
      order_items: (OrderItem & { menu: Menu })[];
    })[];
    orderDeliveringCount: number;
    orderWaitingPaymentCount: number;
  }>,
) {
  const totalSpent = props.ordersThisMonth.reduce(
    (prev, curr) =>
      prev +
      curr.order_items.reduce(
        (prev, curr) => prev + curr.count * curr.menu.price,
        0,
      ),
    0,
  );

  return (
    <>
      <Head title="Halaman Utama" />
      <DashboardCustomerLayout>
        <div>
          <BreadcrumbComponent items={[{ title: "Halaman utama" }]} />
          <div className="mt-4 space-y-2">
            <p className="font-semibold text-2xl">
              Halo, {props.auth.user.name}!
            </p>
            <p className="text-muted-foreground">
              Berikut beberapa ringkasan terkait pesanan dan pengiriman untuk
              memudahkan Anda dalam mengakses semua informasi secara cepat
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {props.ordersThisMonth.length} selesai
                  </CardTitle>
                  <CardDescription>
                    Anda sudah melakukan sebanyak {props.ordersThisMonth.length}{" "}
                    pesanan selama bulan ini, selamat menikmati hidangan favorit
                    Anda di restoran kami!
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-end">
                  <Button variant={"link"} className="p-0" asChild>
                    <Link href={route("dashboard.order", { status: "done" })}>
                      Lihat detail
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {props.orderWaitingPaymentCount} pembayaran
                  </CardTitle>
                  <CardDescription>
                    Anda memiliki {props.orderWaitingPaymentCount} pesanan yang
                    menunggu untuk pembayaran. Segera lakukan pembayaran agar
                    pesanan tersebut dapat segera diproses.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-end">
                  <Button variant={"link"} className="p-0" asChild>
                    <Link
                      href={route("dashboard.order", {
                        status: "waiting_payment",
                      })}
                    >
                      Lakukan pembayaran
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="flex flex-col gap-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {props.orderDeliveringCount} pengantaran
                  </CardTitle>
                  <CardDescription>
                    {props.orderDeliveringCount} pesanan sedang dalam proses
                    pengantaran menuju alamat Anda. {props.auth.user.address}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-end">
                  <Button variant={"link"} className="p-0" asChild>
                    <Link
                      href={route("dashboard.order", { status: "delivering" })}
                    >
                      Lihat detail
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Label>
                    <FormattedDate
                      value={new Date()}
                      month="long"
                      year="numeric"
                    />
                  </Label>
                  <CardTitle className="text-2xl">
                    <FormattedNumber
                      style="currency"
                      currency="IDR"
                      value={totalSpent}
                    />
                  </CardTitle>
                  <CardDescription>
                    Anda telah mengeluarkan uang sebesar{" "}
                    <span>
                      <FormattedNumber
                        style="currency"
                        currency="IDR"
                        value={totalSpent}
                      />
                    </span>{" "}
                    selama bulan ini untuk berbagai pesanan di HutamaResto
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </DashboardCustomerLayout>
    </>
  );
}

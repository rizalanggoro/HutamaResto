import BreadcrumbComponent from "@/Components/Breadcrumb";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { PageProps } from "@/types";
import { Franchise, Menu, Order, OrderItem } from "@/types/models";
import { Head } from "@inertiajs/react";
import { FormattedDate, FormattedNumber } from "react-intl";

export default function Page(
  props: PageProps<{
    order: Order & {
      franchise: Franchise;
      order_items: (OrderItem & {
        menu: Menu;
      })[];
    };
  }>,
) {
  return (
    <>
      <Head title="Detail Pesanan" />
      <DashboardCustomerLayout>
        <div className="max-w-lg">
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("dashboard") },
              { title: "Pesanan saya", href: route("dashboard.order") },
              { title: "Detail pesanan" },
            ]}
          />
          <div className="mt-4 space-y-2">
            <p className="font-semibold text-2xl">Detail Pesanan</p>
            <p className="text-muted-foreground">
              Berikut detail informasi dari pesanan yang Anda lakukan
            </p>
          </div>

          <Card className="mt-8 overflow-hidden">
            <CardHeader className="bg-muted/70">
              <CardTitle className="text-lg">
                {props.order.franchise.name}
              </CardTitle>
              <CardDescription>
                <FormattedDate
                  value={props.order.created_at}
                  dateStyle="full"
                />
              </CardDescription>
            </CardHeader>

            <div className="p-6 space-y-2">
              <div className="text-sm flex items-center justify-between">
                <Label>Jenis pemesanan</Label>
                <p className="text-muted-foreground">
                  {props.order.type === "dine-in"
                    ? "Makan di tempat"
                    : "Pesan antar"}
                </p>
              </div>
              <div>
                <Label>Pesan tambahan</Label>
                <p className="text-sm text-muted-foreground">
                  {props.order.message ?? "Tidak ada"}
                </p>
              </div>
            </div>

            <Separator />

            <div className="p-6">
              <Label className="font-semibold">Detail Pesanan</Label>
              <div className="flex flex-col gap-2 mt-4">
                {props.order.order_items.map((orderItem, index) => (
                  <div
                    key={"chosen-menu-item-" + index}
                    className="flex items-center"
                  >
                    <div className="flex-1 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {orderItem.menu.name} x {orderItem.count}
                      </p>
                      <p className="text-sm text-foreground font-medium">
                        <FormattedNumber
                          value={orderItem.menu.price * orderItem.count}
                          style="currency"
                          currency="IDR"
                        />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <Label>Total</Label>
                <p className="text-sm font-medium">
                  <FormattedNumber
                    value={props.order.order_items.reduce(
                      (prev, curr) => prev + curr.menu.price * curr.count,
                      0,
                    )}
                    style="currency"
                    currency="IDR"
                  />
                </p>
              </div>
            </div>

            <Separator />

            <div className="p-6">
              <Label>Informasi Pemesan</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <p>Nama</p>
                  <p className="text-foreground font-medium">
                    {props.auth.user.name}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <p>Email</p>
                  <p className="text-foreground font-medium">
                    {props.auth.user.email}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <p>Alamat</p>
                  <p className="text-foreground font-medium">
                    {props.auth.user.address}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </DashboardCustomerLayout>
    </>
  );
}

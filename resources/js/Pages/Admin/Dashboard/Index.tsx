import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import useServerPooling from "@/Hooks/server-pooling";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { PageProps } from "@/types";
import { Franchise } from "@/types/models";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChevronRight, Loader2 } from "lucide-react";
import { FormattedDate, FormattedNumber } from "react-intl";

export default function Page(
  props: PageProps<{
    franchise: Franchise;
    orderWaitingPaymentVerificationCount: number;
    orderProcessingCount: number;
    income: number | undefined;
  }>,
) {
  useServerPooling();
  const formUpdateOpen = useForm();

  return (
    <>
      <Head title="Halaman Utama" />
      <DashboardAdminLayout>
        <div>
          <BreadcrumbComponent items={[{ title: "Halaman utama" }]} />

          <p className="text-2xl font-semibold mt-4">
            Halo, {props.auth.user.name}
          </p>
          <p className="text-muted-foreground mt-2">
            Berikut adalah beberapa ringkasan singkat mengenai berbagai aspek
            pengelolaan restoran yang Anda kelola:{" "}
            <span className="font-medium">{props.franchise.name}</span>
          </p>

          <div className="flex gap-2 mt-8">
            {/* grid left */}
            <div className="flex flex-col flex-1 gap-2">
              <Card>
                <CardHeader className="space-y-4">
                  <Label>Profile restoran Anda</Label>
                  <div className="flex items-center gap-4">
                    <img
                      src={props.franchise.image}
                      className="w-32 object-cover h-24 rounded"
                    />
                    <div>
                      <p className="font-semibold text-lg">
                        {props.franchise.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {props.franchise.address}
                      </p>
                      <Badge
                        className="mt-2"
                        variant={
                          props.franchise.is_open === 0 ? "outline" : "default"
                        }
                      >
                        {props.franchise.is_open === 0 ? "Tutup" : "Buka"}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant={"outline"}
                    disabled={formUpdateOpen.processing}
                    onClick={() =>
                      formUpdateOpen.patch(
                        route("admin.dashboard.updateOpenStatus"),
                      )
                    }
                  >
                    {formUpdateOpen.processing && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    {props.franchise.is_open === 1
                      ? "Tutup restoran"
                      : "Buka restoran"}
                  </Button>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {props.orderProcessingCount} pesanan
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Restoran Anda sedang memproses{" "}
                    {props.orderWaitingPaymentVerificationCount} pesanan untuk
                    segera diselesaikan dan disajikan kepada customer
                  </p>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button variant={"link"} asChild className="px-0">
                    <Link href={route("admin.dashboard.order")}>
                      Lihat pesanan
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* grid right */}
            <div className="flex flex-col flex-1 gap-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {props.orderWaitingPaymentVerificationCount} verifikasi
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Restoran Anda memiliki{" "}
                    {props.orderWaitingPaymentVerificationCount} pembayaran yang
                    menunggu untuk proses verifikasi agar dapat segera diproses
                  </p>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button variant={"link"} asChild className="px-0">
                    <Link
                      href={route("admin.dashboard.order.paymentVerification")}
                    >
                      Lakukan verifikasi
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <FormattedNumber
                      value={props.income ?? 0}
                      style="currency"
                      currency="IDR"
                    />
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Restoran yang Anda kelola menghasilkan pendapatan sebesar{" "}
                    <span>
                      <FormattedNumber
                        value={props.income ?? 0}
                        style="currency"
                        currency="IDR"
                      />
                    </span>{" "}
                    selama bulan{" "}
                    <span>
                      <FormattedDate
                        value={new Date()}
                        month="long"
                        year="numeric"
                      />
                    </span>
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </DashboardAdminLayout>
    </>
  );
}

import BreadcrumbComponent from "@/Components/Breadcrumb";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import DashboardSuperAdminLayout from "@/Layouts/DashboardSuperAdmin";
import { PageProps } from "@/types";
import { Franchise } from "@/types/models";
import { Head } from "@inertiajs/react";
import { FormattedDate, FormattedNumber } from "react-intl";

export default function Page(
  props: PageProps<{
    franchiseCount: number;
    orderCount: number;
    franchiseIncomes: (Franchise & { income: number })[];
  }>,
) {
  return (
    <>
      <Head title="Halaman Utama" />
      <DashboardSuperAdminLayout>
        <div>
          <BreadcrumbComponent items={[{ title: "Halaman utama" }]} />

          <div className="mt-4 space-y-2">
            <p className="font-semibold text-2xl">
              Halo, {props.auth.user.name}!
            </p>
            <p className="text-muted-foreground">
              Berikut adalah beberapa ringkasan singkat mengenai berbagai aspek
              pengelolaan waralaba HutamaResto
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-8">
            <div className="flex flex-col gap-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {props.franchiseCount} waralaba
                  </CardTitle>
                  <CardDescription>
                    Restoran HutamaResto memiliki sebanyak{" "}
                    {props.franchiseCount} waralaba di seluruh wilayah Indonesia
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {props.orderCount} pesanan
                  </CardTitle>
                  <CardDescription>
                    Seluruh waralaba HutamaResto memiliki total{" "}
                    {props.orderCount} pesanan selama bulan{" "}
                    <span>
                      <FormattedDate
                        value={new Date()}
                        month="long"
                        year="numeric"
                      />
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="flex flex-col gap-2">
              <Card>
                <CardHeader className="space-y-4">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">
                      <FormattedNumber
                        value={props.franchiseIncomes.reduce(
                          (prev, curr) => prev + curr.income,
                          0,
                        )}
                        style="currency"
                        currency="IDR"
                      />
                    </CardTitle>
                    <CardDescription>
                      Seluruh waralaba HutamaResto mendapatkan pemasukan sebesar{" "}
                      <span>
                        <FormattedNumber
                          value={props.franchiseIncomes.reduce(
                            (prev, curr) => prev + curr.income,
                            0,
                          )}
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
                    </CardDescription>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    {props.franchiseIncomes.map((item, index) => (
                      <div
                        key={"franchise-income-" + index}
                        className="grid grid-cols-12"
                      >
                        <div className="space-y-1 col-span-8">
                          <p className="font-medium">{item.name}</p>
                          {/* <p className="font-medium text-sm text-muted-foreground line-clamp-2">
                            {item.address}
                          </p> */}
                        </div>
                        <div className="col-span-4 flex items-center justify-end">
                          <Label>
                            <FormattedNumber
                              value={item.income}
                              style="currency"
                              currency="IDR"
                            />
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </DashboardSuperAdminLayout>
    </>
  );
}

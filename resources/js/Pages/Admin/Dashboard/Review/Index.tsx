import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Card, CardHeader } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Progress } from "@/Components/ui/progress";
import { Separator } from "@/Components/ui/separator";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Review, User } from "@/types/models";
import { Head } from "@inertiajs/react";
import { Star } from "lucide-react";
import { FormattedDate, FormattedNumber } from "react-intl";

export default function Page(
  props: PageProps<{
    reviews: (Review & { user: User })[];
  }>,
) {
  return (
    <>
      <Head title="Daftar Ulasan" />
      <DashboardAdminLayout>
        <div className="max-w-lg">
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Daftar ulasan" },
            ]}
          />

          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold">Daftar Ulasan</p>
            <p className="text-muted-foreground">
              Pantau dan tindak lanjuti setiap ulasan dari pelanggan secara
              cepat untuk memastikan peningkatan kualitas pelayanan di restoran
              yang Anda kelola
            </p>
          </div>

          <div className="mt-8 flex items-center max-w-xs gap-8">
            <p className="text-5xl font-semibold">
              <FormattedNumber
                minimumFractionDigits={1}
                maximumFractionDigits={1}
                value={
                  (props.reviews.reduce((prev, curr) => prev + curr.star, 0) /
                    (props.reviews.length * 5)) *
                  5
                }
              />
            </p>
            <div className="w-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={"star-line-" + index}>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium w-4">{5 - index}</p>
                    <Progress
                      value={
                        (props.reviews.filter((it) => it.star === 5 - index)
                          .length /
                          props.reviews.length) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-8">
            {props.reviews.map((review, index) => (
              <Card key={"review-item-" + index}>
                <CardHeader className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={"star-item-" + index}
                            className={cn(
                              "w-4 h-4",
                              index < review.star
                                ? "text-primary"
                                : "text-muted-foreground/40",
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-xs">
                        <FormattedDate
                          value={review.created_at}
                          dateStyle="full"
                        />
                      </p>
                    </div>
                    <p>{review.review}</p>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-xs">{review.user.name}</Label>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </DashboardAdminLayout>
    </>
  );
}

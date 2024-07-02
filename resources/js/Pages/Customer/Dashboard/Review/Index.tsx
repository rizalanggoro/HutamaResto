import BreadcrumbComponent from "@/Components/Breadcrumb";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Franchise, Review } from "@/types/models";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { ChevronRight, Edit2, Loader2, Star, Trash } from "lucide-react";
import { useState } from "react";
import { FormattedDate } from "react-intl";

export default function Page(
  props: PageProps<{
    reviews: (Review & { franchise: Franchise })[];
  }>,
) {
  const [selectedReview, setSelectedReview] = useState<Review>();
  const [isDialogConfirmDeleteReviewOpen, setIsDialogConfirmDeleteReviewOpen] =
    useState(false);
  const formDeleteReview = useForm();

  return (
    <>
      <Head title="Ulasan Saya" />
      <DashboardCustomerLayout>
        <div className="max-w-lg">
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("dashboard") },
              { title: "Ulasan saya" },
            ]}
          />
          <div className="mt-4 space-y-2">
            <p className="font-semibold text-2xl">Ulasan Saya</p>
            <p className="text-muted-foreground">
              Berikut beberapa ulasan yang dikirimkan sebagai respon terhadap
              pesanan yang Anda buat
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-8">
            {props.reviews.map((review, index) => (
              <Card key={"review-item-" + index}>
                <CardHeader className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index2) => (
                          <Star
                            key={"star-item-" + index + index2}
                            className={cn(
                              "w-4 h-4",
                              index2 < review.star
                                ? "text-primary"
                                : "text-muted-foreground/40",
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-xs font-medium">
                        <FormattedDate
                          value={review.created_at}
                          dateStyle="full"
                        />
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-foreground flex-1">{review.review}</p>
                      <div className="flex gap-1">
                        <Button
                          size={"icon"}
                          variant={"outline"}
                          className="h-8 w-8"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size={"icon"}
                          variant={"destructive"}
                          className="h-8 w-8"
                          onClick={() => {
                            setSelectedReview(review);
                            setIsDialogConfirmDeleteReviewOpen(true);
                          }}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />
                  <div className="flex justify-between items-center">
                    <Label className="text-xs">{review.franchise.name}</Label>
                    <Button
                      variant={"link"}
                      className="text-xs p-0 m-0 h-fit"
                      asChild
                    >
                      <Link
                        href={route("dashboard.order.detail", {
                          id: review.order_id,
                        })}
                      >
                        Lihat pesanan
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </DashboardCustomerLayout>

      <AlertDialog
        open={isDialogConfirmDeleteReviewOpen}
        onOpenChange={(e) => setIsDialogConfirmDeleteReviewOpen(e)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin akan menghapus ulasan ini? Tindakan Anda tidak
              dapat dipulihkan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <Button
              disabled={formDeleteReview.processing}
              variant={"destructive"}
              onClick={() =>
                formDeleteReview.delete(
                  route("dashboard.review.delete", { id: selectedReview?.id }),
                  {
                    onSuccess: () => {
                      setIsDialogConfirmDeleteReviewOpen(false);
                      router.reload();
                    },
                  },
                )
              }
            >
              {formDeleteReview.processing && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

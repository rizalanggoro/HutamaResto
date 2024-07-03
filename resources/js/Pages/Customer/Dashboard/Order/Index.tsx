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
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Textarea } from "@/Components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import useServerPooling from "@/Hooks/server-pooling";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Franchise, Menu, Order, OrderItem } from "@/types/models";
import { orderStatuses } from "@/types/order-status";
import { Head, Link, router, useForm } from "@inertiajs/react";
import {
  Eye,
  Loader2,
  MessageSquare,
  PenLine,
  Send,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { FormattedNumber } from "react-intl";

type OrderType = Order & {
  franchise: Franchise;
  order_items: (OrderItem & { menu: Menu })[];
  reviews_count: number;
};

export default function Page(
  props: PageProps<{
    orders: OrderType[];
  }>,
) {
  useServerPooling();

  const [selectedOrder, setSelectedOrder] = useState<OrderType>();
  const [isDialogUploadReceiptOpen, setIsDialogUploadReceiptOpen] =
    useState(false);
  const [isDialogConfirmDeleteOrderOpen, setIsDialogConfirmDeleteOrderOpen] =
    useState(false);
  const [isDialogCreateReviewOpen, setIsDialogCreateReviewOpen] =
    useState(false);

  const formCreateReview = useForm({
    star: 5,
    review: "",
    orderId: -1,
    franchiseId: -1,
  });

  const { data, setData, post, processing } = useForm({
    orderId: -1,
    receipt: null as File | null,
  });
  const onClickButtonUploadReceipt = () => {
    if (data.orderId !== -1 && data.receipt) {
      post(route("dashboard.payment.uploadReceipt"), {
        onSuccess: () => {
          router.reload();
          setSelectedOrder(undefined);
          setIsDialogUploadReceiptOpen(false);
          setData({ orderId: -1, receipt: null });
        },
      });
    }
  };

  const formDeleteOrder = useForm();
  const onClickButtonDeleteOrder = () =>
    formDeleteOrder.delete(
      route("dashboard.order.delete", {
        id: selectedOrder?.id,
      }),
      {
        onFinish: () => {
          setSelectedOrder(undefined);
          setIsDialogConfirmDeleteOrderOpen(false);
        },
      },
    );

  return (
    <>
      <Head title="Pesanan Saya" />
      <DashboardCustomerLayout>
        <div>
          <BreadcrumbComponent
            items={[
              {
                title: "Halaman utama",
                href: route("dashboard"),
              },
              { title: "Pesanan saya" },
            ]}
          />
          <div>
            <p className="text-2xl font-semibold mt-4">Pesanan Saya</p>
            <p className="mt-2 text-muted-foreground">
              Kelola dan lacak status pesanan Anda dengan mudah. Dari dapur kami
              hingga meja Anda, kami pastikan setiap hidangan sampai dengan
              sempurna
            </p>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Select
              defaultValue={
                (route().params.status as string | undefined) ?? "all"
              }
              onValueChange={(e) =>
                router.reload({
                  data: {
                    status: e === "all" ? undefined : e,
                  },
                })
              }
            >
              <SelectTrigger className="max-w-72">
                <SelectValue placeholder="Lihat berdasarkan status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="waiting_payment">
                  Menunggu pembayaran
                </SelectItem>
                <SelectItem value="waiting_payment_verification">
                  Menunggu verifikasi pembayaran
                </SelectItem>
                <SelectItem value="processing">Sedang diproses</SelectItem>
                <SelectItem value="delivering">Dalam pengantaran</SelectItem>
                <SelectItem value="done">Selesai</SelectItem>
              </SelectContent>
            </Select>

            <Button asChild variant={"outline"}>
              <Link href={route("dashboard.order.create.chooseRestaurant")}>
                <PenLine className="w-4 h-4 mr-2" />
                Baru
              </Link>
            </Button>
          </div>

          <Card className="mt-4 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/70">
                <TableRow>
                  <TableHead>Nama Resto</TableHead>
                  <TableHead>Total Menu</TableHead>
                  <TableHead>Total Harga</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              {props.orders.length === 0 && (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
              {props.orders.length > 0 && (
                <TableBody>
                  {props.orders.map((order, index) => (
                    <TableRow key={"order-item-" + index}>
                      <TableCell className="space-y-1">
                        <p className="font-medium">{order.franchise.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {order.type === "dine-in"
                            ? "Makan di tempat"
                            : "Pesan antar"}
                        </p>
                      </TableCell>
                      <TableCell>
                        {order.order_items.reduce(
                          (prev, curr) => prev + curr.count,
                          0,
                        )}{" "}
                        menu
                      </TableCell>
                      <TableCell>
                        <FormattedNumber
                          value={order.order_items.reduce(
                            (prev, curr) => prev + curr.count * curr.menu.price,
                            0,
                          )}
                          style="currency"
                          currency="IDR"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant={"outline"} className="lowercase">
                          {orderStatuses[order.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-1 items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button asChild variant={"outline"} size={"icon"}>
                              <Link
                                href={route("dashboard.order.detail", {
                                  id: order.id,
                                })}
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Lihat detail pemesanan</p>
                          </TooltipContent>
                        </Tooltip>

                        {order.status === "waiting_payment" && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={"outline"}
                                size={"icon"}
                                onClick={() => {
                                  setIsDialogUploadReceiptOpen(true);
                                  setSelectedOrder(order);
                                  setData({ ...data, orderId: order.id });
                                }}
                              >
                                <Upload className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Unggah bukti pembayaran</p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {order.status === "waiting_payment" && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={"destructive"}
                                size={"icon"}
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setIsDialogConfirmDeleteOrderOpen(true);
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Batalkan pemesanan</p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {order.status === "done" &&
                          order.reviews_count === 0 && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  size={"icon"}
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setIsDialogCreateReviewOpen(true);
                                    formCreateReview.setData({
                                      franchiseId: order.franchise.id,
                                      orderId: order.id,
                                      review: "",
                                      star: 5,
                                    });
                                  }}
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Berikan ulasan</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </Card>
        </div>
      </DashboardCustomerLayout>

      {/* dialog create review */}
      <Dialog
        open={isDialogCreateReviewOpen}
        onOpenChange={(e) => setIsDialogCreateReviewOpen(e)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Berikan Ulasan</DialogTitle>
            <DialogDescription>
              Berikan ulasan sebagai bentuk respon terhadap pesanan yang sudah
              Anda buat
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Masukkan ulasan</Label>
              <Textarea
                className="h-48 resize-none"
                value={formCreateReview.data.review}
                onChange={(e) =>
                  formCreateReview.setData({
                    ...formCreateReview.data,
                    review: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  onClick={() =>
                    formCreateReview.setData({
                      ...formCreateReview.data,
                      star: index + 1,
                    })
                  }
                  className={cn(
                    "w-6 h-6",
                    index < formCreateReview.data.star
                      ? "text-primary"
                      : "text-muted-foreground/40",
                  )}
                  key={"star-item-" + index}
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                formCreateReview.post(route("dashboard.review"), {
                  onSuccess: () => router.reload(),
                  onFinish: () => {
                    formCreateReview.reset();
                    setIsDialogCreateReviewOpen(false);
                  },
                });
              }}
              disabled={formCreateReview.processing}
            >
              {formCreateReview.processing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Kirim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* dialog upload receipt */}
      <Dialog
        open={isDialogUploadReceiptOpen}
        onOpenChange={(e) => {
          if (!processing) setIsDialogUploadReceiptOpen(e);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unggah Bukti Pembayaran</DialogTitle>
            <DialogDescription>
              Unggah bukti pembayaran untuk{" "}
              <span className="font-semibold">
                {selectedOrder?.franchise.name ?? "-"}
              </span>
              . Bukti pembayaran dapat berupa screenshot transfer atau yang
              lainnya. Pembayaran dapat ditransfer ke rekening{" "}
              <span className="font-semibold">1182-9812-9182-7643</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="receipt">Bukti pembayaran</Label>
            <Input
              className="file:text-foreground"
              id="receipt"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  const file = files[0];
                  setData({ ...data, receipt: file });
                }
              }}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button onClick={onClickButtonUploadReceipt} disabled={processing}>
              {processing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              {processing ? "Mengunggah" : "Unggah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* dialog confirm delete order */}
      <AlertDialog
        open={isDialogConfirmDeleteOrderOpen}
        onOpenChange={(e) => setIsDialogConfirmDeleteOrderOpen(e)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Pembatalan Pesanan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin akan membatalkan pemesanan menu dari{" "}
              {selectedOrder?.franchise.name ?? "-"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={formDeleteOrder.processing}>
              Tidak
            </AlertDialogCancel>
            <Button
              variant={"destructive"}
              onClick={onClickButtonDeleteOrder}
              disabled={formDeleteOrder.processing}
            >
              {formDeleteOrder.processing && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Ya, batalkan
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

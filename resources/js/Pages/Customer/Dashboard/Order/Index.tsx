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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import useServerPooling from "@/Hooks/server-pooling";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { PageProps } from "@/types";
import { Franchise, Order } from "@/types/models";
import { orderStatuses } from "@/types/order-status";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Eye, Loader2, PenLine, Trash2, Upload } from "lucide-react";
import { useState } from "react";

type OrderType = Order & { franchise: Franchise };

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
                  <TableHead>No</TableHead>
                  <TableHead>Nama Resto</TableHead>
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
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{order.franchise.name}</TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </Card>
        </div>
      </DashboardCustomerLayout>

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
              lainnya
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

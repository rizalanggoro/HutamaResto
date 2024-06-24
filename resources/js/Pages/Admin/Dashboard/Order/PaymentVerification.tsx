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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { PageProps } from "@/types";
import { Order, User } from "@/types/models";
import { Head, router, useForm } from "@inertiajs/react";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

type OrderItem = Order & { user: User };

export default function Page(
  props: PageProps<{
    orders: OrderItem[];
  }>,
) {
  const [isDialogConfirmPaymentOpen, setIsDialogConfirmPaymentOpen] =
    useState(false);
  const [selectedOrder, setSelectedOrder] = useState<
    OrderItem & { number: number }
  >();

  const formVerify = useForm();
  const onClickButtonVerify = () => {
    formVerify.patch(
      route("admin.dashboard.order.verifyPayment", {
        orderId: selectedOrder?.id,
      }),
      {
        onSuccess: () => router.reload(),
        onFinish: () => {
          setIsDialogConfirmPaymentOpen(false);
          setSelectedOrder(undefined);
        },
      },
    );
  };

  return (
    <>
      <Head title="Verifikasi Pembayaran" />

      <DashboardAdminLayout>
        <div className="py-8 pr-2">
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Daftar pesanan", href: route("admin.dashboard.order") },
              { title: "Verifikasi pembayaran" },
            ]}
          />
          <p className="text-2xl font-semibold mt-4">Verifikasi Pembayaran</p>
          <p>
            Berikut adalah beberapa pesanan yang telah masuk dan saat ini
            menunggu konfirmasi pembayaran
          </p>

          <Table className="mt-8">
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Pemesan</TableHead>
                <TableHead>Total Harga</TableHead>
                <TableHead>Bukti Pembayaran</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.orders.map((order, index) => (
                <TableRow key={"order-item-" + index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>masih blom ada</TableCell>
                  <TableCell>sama aja blom ada</TableCell>
                  <TableCell>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => {
                        setIsDialogConfirmPaymentOpen(true);
                        setSelectedOrder({ ...order, number: index + 1 });
                      }}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DashboardAdminLayout>

      {/* dialog confirm payment verification */}
      <AlertDialog
        open={isDialogConfirmPaymentOpen}
        onOpenChange={(e) => setIsDialogConfirmPaymentOpen(e)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Pembayaran</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin akan memverifikasi pembayaran{" "}
              <span className="font-semibold">
                nomor {selectedOrder?.number ?? -1}
              </span>{" "}
              atas nama{" "}
              <span className="font-semibold">
                {selectedOrder?.user.name ?? "-"}
              </span>{" "}
              dengan nominal <span className="font-semibold">blom ada</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={formVerify.processing}>
              Batal
            </AlertDialogCancel>
            <Button
              onClick={onClickButtonVerify}
              disabled={formVerify.processing}
            >
              {formVerify.processing && (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              )}
              Verifikasi
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

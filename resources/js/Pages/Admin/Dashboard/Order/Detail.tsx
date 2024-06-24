import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Checkbox } from "@/Components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { PageProps } from "@/types";
import { Menu, Order, OrderItem, User } from "@/types/models";
import { Head, router, useForm } from "@inertiajs/react";
import { CheckCheck } from "lucide-react";
import { useEffect } from "react";

export default function Page(
  props: PageProps<{
    order: Order & {
      user: User;
      order_items: (OrderItem & { menu: Menu })[];
    };
  }>,
) {
  const formUpdateIsDone = useForm({
    isDone: false,
    orderItemId: -1,
  });

  useEffect(() => {
    if (formUpdateIsDone.data.orderItemId !== -1) {
      formUpdateIsDone.patch(
        route("admin.dashboard.order.orderItem.updateIsDone", {
          orderItemId: formUpdateIsDone.data.orderItemId,
        }),
        { onSuccess: () => router.reload() },
      );
    }
  }, [formUpdateIsDone.data]);

  const formMarkAsDone = useForm();
  const onClickButtonMarkAsDone = () => {
    formMarkAsDone.patch(
      route("admin.dashboard.order.markAsDone", { orderId: props.order.id }),
      {
        onSuccess: () =>
          router.visit(route("admin.dashboard.order"), { replace: true }),
      },
    );
  };

  return (
    <>
      <Head title="Detail Pesanan" />

      <DashboardAdminLayout>
        <div>
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Daftar pesanan", href: route("admin.dashboard.order") },
              { title: "Detail pesanan" },
            ]}
          />
          <p className="text-2xl font-semibold mt-4">Detail Pesanan</p>
          <p className="mt-2">
            Berikut adalah daftar pesanan yang membutuhkan tindakan segera untuk
            memastikan semua pelanggan menerima layanan tepat waktu dan
            memuaskan.
          </p>

          <Card className="mt-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Menu</TableHead>
                  <TableHead>Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.order.order_items.map((orderItem, index) => (
                  <TableRow key={"order-item-" + index}>
                    <TableCell className="text-center px-0">
                      <Checkbox
                        checked={orderItem.is_done === 1}
                        onCheckedChange={() =>
                          formUpdateIsDone.setData({
                            isDone: orderItem.is_done === 1 ? false : true,
                            orderItemId: orderItem.id,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>{orderItem.menu.name}</TableCell>
                    <TableCell>{orderItem.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell>
                    {props.order.order_items.reduce(
                      (prev, curr) => prev + curr.count,
                      0,
                    )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Card>

          <div className="mt-4 flex justify-end">
            <Button onClick={onClickButtonMarkAsDone}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Selesaikan pesanan
            </Button>
          </div>
        </div>
      </DashboardAdminLayout>
    </>
  );
}

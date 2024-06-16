import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
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
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { orderStatuses } from "@/lib/order-status";
import { PageProps } from "@/types";
import { Franchise, Order } from "@/types/models";
import { Head, Link } from "@inertiajs/react";
import { Eye, PenLine, Trash2, Upload } from "lucide-react";

export default function Page(
  props: PageProps<{
    orders: (Order & {
      franchise: Franchise;
    })[];
  }>
) {
  return (
    <>
      <Head>
        <title>Dashboard: Pesanan saya</title>
      </Head>

      <DashboardCustomerLayout>
        <div className="py-8">
          <BreadcrumbComponent
            items={[
              {
                title: "Halaman utama",
                href: route("dashboard"),
              },
              { title: "Pesanan saya" },
            ]}
          />
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-semibold mt-4">Pesanan Saya</p>
              <p className="mt-2 text-muted-foreground">
                Kelola dan lacak status pesanan Anda dengan mudah. Dari dapur
                kami hingga meja Anda, kami pastikan setiap hidangan sampai
                dengan sempurna
              </p>
            </div>

            <Button asChild>
              <Link href={route("dashboard.order.create.chooseRestaurant")}>
                <PenLine className="w-4 h-4 mr-2" />
                Baru
              </Link>
            </Button>
          </div>

          <div className="mt-8">
            <Select>
              <SelectTrigger className="w-full">
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
          </div>

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Resto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.orders.map((order, index) => (
                <TableRow>
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
                              id_order: order.id,
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

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant={"outline"} size={"icon"}>
                          <Upload className="w4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Unggah bukti pembayaran</p>
                      </TooltipContent>
                    </Tooltip>

                    {order.status === "waiting_payment" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant={"destructive"} size={"icon"}>
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
          </Table>
        </div>
      </DashboardCustomerLayout>
    </>
  );
}

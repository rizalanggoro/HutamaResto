import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Separator } from "@/Components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Textarea } from "@/Components/ui/textarea";
import { useToast } from "@/Components/ui/use-toast";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Franchise, Menu } from "@/types/models";
import { Head, router, useForm } from "@inertiajs/react";
import { Loader2, Minus, Plus, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { FormattedDate, FormattedNumber } from "react-intl";

export default function Page(
  props: PageProps<{
    franchise: Franchise;
    menus: Menu[];
  }>,
) {
  const [selectedMenus, setSelectedMenus] = useState<
    (Menu & { count: number })[]
  >([]);
  const { toast } = useToast();

  const onClickMenuCounter = (menu: Menu, isIncrement: boolean) => {
    if (selectedMenus.findIndex((it) => it.id === menu.id) !== -1) {
      setSelectedMenus(
        [
          ...selectedMenus.map((it) => {
            if (it.id === menu.id) {
              return { ...it, count: it.count + (isIncrement ? 1 : -1) };
            }
            return it;
          }),
        ].filter((it) => it.count > 0),
      );
    } else {
      setSelectedMenus([...selectedMenus, { ...menu, count: 1 }]);
    }
  };

  const formOrder = useForm({
    franchiseId: props.franchise.id,
    orderItems: [] as { menuId: number; count: number }[],
    message: "",
    type: "dine-in",
  });

  useEffect(() => {
    formOrder.setData({
      ...formOrder.data,
      orderItems: selectedMenus.map((it) => ({
        menuId: it.id,
        count: it.count,
      })),
    });
  }, [selectedMenus]);

  const onClickButtonOrder = () =>
    formOrder.post(route("dashboard.order"), {
      onSuccess: () => router.replace(route("dashboard.order")),
      onError: (e) =>
        toast({
          title: "Terjadi Kesalahan!",
          description: String(e),
        }),
    });

  return (
    <>
      <Head title="Tambah Pesanan: Pilih Menu" />
      <DashboardCustomerLayout>
        <div>
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("dashboard") },
              { title: "Pesanan saya", href: route("dashboard.order") },
              { title: "Buat pesanan (pilih menu)" },
            ]}
          />

          <p className="font-semibold text-2xl mt-4">{props.franchise.name}</p>
          <p className="text-muted-foreground mt-2">
            Jelajahi beragam pilihan menu makanan dan minuman kami, dari
            hidangan utama hingga minuman menyegarkan. Temukan cita rasa favorit
            Anda di HutamaResto
          </p>

          <div className="grid grid-cols-12 gap-4 mt-8">
            <div className="col-span-7 flex flex-col gap-4">
              <Tabs
                defaultValue={
                  (route().params.filter as string | undefined) ?? "all"
                }
                onValueChange={(e) => {
                  router.reload({
                    data: {
                      type: e === "all" ? undefined : e,
                    },
                  });
                }}
              >
                <TabsList>
                  <TabsTrigger value="all">Semua</TabsTrigger>
                  <TabsTrigger value="food">Makanan</TabsTrigger>
                  <TabsTrigger value="beverage">Minuman</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-1 gap-2">
                {props.menus.map((menu, index) => (
                  <Card key={"menu-item-" + index}>
                    <div className="flex items-center">
                      <div className="bg-red-500 h-full w-32 rounded-md overflow-hidden m-4 mr-0">
                        <img
                          src={menu.image}
                          className={cn(
                            "h-full w-full object-cover",
                            menu.availability === 0 && "grayscale",
                          )}
                        />
                      </div>

                      <CardHeader className="flex-1 p-4 space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <p
                              className={cn(
                                "text-lg font-semibold",
                                menu.availability === 0 && "line-through",
                              )}
                            >
                              {menu.name}
                            </p>
                            <Badge
                              variant={
                                menu.availability === 0 ? "outline" : "default"
                              }
                            >
                              {menu.availability === 0
                                ? "Tidak tersedia"
                                : "Tersedia"}
                            </Badge>
                          </div>
                          <Label
                            className={cn(
                              menu.availability === 0 && "line-through",
                            )}
                          >
                            <FormattedNumber
                              value={menu.price}
                              style="currency"
                              currency="IDR"
                            />
                          </Label>
                          <p
                            className={cn(
                              "text-muted-foreground text-sm",
                              menu.availability === 0 && "line-through",
                            )}
                          >
                            {menu.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Jumlah</Label>
                          <div className="flex items-center select-none">
                            <Button
                              disabled={
                                selectedMenus.findIndex(
                                  (it) => it.id === menu.id,
                                ) === -1 || menu.availability === 0
                              }
                              variant={
                                selectedMenus.findIndex(
                                  (it) => it.id === menu.id,
                                ) === -1
                                  ? "outline"
                                  : "secondary"
                              }
                              size={"icon"}
                              onClick={() => onClickMenuCounter(menu, false)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              className="hover:bg-transparent cursor-default"
                            >
                              {selectedMenus.find((it) => it.id === menu.id)
                                ?.count ?? 0}
                            </Button>
                            <Button
                              disabled={menu.availability === 0}
                              variant={
                                menu.availability === 0
                                  ? "outline"
                                  : "secondary"
                              }
                              size={"icon"}
                              onClick={() => onClickMenuCounter(menu, true)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="col-span-5 relative">
              <Card className="sticky top-8 bottom-8">
                <CardHeader className="bg-muted/70">
                  <CardTitle className="text-xl">Pesanan Saya</CardTitle>
                  <CardDescription>
                    <FormattedDate value={new Date()} dateStyle="full" />
                  </CardDescription>
                </CardHeader>

                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-muted-foreground">Jenis pemesanan</p>
                    <Select
                      defaultValue={formOrder.data.type}
                      onValueChange={(e) =>
                        formOrder.setData({ ...formOrder.data, type: e })
                      }
                    >
                      <SelectTrigger className="flex-1 max-w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dine-in">Makan di tempat</SelectItem>
                        <SelectItem value="delivery-order">
                          Pesan antar
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Pesan Tambahan</Label>
                    <Textarea
                      className="resize-none"
                      value={formOrder.data.message}
                      onChange={(e) =>
                        formOrder.setData({
                          ...formOrder.data,
                          message: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <Separator />

                {selectedMenus.length > 0 && (
                  <>
                    <div className="p-6">
                      <Label className="font-semibold">Detail Pesanan</Label>
                      <div className="flex flex-col gap-2 mt-4">
                        {selectedMenus.map((menu, index) => (
                          <div
                            key={"chosen-menu-item-" + index}
                            className="flex items-center"
                          >
                            <div className="flex-1 flex items-center justify-between">
                              <p className="text-sm text-muted-foreground">
                                {menu.name} x {menu.count}
                              </p>
                              <p className="text-sm text-foreground font-medium">
                                <FormattedNumber
                                  value={menu.price * menu.count}
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
                            value={selectedMenus.reduce(
                              (prev, curr) => prev + curr.price * curr.count,
                              0,
                            )}
                            style="currency"
                            currency="IDR"
                          />
                        </p>
                      </div>
                    </div>

                    <Separator />
                  </>
                )}

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

                <CardFooter>
                  <div className="flex-1">
                    <Button
                      onClick={() => onClickButtonOrder()}
                      className="w-full mt-4"
                      disabled={
                        selectedMenus.length === 0 || formOrder.processing
                      }
                    >
                      {formOrder.processing ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      Pesan sekarang
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </DashboardCustomerLayout>
    </>
  );
}

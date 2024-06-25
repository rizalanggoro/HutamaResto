import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useToast } from "@/Components/ui/use-toast";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { PageProps } from "@/types";
import { Franchise, Menu } from "@/types/models";
import { Head, router, useForm } from "@inertiajs/react";
import { Loader2, Minus, Plus, Send, Trash2 } from "lucide-react";
import { useState } from "react";

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

  const onClickDeleteSelectedMenu = (menuId: number) => {
    setSelectedMenus((prev) => prev.filter((it) => it.id !== menuId));
  };

  const formOrder = useForm({
    franchiseId: props.franchise.id,
    orderItems: [] as { menuId: number; count: number }[],
  });
  const onClickButtonOrder = () => {
    formOrder.setData({
      ...formOrder.data,
      orderItems: selectedMenus.map((it) => ({
        menuId: it.id,
        count: it.count,
      })),
    });
    formOrder.post(route("dashboard.order"), {
      onSuccess: () => router.replace(route("dashboard.order")),
      onError: (e) =>
        toast({
          title: "Terjadi Kesalahan!",
          description: String(e),
        }),
    });
  };

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
            <div className="col-span-8 flex flex-col gap-4">
              <Tabs
                defaultValue={
                  (route().params.filter as string | undefined) ?? "all"
                }
                onValueChange={(e) => {
                  router.reload({
                    data: {
                      filter: e === "all" ? undefined : e,
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

              {props.menus.map((menu, index) => (
                <div
                  className="flex items-center gap-4"
                  key={"menu-item-" + index}
                >
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="h-24 w-32 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="text-lg font-semibold">{menu.name}</p>
                    <p>{menu.description}</p>
                    <div className="flex items-center justify-between">
                      <p>Jumlah pesanan</p>
                      <div className="flex items-center">
                        <Button
                          disabled={
                            selectedMenus.findIndex(
                              (it) => it.id === menu.id,
                            ) === -1
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
                        <Button variant={"ghost"} size={"icon"}>
                          {selectedMenus.find((it) => it.id === menu.id)
                            ?.count ?? 0}
                        </Button>
                        <Button
                          variant={"secondary"}
                          size={"icon"}
                          onClick={() => onClickMenuCounter(menu, true)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-4 relative">
              <Card className="sticky top-8 bottom-8">
                <CardHeader className="p-4">
                  <CardTitle className="text-xl">Pesanan saya</CardTitle>

                  <div>
                    <Label>Nama</Label>
                    <p>{props.auth.user.name}</p>
                  </div>
                </CardHeader>

                <Separator />

                {selectedMenus.length === 0 ? (
                  <p className="p-4 text-muted-foreground italic text-sm">
                    Silahkan pilih menu yang Anda inginkan
                  </p>
                ) : (
                  <div className="p-4 flex flex-col gap-4">
                    {selectedMenus.map((menu, index) => (
                      <div
                        key={"chosen-menu-item-" + index}
                        className="flex items-center"
                      >
                        <div className="flex-1">
                          <p>{menu.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Jumlah: {menu.count}
                          </p>
                        </div>

                        <Button
                          className="w-8 h-8"
                          variant={"destructive"}
                          size={"icon"}
                          onClick={() => onClickDeleteSelectedMenu(menu.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <Separator />

                <CardFooter className="p-4">
                  <div className="flex-1">
                    <p className="font-semibold">Ringkasan Pembayaran</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Total harga: Rp ...
                    </p>

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

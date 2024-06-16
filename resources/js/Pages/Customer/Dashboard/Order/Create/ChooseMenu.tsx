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
import { Head, router } from "@inertiajs/react";
import { Loader2, Minus, Plus, Send, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Page(
  props: PageProps<{
    franchise: Franchise;
    menus: Menu[];
  }>
) {
  const [menus, setMenus] = useState<(Menu & { count: number })[]>(
    props.menus.map((it) => ({ ...it, count: 0 }))
  );
  const [filter, setFilter] = useState("all");
  const [isOrdering, setIsOrdering] = useState(false);
  const { toast } = useToast();

  const onClickMenuIncDec = (idMenu: number, isIncrement: boolean) => {
    setMenus(
      menus.map((it) => {
        if (it.id === idMenu)
          return { ...it, count: it.count + (isIncrement ? 1 : -1) };
        else return it;
      })
    );
  };

  const onClickMenuDelete = (idMenu: number) => {
    setMenus(
      menus.map((it) => {
        if (it.id === idMenu) return { ...it, count: 0 };
        else return it;
      })
    );
  };

  const onClickButtonOrder = () => {
    setIsOrdering(true);
    router.post(
      route("dashboard.order.create"),
      {
        franchiseId: props.franchise.id,
        orderItems: menus
          .filter((it) => it.count > 0)
          .map((menu) => ({ menuId: menu.id, count: menu.count })),
      },
      {
        onSuccess: () => {
          router.visit(route("dashboard.order"));
        },
        onError: (e) => {
          toast({
            title: "Terjadi kesalahan!",
            description: String(e),
          });
          setIsOrdering(false);
        },
        onFinish: () => {
          setIsOrdering(false);
        },
      }
    );
  };

  return (
    <>
      <Head title="Dashboard: Buat pesanan" />

      <DashboardCustomerLayout>
        <div className="py-8 pr-2">
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
              <Tabs defaultValue="all" onValueChange={(e) => setFilter(e)}>
                <TabsList>
                  <TabsTrigger value="all">Semua</TabsTrigger>
                  <TabsTrigger value="food">Makanan</TabsTrigger>
                  <TabsTrigger value="beverage">Minuman</TabsTrigger>
                </TabsList>
              </Tabs>

              {menus
                .filter((it) => {
                  if (filter === "all") return true;
                  else return it.type === filter;
                })
                .map((menu, index) => (
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
                            disabled={menu.count <= 0}
                            variant={menu.count <= 0 ? "outline" : "secondary"}
                            size={"icon"}
                            onClick={() => onClickMenuIncDec(menu.id, false)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Button variant={"ghost"} size={"icon"}>
                            {menu.count}
                          </Button>
                          <Button
                            variant={"secondary"}
                            size={"icon"}
                            onClick={() => onClickMenuIncDec(menu.id, true)}
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

                {menus.filter((it) => it.count > 0).length === 0 ? (
                  <p className="p-4 text-muted-foreground italic text-sm">
                    Silahkan pilih menu yang Anda inginkan
                  </p>
                ) : (
                  <div className="p-4 flex flex-col gap-4">
                    {menus
                      .filter((it) => it.count > 0)
                      .map((menu, index) => (
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
                            onClick={() => onClickMenuDelete(menu.id)}
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
                        isOrdering ||
                        menus.filter((it) => it.count > 0).length === 0
                      }
                    >
                      {isOrdering ? (
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

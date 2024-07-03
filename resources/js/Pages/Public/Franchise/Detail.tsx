import ContainerComponent from "@/Components/Container";
import MenuItemComponent from "@/Components/MenuItem";
import NavbarComponent from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader } from "@/Components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import { Label } from "@/Components/ui/label";
import { Progress } from "@/Components/ui/progress";
import { Separator } from "@/Components/ui/separator";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Franchise, Menu, Review, User } from "@/types/models";
import { Head, Link } from "@inertiajs/react";
import { Send, Star } from "lucide-react";
import { FormattedDate, FormattedNumber } from "react-intl";

export default function Page(
  props: PageProps<{
    franchise: Franchise;
    menus: Menu[];
    reviews: (Review & { user: User })[];
  }>,
) {
  const rate =
    (props.reviews.reduce((prev, curr) => prev + curr.star, 0) /
      (props.reviews.length * 5)) *
    5;

  return (
    <>
      <Head title="Detail Restoran" />
      <NavbarComponent />
      <ContainerComponent>
        <div className="pt-24 pb-8">
          <div className="w-full h-72 rounded-md border overflow-hidden">
            <img
              src={props.franchise.image}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2 mt-8">
            <p className="text-3xl font-semibold">{props.franchise.name}</p>
            <p className="text-muted-foreground">{props.franchise.address}</p>
          </div>

          <div className="flex items-center justify-end gap-2 mt-4">
            {/* <Button variant={"outline"}>
              <LandPlot className="w-4 h-4 mr-2" />
              Reservasi tempat
            </Button> */}
            <Button variant={"outline"} asChild>
              <Link
                href={route("dashboard.order.create.chooseMenu", {
                  franchiseId: props.franchise.id,
                })}
              >
                <Send className="w-4 h-4 mr-2" />
                Pesan sekarang
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center max-w-xs gap-8">
            <p className="text-5xl font-semibold">
              <FormattedNumber
                minimumFractionDigits={1}
                maximumFractionDigits={1}
                value={props.reviews.length > 0 ? rate : 0}
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

          <Collapsible className="mt-8">
            <CollapsibleTrigger asChild>
              <Button className="w-full" variant={"link"}>
                Lihat ulasan
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid grid-cols-2 gap-2 mt-8">
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
            </CollapsibleContent>
          </Collapsible>

          <Separator className="my-8" />

          <div className="space-y-2">
            <p className="text-2xl font-semibold">Daftar Menu</p>
            <p className="text-muted-foreground">
              Anda dapat menemukan berbagai hidangan lezat yang disajikan dengan
              bahan-bahan berkualitas terbaik untuk memuaskan selera Anda.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-8">
            {props.menus.map((menu, index) => (
              <MenuItemComponent key={"menu-item-" + index} menu={menu} />
            ))}
          </div>
        </div>
      </ContainerComponent>
    </>
  );
}

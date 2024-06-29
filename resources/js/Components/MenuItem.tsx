import { Menu } from "@/types/models";
import { FormattedNumber } from "react-intl";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Label } from "./ui/label";

export default function MenuItemComponent({ menu }: { menu: Menu }) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <Card className="overflow-hidden">
            <div className="w-full h-32 overflow-hidden">
              <img src={menu.image} className="h-full w-full object-cover" />
            </div>
            <CardHeader className="p-4 space-y-1">
              <Label className="text-sm">
                <FormattedNumber
                  value={menu.price}
                  style="currency"
                  currency="IDR"
                />
              </Label>
              <CardTitle className="text-base">{menu.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {menu.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-2">
            <Label className="text-sm">
              <FormattedNumber
                value={menu.price}
                style="currency"
                currency="IDR"
              />
            </Label>
            <div className="space-y-1">
              <CardTitle className="text-base">{menu.name}</CardTitle>
              <CardDescription>{menu.description}</CardDescription>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

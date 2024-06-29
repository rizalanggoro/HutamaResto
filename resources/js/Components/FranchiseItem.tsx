import { cn } from "@/lib/utils";
import { Franchise } from "@/types/models";
import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function FranchiseItemComponent({
  franchise,
}: {
  franchise: Franchise;
}) {
  return (
    <>
      <Card className="overflow-hidden group">
        <div className="h-48 w-full overflow-hidden">
          <img
            src={franchise.image}
            className={cn(
              "inline-block h-48 object-cover w-full group-hover:scale-110 duration-300",
              franchise.is_open === 0 && "grayscale",
            )}
          />
        </div>

        <CardHeader>
          <Badge
            className="w-fit"
            variant={franchise.is_open === 0 ? "outline" : "default"}
          >
            {franchise.is_open === 0 ? "Tutup" : "Buka"}
          </Badge>
          <CardTitle className="text-lg">{franchise.name}</CardTitle>
          <CardDescription>{franchise.address}</CardDescription>
        </CardHeader>

        <CardFooter className="flex items-center justify-end">
          <Button variant={"link"} className="px-0" asChild>
            <Link href={route("home.franchise.detail", { id: franchise.id })}>
              Lihat detail
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

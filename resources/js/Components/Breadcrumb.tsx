import { Link } from "@inertiajs/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";

type Props = {
    items: {
        title: string;
        href?: string;
    }[];
};

export default function BreadcrumbComponent(props: Props) {
    const items: React.ReactNode[] = [];

    for (let a = 0; a < props.items.length; a++) {
        const item = props.items[a];
        items.push(
            a < props.items.length - 1 ? (
                <BreadcrumbItem key={"breadcrumb-item-" + a}>
                    <BreadcrumbLink asChild>
                        <Link href={item.href ?? "/"}>{item.title}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ) : (
                <BreadcrumbItem>
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                </BreadcrumbItem>
            )
        );
        if (a < props.items.length - 1)
            items.push(
                <BreadcrumbSeparator key={"breadcrumb-separator-" + a} />
            );
    }

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>{...items}</BreadcrumbList>
            </Breadcrumb>
        </>
    );
}

import Navbar from "@/Components/Navbar";

type Props = {
    children: React.ReactNode;
};

export default function Layout(props: Props) {
    return (
        <>
            <Navbar />

            <main className="pt-16 max-w-[1024px] mx-auto px-4">
                {props.children}
            </main>
        </>
    );
}

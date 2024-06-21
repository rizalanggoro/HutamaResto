import ContainerComponent from "@/Components/Container";
import NavbarComponent from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FormEventHandler, useState } from "react";

export default function Login(
  props: PageProps<{
    role: "customer" | "admin" | "superadmin" | string;
  }>
) {
  const { data, setData, errors, post, processing } = useForm({
    email: "customer@example.com",
    password: "password",
    role: props.role,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const routes: {
      [key: string]: string;
    } = {
      customer: "login",
      admin: "admin.login",
      superadmin: "superadmin.login",
    };

    post(route(routes[props.role]), {
      onError: (e) => {
        console.log(e);
      },
    });
  };

  return (
    <>
      <Head title="Masuk" />

      <NavbarComponent />
      <ContainerComponent variant="xs" className="pt-24 pb-8">
        <h3 className="text-2xl font-semibold">
          Selamat datang kembali di{" "}
          <span className="text-transparent bg-gradient-to-tr from-primary to-teal-600 bg-clip-text">
            HutamaResto
          </span>
        </h3>
        <p className="mt-2 text-muted-foreground">
          Silahkan masukkan beberapa informasi berikut untuk melanjutkan ke
          aplikasi HutamaResto
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-2">
            <div className="space-y-1">
              <Label>Masukkan alamat email</Label>
              <Input
                value={data.email}
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Masukkan kata sandi</Label>
              <div className="flex items-center gap-1">
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  className="flex-1"
                  value={data.password}
                  onChange={(e) =>
                    setData({
                      ...data,
                      password: e.target.value,
                    })
                  }
                />
                <Button
                  type="button"
                  size={"icon"}
                  variant={"secondary"}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit" className="w-full" disabled={processing}>
              {processing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {
                {
                  customer: "Masuk",
                  admin: "Masuk sebagai admin",
                  superadmin: "Masuk sebagai superadmin",
                }[props.role]
              }
            </Button>
          </div>
        </form>

        {props.role === "customer" && (
          <p className="text-muted-foreground mt-4 text-center text-sm">
            Akun Anda tidak terdaftar sebagai customer? Daftarkan sebuah akun
            melalui link{" "}
            <Link
              className="underline-offset-4 hover:underline text-primary"
              href={route("register")}
            >
              berikut
            </Link>
          </p>
        )}

        <div className="flex items-center gap-4 my-8">
          <Separator className="flex-1" />
          <p className="text-sm text-muted-foreground">atau</p>
          <Separator className="flex-1" />
        </div>

        <div className="flex flex-col gap-1">
          <Button className="w-full" variant={"outline"} asChild>
            <Link
              href={
                props.role === "admin" ? route("login") : route("admin.login")
              }
            >
              Masuk sebagai {props.role === "admin" ? "customer" : "admin"}
            </Link>
          </Button>
          {props.role === "admin" && (
            <Button className="w-full" variant={"outline"} asChild>
              <Link href={route("superadmin.login")}>
                Masuk sebagai superadmin
              </Link>
            </Button>
          )}
        </div>
      </ContainerComponent>
    </>
  );
}

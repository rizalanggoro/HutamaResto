import ContainerComponent from "@/Components/Container";
import NavbarComponent from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FormEventHandler, useState } from "react";

export default function Login(props: PageProps<{}>) {
  const { data, setData, errors, post, processing } = useForm({
    name: "Rizal Dwi Anggoro",
    email: "customer@example.com",
    password: "password",
    confirmPassword: "password",
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <>
      <Head title="Registrasi" />

      <NavbarComponent />
      <ContainerComponent variant="xs" className="pt-24 pb-8">
        <h3 className="text-2xl font-semibold">
          Daftar dan menjadi bagian dari keluarga{" "}
          <span className="text-transparent bg-gradient-to-tr from-primary to-teal-600 bg-clip-text">
            HutamaResto
          </span>
        </h3>
        <p className="mt-2 text-muted-foreground">
          Silahkan masukkan beberapa informasi berikut untuk melanjutkan proses
          pendaftaran akun HutamaResto
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-2">
            <div className="space-y-1">
              <Label>Masukkan nama lengkap</Label>
              <Input
                value={data.name}
                onChange={(e) =>
                  setData({
                    ...data,
                    name: e.target.value,
                  })
                }
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

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
                  type={passwordVisibility.password ? "text" : "password"}
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
                  onClick={() =>
                    setPasswordVisibility({
                      ...passwordVisibility,
                      password: !passwordVisibility.password,
                    })
                  }
                >
                  {passwordVisibility.password ? (
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

            <div className="space-y-1">
              <Label>Konfirmasi kata sandi</Label>
              <div className="flex items-center gap-1">
                <Input
                  type={
                    passwordVisibility.confirmPassword ? "text" : "password"
                  }
                  className="flex-1"
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({
                      ...data,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <Button
                  type="button"
                  size={"icon"}
                  variant={"secondary"}
                  onClick={() =>
                    setPasswordVisibility({
                      ...passwordVisibility,
                      confirmPassword: !passwordVisibility.confirmPassword,
                    })
                  }
                >
                  {passwordVisibility.confirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit" className="w-full" disabled={processing}>
              {processing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Daftar
            </Button>
          </div>
        </form>

        <p className="text-muted-foreground mt-4 text-center text-sm">
          Akun Anda sudah terdaftar ke HutamaResto? Masuk sekarang melalui link{" "}
          <Link
            className="underline-offset-4 hover:underline text-primary"
            href={route("login")}
          >
            berikut
          </Link>
        </p>
      </ContainerComponent>
    </>
  );
}

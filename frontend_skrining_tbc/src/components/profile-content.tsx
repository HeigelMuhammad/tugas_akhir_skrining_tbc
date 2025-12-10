import { Key, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// --- DATA DUMMY (Ganti dengan data dari API/session pengguna yang login) ---
const user = {
  nama: "Zakaria Zidan",
  email: "zakariazidan12@gmail.com",
  no_hp: "081234567890",
  alamat: "Jl. Mastrip, Sumbersari, Jember",
  created_at: new Date("2024-11-10T08:30:00Z"),
}

export default function ProfileContent() {
  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Informasi Pribadi</TabsTrigger>
        <TabsTrigger value="security">Keamanan</TabsTrigger>
        <TabsTrigger value="account">Akun</TabsTrigger>
      </TabsList>

      {/* Informasi Pribadi */}
      <TabsContent value="personal">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pribadi</CardTitle>
            <CardDescription>
              Perbarui data pribadi Anda. Data ini membantu kami memberikan
              layanan yang lebih baik.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input id="nama" defaultValue={user.nama} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="no_hp">Nomor HP</Label>
              <Input id="no_hp" defaultValue={user.no_hp} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alamat">Alamat</Label>
              <Input id="alamat" defaultValue={user.alamat} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Simpan Perubahan</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Pengaturan Keamanan */}
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Keamanan</CardTitle>
            <CardDescription>
              Ubah kata sandi Anda secara berkala untuk menjaga keamanan akun.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Password Saat Ini</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Password Baru</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Key className="mr-2 h-4 w-4" />
              Ubah Password
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Pengaturan Akun */}
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Akun</CardTitle>
            <CardDescription>
              Informasi mengenai akun Anda dan tindakan lainnya.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Akun Dibuat Pada</Label>
                <p className="text-sm text-muted-foreground">
                  {format(user.created_at, "d MMMM yyyy", { locale: id })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Zona Berbahaya</CardTitle>
            <CardDescription>
              Tindakan ini tidak dapat diurungkan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Hapus Akun</Label>
                <p className="text-sm text-muted-foreground">
                  Hapus akun Anda dan semua data terkait secara permanen.
                </p>
              </div>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus Akun Saya
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
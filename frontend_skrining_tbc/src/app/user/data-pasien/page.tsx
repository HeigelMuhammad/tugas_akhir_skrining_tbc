"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconUserCircle } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Impor service pasien dan tipe data Patient
import {
  getMyPatients,
  Patient,
  updatePatient,
} from "@/app/services/pasien.services"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Skema validasi untuk form edit disesuaikan dengan backend
const formSchema = z.object({
  nama: z.string().min(3, "Nama minimal 3 karakter"),
  nik: z
    .string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),
  no_hp: z.string().min(10, "Nomor HP minimal 10 digit"),
  alamat: z.string().min(5, "Alamat minimal 5 karakter"),
  tanggal_lahir: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal YYYY-MM-DD"),
  pekerjaan: z.string().optional(),
  usia: z.string().nonempty("Usia wajib diisi").regex(/^\d+$/, "Usia harus angka"),
  jenis_kelamin: z.enum(["Laki-Laki", "Perempuan"], {
    message: "Jenis kelamin wajib dipilih",
  }),
})

// Tipe data untuk form edit, dikonversi dari schema
type EditFormValues = z.infer<typeof formSchema>

export default function DataPasienPage() {
  const [patients, setPatients] = React.useState<Patient[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(
    null
  )

  const form = useForm<EditFormValues>({
    resolver: zodResolver(formSchema),
  })

  // Fungsi untuk memuat data pasien dari API
  const fetchPatients = async () => {
    setIsLoading(true)
    const data = await getMyPatients()
    setPatients(data)
    setIsLoading(false)
  }

  // Muat data saat komponen pertama kali render
  React.useEffect(() => {
    fetchPatients()
  }, [])

  const handleEditClick = (patient: Patient) => {
    setSelectedPatient(patient)
    // Mengisi form dengan data pasien yang dipilih
    form.reset({
      nama: patient.nama,
      nik: patient.nik,
      no_hp: patient.no_hp || "",
      alamat: patient.alamat,
      tanggal_lahir: patient.tanggal_lahir,
      pekerjaan: patient.pekerjaan || "",
      usia: patient.usia.toString(),
      jenis_kelamin: patient.jenis_kelamin,
    })
    setIsEditModalOpen(true)
  }

  async function onEditSubmit(values: EditFormValues) {
    if (!selectedPatient) return

    try {
      // Backend mengharapkan usia sebagai number
      const payload = {
        ...values,
        usia: parseInt(values.usia, 10),
      }
      
      await updatePatient(selectedPatient.id, payload)
      alert(`Data untuk ${values.nama} berhasil diperbarui!`)
      setIsEditModalOpen(false)
      setSelectedPatient(null)
      fetchPatients() // Muat ulang data untuk menampilkan perubahan
    } catch (error) {
      alert("Gagal memperbarui data pasien. Silakan coba lagi.")
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Data Pasien</h1>
          <p className="text-muted-foreground">
            Klik pada kartu untuk mengedit atau tambah pasien baru.
          </p>
        </div>
        <Button asChild>
          <Link href="/user/screening-data">Tambah Pasien</Link>
        </Button>
      </div>

      {isLoading ? (
        <p>Memuat data pasien...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {patients.map((patient) => (
            <Card
              key={patient.id}
              className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-1"
              onClick={() => handleEditClick(patient)}
            >
              <CardContent className="flex flex-row items-center p-4">
                <IconUserCircle className="mr-4 h-10 w-10 shrink-0 text-muted-foreground" />
                <p className="font-semibold truncate">{patient.nama}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Data Pasien</DialogTitle>
            <DialogDescription>
              Perbarui informasi untuk pasien{" "}
              <span className="font-semibold">{selectedPatient?.nama}</span>.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onEditSubmit)}
              className="grid max-h-[70vh] gap-4 overflow-y-auto px-1 py-4"
            >
              {/* === PERBAIKAN: MENAMBAHKAN FORM FIELDS DI SINI === */}
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input placeholder="16 digit NIK" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alamat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Input placeholder="Alamat lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="no_hp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. HP</FormLabel>
                    <FormControl>
                      <Input placeholder="08..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="tanggal_lahir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="usia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usia</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Usia dalam tahun" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="jenis_kelamin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Laki-Laki">Laki-Laki</SelectItem>
                          <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pekerjaan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pekerjaan</FormLabel>
                    <FormControl>
                      <Input placeholder="Pekerjaan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Simpan Perubahan</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
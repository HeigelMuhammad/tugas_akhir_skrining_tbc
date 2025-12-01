"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import ScreeningProgress from "@/components/screening-progress"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const GENDERS = ["L", "P"] as const

const formSchema = z.object({
  nama: z.string().min(3, "Nama minimal 3 huruf"),
  alamat: z.string().min(5, "Alamat terlalu pendek"),
  nik: z.string().length(16, "NIK harus 16 digit").regex(/^[0-9]+$/, "NIK hanya boleh angka"),
  pekerjaan: z.string().optional(),
  tanggal_lahir: z
    .date()
    .refine((val) => !!val, { message: "Tanggal lahir wajib diisi" }),
  jenis_kelamin: z.enum(GENDERS).optional().refine((v) => v === "L" || v === "P", {
    message: "Jenis kelamin wajib dipilih",
  }),
  usia: z.string().regex(/^[0-9]{1,3}$/, "Usia harus angka").nonempty("Usia wajib diisi"),
  no_hp: z.string().regex(/^08[0-9]{8,11}$/, "Nomor HP tidak valid"),
  email: z.string().email("Email tidak valid"),
})

type FormValues = z.infer<typeof formSchema>

export default function Page() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      alamat: "",
      nik: "",
      pekerjaan: "",
      tanggal_lahir: undefined,
      jenis_kelamin: undefined,
      usia: "",
      no_hp: "",
      email: "",
    },
  })

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
      
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 text-center">Form Screening Pasien</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {/* Nama */}
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="Masukkan nama pasien" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Alamat */}
          <FormField
            control={form.control}
            name="alamat"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full resize-none"
                    placeholder="Masukkan alamat lengkap"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* NIK */}
          <FormField
            control={form.control}
            name="nik"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIK</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="text"
                    maxLength={16}
                    inputMode="numeric"
                    placeholder="16 digit NIK"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pekerjaan */}
          <FormField
            control={form.control}
            name="pekerjaan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pekerjaan</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="Masukkan pekerjaan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tanggal Lahir */}
          <FormField
            control={form.control}
            name="tanggal_lahir"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Lahir</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-[240px] justify-start text-left font-normal ${
                        !field.value && "text-muted-foreground"
                      }`}
                    >
                      {field.value
                        ? field.value.toLocaleDateString()
                        : "Pilih tanggal"}
                      <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={field.value}
                      onSelect={(date) => field.onChange(date)}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Usia */}
          <FormField
            control={form.control}
            name="usia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usia</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="number"
                    min={0}
                    max={120}
                    placeholder="Masukkan usia"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Jenis Kelamin */}
          <FormField
            control={form.control}
            name="jenis_kelamin"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Jenis Kelamin</FormLabel>
                <div className="flex gap-8">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value === "L"}
                      onCheckedChange={(checked) => {
                        if (checked) field.onChange("L")
                        else field.onChange(undefined)
                      }}
                    />
                    <span>Laki-laki</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value === "P"}
                      onCheckedChange={(checked) => {
                        if (checked) field.onChange("P")
                        else field.onChange(undefined)
                      }}
                    />
                    <span>Perempuan</span>
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* No HP */}
          <FormField
            control={form.control}
            name="no_hp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No HP</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="08xxxxxxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="w-full" type="email" placeholder="contoh@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="my-6" />
          {/* Tombol */}
          <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
          <Link href="landing-page">
            <Button type="button" variant="outline" className="w-full md:w-auto">
            Cancel
            </Button>
          </Link >
          <Link href="screening-kesehatan">
            <Button type="submit" className="w-full md:w-auto">
              Lanjut
            </Button>
          </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}

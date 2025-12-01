"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  bb: z.string().nonempty("Berat badan wajib diisi"),
  tb: z.string().nonempty("Tinggi badan wajib diisi"),
  riwayat_kontak: z.enum(["TBC", "TBC RO", "Tidak"], {
    error: "Pilih salah satu riwayat kontak",
  }),
  terdiagnosa: z.enum(["TBC", "TBC RO", "Tidak"]),
  pernah_berobat: z.enum(["Ya", "Tidak"]),
  nama_obat: z.string().optional(),
  tidak_tuntas: z.enum(["Ya", "Tidak"]),
  malnutrisi: z.enum(["Ya", "Tidak"]),
  merokok: z.enum(["Ya", "Tidak"]),
  dm: z.enum(["Ya", "Tidak"]),
  lansia: z.enum(["Ya", "Tidak"]),
  hamil: z.enum(["Ya", "Tidak"]),
  batuk: z.enum(["Ya", "Tidak"]),
  bb_turun: z.enum(["Ya", "Tidak"]),
  demam: z.enum(["Ya", "Tidak"]),
  lemas: z.enum(["Ya", "Tidak"]),
  berkeringat: z.enum(["Ya", "Tidak"]),
  sesak: z.enum(["Ya", "Tidak"]),
  getah_bening: z.enum(["Ya", "Tidak"]),
})

type FormValues = z.infer<typeof formSchema>

export default function ScreeningForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-11 text-center">Formulir Skrining</h1>

      
      <Form {...form}>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Pemeriksaan Tinggi Badan dan Berat Badan</h2>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Pemeriksaan BB, TB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="bb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Berat Badan</FormLabel>
                  <FormControl>
                    <Input 
                    type="number" 
                    placeholder="kg" 
                    {...field}
                     value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tinggi Badan</FormLabel>
                  <FormControl>
                    <Input 
                    type="number" 
                    placeholder="cm" 
                    {...field}
                     value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="my-11" />

          <div className="mb-4">
            <h2 className="text-lg font-bold">Pemeriksaan Kontak</h2>
          </div>
          {/* Riwayat Kontak */}
          <FormField
            control={form.control}
            name="riwayat_kontak"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Riwayat Kontak TBC</FormLabel>
                <div className="flex gap-6">
                  {["TBC", "TBC RO", "Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-11" />

          <div className="mb-4">
            <h2 className="text-lg font-bold">Pemeriksaan Faktor Risiko</h2>
          </div>

          <FormField
            control={form.control}
            name="terdiagnosa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pernah terdiagnosa :</FormLabel>
                <div className="flex gap-6">
                  {["TBC", "TBC RO", "Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Faktor Risiko (contoh satu) */}
          <FormField
            control={form.control}
            name="pernah_berobat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pernah Berobat TBC</FormLabel>
                <div className="flex gap-6">
                  {["Ya", "Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nama obat */}
          <FormField
            control={form.control}
            name="nama_obat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jika ya, nama obat</FormLabel>
                <FormControl>
                  <Input placeholder="Nama obat TBC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pernah_berobat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pernah berobat TBC tapi tidak tuntas?</FormLabel>
                <div className="flex gap-6">
                  {["Ya","Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="malnutrisi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Malnutrisi</FormLabel>
                <div className="flex gap-6">
                  {["Ya","Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="merokok"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Merokok atau Perokok Pasif</FormLabel>
                <div className="flex gap-6">
                  {["Ya","Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Riwayat Diabetes Melitus atau Kencing Manis</FormLabel>
                <div className="flex gap-6">
                  {["Ya","Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lansia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lansia Lebih Dari 60 Tahun</FormLabel>
                <div className="flex gap-6">
                  {["Ya","Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hamil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ibu hamil?</FormLabel>
                <div className="flex gap-6">
                  {["Ya","Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-11" />

          <div className="mb-4">
            <h2 className="text-lg font-bold">Skrining Gejala Utama</h2>
          </div>

          <FormField
            control={form.control}
            name="batuk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batuk (semua bentuk batuk tanpa melihat durasi)</FormLabel>
                <div className="flex gap-6">
                  {["Ya","Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="my-11" />

          <div className="mb-4">
            <h2 className="text-lg font-bold">Skrining Gejala Tambahan</h2>
          </div>

          <FormField
            control={form.control}
            name="bb_turun"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BB turun tanpa penyebab jelas/BB tidak naik/nafsu makan turun</FormLabel>
                <div className="flex gap-6">
                  {["Ya","Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="demam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demam yang tidak diketahui penyebabnya</FormLabel>
                <div className="flex gap-6">
                  {["Ya","Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lemas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badan lemas/lesu</FormLabel>
                <div className="flex gap-6">
                  {["Ya","Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="berkeringat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Berkeringat malam hari tanpa kegiatan</FormLabel>
                <div className="flex gap-6">
                  {["Ya","Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sesak"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sesak napas tanpa nyeri dada</FormLabel>
                <div className="flex gap-6">
                  {["Ya","Tidak"].map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value === val}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? val : undefined)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-11" />

          {/* TODO: Tambahkan semua field risiko & gejala tambahan dengan pola yang sama */}
          {/* Tombol */}
            <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
            <Link href="screening-data">
              <Button type="button" variant="outline" className="w-full md:w-auto">
              Kembali
              </Button>
            </Link >
              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </div>

        </form>
      </Form>
    </div>
  )
}

"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getRiwayatSkriningByPasien } from "@/app/services/skrining.services"

interface SkriningRiwayat {
  id: number
  nama: string
  nik: string
  alamat: string
  tanggal_lahir: string
  usia: string
  kelamin: string
  no_hp: string
  email: string | null
  pekerjaan: string
  berat_badan: string
  tinggi_badan: string
  hasil_screening: string

  // risiko + gejala
  riwayat_kontak_tbc: string
  pernah_terdiagnosa: string
  pernah_berobat_tbc: string
  pernah_berobat_tb_tapi_tidak_tuntas: string
  malnutrisi: string
  merokok_perokok_pasif: string
  riwayat_dm_kencing_manis: string
  lansia: string
  ibu_hamil: string
  batuk: string
  bb_turun_tanpa_sebab_nafsu_makan_turun: string
  demam_tidak_diketahui_penyebabnya: string
  badan_lemas: string
  berkeringat_malam_tanpa_kegiatan: string
}

function HasilScreeningContent() {
  const searchParams = useSearchParams()
  const pasienId = searchParams.get("pasienId")
  const [riwayat, setRiwayat] = useState<SkriningRiwayat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (pasienId) {
      getRiwayatSkriningByPasien(Number(pasienId)).then((data) => {
        setRiwayat(data)
        setLoading(false)
      })
    }
  }, [pasienId])

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>
  }

  // jika tidak ada riwayat skrining
  if (riwayat.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h1 className="text-xl font-semibold">Tidak Ada Riwayat Screening</h1>
        <p className="mt-2 text-muted-foreground">
          Pasien ini belum pernah melakukan screening.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/user/riwayat-screening">Kembali</Link>
        </Button>
      </div>
    )
  }

  // Ambil skrining terbaru
  const hasilScreening = riwayat[riwayat.length - 1]

  const isPositif =
    hasilScreening.hasil_screening.toLowerCase() === "terduga"

  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center px-4 pb-24 pt-10">
      <div className="w-full max-w-3xl space-y-8 rounded-xl border bg-card p-6 shadow-sm">

        {/* HEADER */}
        <header className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            Hasil Screening
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ringkasan Hasil Screening Pasien
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Berikut adalah ringkasan data dan hasil screening untuk pasien{" "}
            <span className="font-bold text-foreground">
              {hasilScreening.nama}
            </span>
            .
          </p>
        </header>

        {/* IDENTITAS */}
        <section className="grid gap-6 rounded-lg bg-muted/40 p-4 sm:grid-cols-2 sm:p-6">
          <div className="space-y-2 border-b border-border pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Identitas
            </p>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Nama:</span> {hasilScreening.nama}</p>
              <p><span className="font-medium">NIK:</span> {hasilScreening.nik}</p>
              <p><span className="font-medium">Tanggal lahir:</span> {hasilScreening.tanggal_lahir} ({hasilScreening.usia})</p>
              <p><span className="font-medium">Jenis kelamin:</span> {hasilScreening.kelamin}</p>
              <p><span className="font-medium">Alamat:</span> {hasilScreening.alamat}</p>
            </div>
          </div>

          {/* KONTAK */}
          <div className="space-y-2 pt-4 sm:border-l sm:border-border sm:pl-6 sm:pt-0">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Kontak & Pekerjaan
            </p>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">No. HP:</span> {hasilScreening.no_hp}</p>
              <p><span className="font-medium">Email:</span> {hasilScreening.email || "-"}</p>
              <p><span className="font-medium">Pekerjaan:</span> {hasilScreening.pekerjaan || "-"}</p>
              <p><span className="font-medium">Berat badan:</span> {hasilScreening.berat_badan}</p>
              <p><span className="font-medium">Tinggi badan:</span> {hasilScreening.tinggi_badan}</p>
            </div>
          </div>

          {/* HASIL */}
          <div className="space-y-2 border-t border-border pt-4 sm:col-span-2">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Ringkasan hasil screening
            </p>
            <div className="space-y-2 rounded-md bg-background p-3 text-sm">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-medium">Hasil screening:</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    isPositif
                      ? "bg-red-100 text-red-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {hasilScreening.hasil_screening}
                </span>
              </div>
            </div>
          </div>

          {/* RISIKO & GEJALA */}
          <div className="space-y-2 border-t border-border pt-4 sm:col-span-2">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Faktor risiko dan gejala
            </p>

            <div className="grid gap-2 text-sm sm:grid-cols-2">
              <p><span className="font-medium">Riwayat kontak TBC:</span> {hasilScreening.riwayat_kontak_tbc}</p>
              <p><span className="font-medium">Pernah terdiagnosa:</span> {hasilScreening.pernah_terdiagnosa}</p>
              <p><span className="font-medium">Pernah berobat:</span> {hasilScreening.pernah_berobat_tbc}</p>
              <p><span className="font-medium">Tidak tuntas:</span> {hasilScreening.pernah_berobat_tb_tapi_tidak_tuntas}</p>
              <p><span className="font-medium">Malnutrisi:</span> {hasilScreening.malnutrisi}</p>
              <p><span className="font-medium">Perokok:</span> {hasilScreening.merokok_perokok_pasif}</p>
              <p><span className="font-medium">DM:</span> {hasilScreening.riwayat_dm_kencing_manis}</p>
              <p><span className="font-medium">Lansia (60):</span> {hasilScreening.lansia}</p>
              <p><span className="font-medium">Ibu hamil:</span> {hasilScreening.ibu_hamil}</p>
              <p><span className="font-medium">Batuk:</span> {hasilScreening.batuk}</p>
              <p><span className="font-medium">BB turun:</span> {hasilScreening.bb_turun_tanpa_sebab_nafsu_makan_turun}</p>
              <p><span className="font-medium">Demam:</span> {hasilScreening.demam_tidak_diketahui_penyebabnya}</p>
              <p><span className="font-medium">Badan lemas:</span> {hasilScreening.badan_lemas}</p>
              <p><span className="font-medium">Berkeringat malam:</span> {hasilScreening.berkeringat_malam_tanpa_kegiatan}</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="outline">
            <Link href="/user/riwayat-screening">Kembali</Link>
          </Button>
        </footer>
      </div>
    </div>
  )
}

export default function HasilScreeningPage() {
  return (
    <React.Suspense fallback={<p className="text-center mt-10">Memuat data...</p>}>
      <HasilScreeningContent />
    </React.Suspense>
  )
}

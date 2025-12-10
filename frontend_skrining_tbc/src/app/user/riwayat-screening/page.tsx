"use client"

import Link from "next/link"
import { IconChevronRight, IconUserCircle } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { getMyPatients } from "@/app/services/pasien.services"

import patientData from "@/app/dashboard-admin-puskesmas/data.json"
import {
  Card,
  CardContent,
} from "@/components/ui/card"



export default function RiwayatScreeningPage() {

  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    getMyPatients().then((res) => setPatients(res))
  }, [])
  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Riwayat Screening</h1>
        <p className="text-muted-foreground">
          Pilih pasien untuk melihat riwayat dan hasil screening lengkap.
        </p>
      </div>

      <div className="space-y-4">
        {patients.map((patient) => (
          <Link
            key={patient.id}
            href={`/user/hasil-screening?pasienId=${patient.id}`}
          >
            <Card className="cursor-pointer">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <IconUserCircle className="mr-4 h-12 w-12 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-lg font-semibold">{patient.nama}</p>
                    <p className="text-sm text-muted-foreground">
                      Total Screening: {patient.total_screening} kali
                    </p>
                  </div>
                </div>
                <IconChevronRight className="h-6 w-6 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
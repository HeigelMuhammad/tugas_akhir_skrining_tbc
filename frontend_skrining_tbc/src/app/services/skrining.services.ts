import api from "./api"
import { getActiveToken } from "./auth.services"
import type { FormValues } from "@/app/user/screening-kesehatan/page"

export const createSkrining = async (formData: FormValues, pasienId: string) => {
  const token = getActiveToken()
  if (!token) {
    throw new Error("Tidak ada token otorisasi. Silakan login kembali.")
  }

  // normalisasi payload jika perlu (mis. ubah semua enum/checkbox ke string)
  const payload = {
    ...formData,
    pasien_id: pasienId,
  }

  const res = await api.post("/skrining/create", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  return res.data
}

export const getSkrining = async () => {
  const token = getActiveToken()
  if (!token) throw new Error("No active session token")
  const res = await api.get("/skrining", {
    headers: { Authorization: `Bearer ${token}` },
  })
  // backend mengembalikan { data: [...] } atau langsung [...]
  return (res.data && (res.data.data ?? res.data)) || []
}

export const getSkriningStatistik = async () => {
  const token = getActiveToken()
  if (!token) throw new Error("No active session token")

  const res = await api.get("/skrining/statistik", {
    headers: { Authorization: `Bearer ${token}` },
  })

  return res.data.data
}

export const getRiwayatSkriningByPasien = async (
  pasienId: number
): Promise<SkriningRiwayat[]> => {
  const token = getActiveToken()
  if (!token) throw new Error("No active session token")

  const res = await api.get(`/skrining/pasien/${pasienId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return res.data.data as SkriningRiwayat[]
}


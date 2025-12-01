"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, History, BookOpen, Stethoscope } from "lucide-react";

export default function DashboardHero() {
  return (
    <section className="w-full py-8">
      {/* TOP HERO TEXT */}
      <div className="text-center space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold">
          Selamat Datang, <span className="text-primary">Heigel</span> 
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Kelola pasien dan lakukan skrining TBC dengan cepat dan mudah.
        </p>

        <div className="flex justify-center gap-3 mt-4 flex-wrap">
          <Button size="lg" className="px-6">
            Mulai Screening
          </Button>
          <Button variant="outline" size="lg" className="px-6">
            Pilih Pasien
          </Button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 py-4">
            <Stethoscope />
            <div>
              <p className="text-sm text-muted-foreground">Status Terakhir</p>
              <p className="font-semibold">Negatif</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 py-4">
            <History />
            <div>
              <p className="text-sm text-muted-foreground">Screening</p>
              <p className="font-semibold">6 kali</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 py-4">
            <Users />
            <div>
              <p className="text-sm text-muted-foreground">Keluarga</p>
              <p className="font-semibold">3 anggota</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 py-4">
            <BookOpen />
            <div>
              <p className="text-sm text-muted-foreground">Edukasi</p>
              <p className="font-semibold">12 artikel</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

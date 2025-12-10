import React from "react";
import { UploadSuaraBatukForm } from "@/components/upload-suara";

export default function ScreeningSuaraPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center px-4 pb-24 pt-10">
      <div className="w-full max-w-4xl space-y-8 text-center">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Bantu skrining TBC dengan suara batuk Anda
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Unggah rekaman suara batuk Anda secara aman dan rahasia. Sistem akan
            menganalisis pola suara batuk untuk membantu skrining awal risiko TBC.
          </p>
        </header>

        <div className="flex justify-center">
          <UploadSuaraBatukForm />
        </div>
      </div>
    </div>
  );
}

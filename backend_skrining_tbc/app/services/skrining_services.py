def is_yes(value):
    """Konversi string 'ya', 'iya', 'true', '1' menjadi True."""
    truthy = {"ya", "iya", "true", "1", "yes", True, 1}
    if value is None:
        return False
    if isinstance(value, bool):
        return value
    return str(value).strip().lower() in truthy


def hitung_status_skrining(payload):
    """
    Menghitung apakah pasien TERDUGA TBC berdasarkan formulir Kemenkes.
    """

    # GEJALA UTAMA
    batuk = is_yes(payload.get("batuk"))

    # GEJALA TAMBAHAN
    gejala_tambahan = [
        payload.get("bb_turun_tanpa_sebab_jelas_bb_tidak_naik_nafsu_makan_turun"),
        payload.get("demam_yang_tidak_diketahui_penyebabnya"),
        payload.get("badan_lemas"),
        payload.get("berkesingat_malam_hari_tanpa_kegiatan"),
        payload.get("sesak_napas_tanpa_nyeri_dada"),
        payload.get("ada_pembengkakan_kelenjar_getah_bening_pada_leher_atau_ketiak"),
    ]

    gejala_tambahan = [is_yes(g) for g in gejala_tambahan]
    gejala_tambahan_count = sum(gejala_tambahan)

    # FAKTOR RISIKO
    faktor_risiko = [
        payload.get("riwayat_kontak_tbc"),
        payload.get("pernah_terdiagnosis_tbc"),
        payload.get("pernah_berobat_tbc"),
        payload.get("pernah_beroobat_tbc_namun_tidak_tuntas"),
        payload.get("malnutrisi"),
        payload.get("merokok_atau_perokokok_pasif"),
        payload.get("riwayat_diabetes_melitus_atau_kencing_manis"),
        payload.get("lansia_lebih_dari_60_tahun"),
        payload.get("ibu_hamil"),
    ]

    faktor_risiko = [is_yes(f) for f in faktor_risiko]
    faktor_risiko_count = sum(faktor_risiko)

    # === LOGIKA UTAMA ===
    if batuk:
        return "TERDUGA"

    if faktor_risiko_count >= 1 and gejala_tambahan_count >= 1:
        return "TERDUGA"

    if is_yes(payload.get("riwayat_kontak_tbc")) and gejala_tambahan_count >= 1:
        return "TERDUGA"

    return "TIDAK TERDUGA"

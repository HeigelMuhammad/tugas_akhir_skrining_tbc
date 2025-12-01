from app.model.skrining import Skrining
from app.model.pasien import Pasien
from app import response, db
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime


# ✅ USER menambahkan skrining baru
@jwt_required()
def create_skrining():
    try:
        current_user = get_jwt_identity()
        user_id = current_user["id"]
        role = current_user["role"]

        if role != "user":
            return response.bad_request([], "Hanya pengguna (user) yang dapat menambahkan skrining")

        data = request.get_json()

        pasien = Pasien.query.filter_by(id=data["pasien_id"], user_id=user_id).first()
        if not pasien:
            return response.bad_request([], "Pasien tidak ditemukan atau bukan milik Anda")

        skrining = Skrining(
            user_id=user_id,
            pasien_id=data["pasien_id"],
            berat_badan=data["berat_badan"],
            tinggi_badan=data["tinggi_badan"],
            riwayat_kontak_tbc=data["riwayat_kontak_tbc"],
            pernah_terdiagnosis_tbc=data["pernah_terdiagnosis_tbc"],
            pernah_berobat_tbc=data["pernah_berobat_tbc"],
            nama_obat_tbc=data.get("nama_obat_tbc"),
            pernah_beroobat_tbc_namun_tidak_tuntas=data["pernah_beroobat_tbc_namun_tidak_tuntas"],
            malnutrisi=data["malnutrisi"],
            merokok_atau_perokokok_pasif=data["merokok_atau_perokokok_pasif"],
            riwayat_diabetes_melitus_atau_kencing_manis=data["riwayat_diabetes_melitus_atau_kencing_manis"],
            lansia_lebih_dari_60_tahun=data["lansia_lebih_dari_60_tahun"],
            ibu_hamil=data["ibu_hamil"],
            batuk=data["batuk"],
            bb_turun_tanpa_sebab_jelas_bb_tidak_naik_nafsu_makan_turun=data["bb_turun_tanpa_sebab_jelas_bb_tidak_naik_nafsu_makan_turun"],
            demam_yang_tidak_diketahui_penyebabnya=data["demam_yang_tidak_diketahui_penyebabnya"],
            badan_lemas=data["badan_lemas"],
            berkesingat_malam_hari_tanpa_kegiatan=data["berkesingat_malam_hari_tanpa_kegiatan"],
            sesak_napas_tanpa_nyeri_dada=data["sesak_napas_tanpa_nyeri_dada"],
            ada_pembengkakan_kelenjar_getah_bening_pada_leher_atau_ketiak=data["ada_pembengkakan_kelenjar_getah_bening_pada_leher_atau_ketiak"],
            tanggal_skrining=datetime.strptime(data["tanggal_skrining"], "%Y-%m-%d"),
            hasil_deteksi=data["hasil_deteksi"],
            status="pending"
        )

        db.session.add(skrining)
        db.session.commit()

        return response.success(single_object(skrining), "Berhasil menambahkan data skrining")

    except Exception as e:
        print("Error create_skrining:", e)
        return response.bad_request([], "Gagal menambahkan data skrining")


# ✅ ADMIN / USER melihat data skrining
@jwt_required()
def index():
    try:
        current_user = get_jwt_identity()
        role = current_user["role"]
        kecamatan_id = current_user["kecamatan_id"]
        user_id = current_user["id"]

        if role == "super_admin":
            skrining_list = Skrining.query.all()
        elif role == "admin_puskesmas":
            # Lihat pasien di kecamatan yang sama
            skrining_list = (
                Skrining.query.join(Pasien)
                .filter(Pasien.kecamatan_id == kecamatan_id)
                .all()
            )
        else:  # user
            skrining_list = Skrining.query.filter_by(user_id=user_id).all()

        data = format_array(skrining_list)
        return response.success(data, "Berhasil mengambil data skrining")

    except Exception as e:
        print("Error index skrining:", e)
        return response.bad_request([], "Gagal mengambil data skrining")


# ✅ ADMIN PUSKESMAS mengubah status hasil skrining
@jwt_required()
def update_status_skrining(id):
    try:
        current_user = get_jwt_identity()
        role = current_user["role"]
        kecamatan_id = current_user["kecamatan_id"]

        if role != "admin_puskesmas":
            return response.bad_request([], "Hanya admin puskesmas yang dapat mengubah status skrining")

        skrining = (
            Skrining.query.join(Pasien)
            .filter(Skrining.id == id, Pasien.kecamatan_id == kecamatan_id)
            .first()
        )

        if not skrining:
            return response.bad_request([], "Data skrining tidak ditemukan atau bukan wilayah Anda")

        data = request.get_json()
        skrining.status = data.get("status", skrining.status)
        db.session.commit()

        return response.success(single_object(skrining), "Status skrining berhasil diperbarui")

    except Exception as e:
        print("Error update_status_skrining:", e)
        return response.bad_request([], "Gagal memperbarui status skrining")

#HELPER FUNCTIONS
def format_array(datas):
    return [single_object(d) for d in datas]


def single_object(data):
    return {
        "id": data.id,
        "user_id": data.user_id,
        "pasien_id": data.pasien_id,
        "berat_badan": data.berat_badan,
        "tinggi_badan": data.tinggi_badan,
        "hasil_deteksi": data.hasil_deteksi,
        "status": data.status.value if hasattr(data.status, "value") else data.status,
        "tanggal_skrining": data.tanggal_skrining.isoformat(),
        "created_at": data.created_at.isoformat() if data.created_at else None,
        "updated_at": data.updated_at.isoformat() if data.updated_at else None,
    }

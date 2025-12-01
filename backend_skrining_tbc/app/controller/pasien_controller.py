from app.model.pasien import Pasien
from app.model.pasien import JenisKelamin
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app import response, app, db
from flask import request


@jwt_required()
def create_pasien():
    
    try:
        current_user = get_jwt()
        user_id = current_user["id"]
        jk_enum = JenisKelamin(request.json["jenis_kelamin"])

        try: 
            jk_enum = JenisKelamin(request.json["jenis_kelamin"])
        except ValueError:
            return response.bad_request([], "Jenis kelamin tidak valid. Pilih 'Laki-laki' atau 'Perempuan'")

        pasien = Pasien(
            user_id=user_id,
            kecamatan_id=request.json["kecamatan_id"],
            nama=request.json["nama"],
            nik=request.json["nik"],
            alamat=request.json["alamat"],
            tanggal_lahir=request.json["tanggal_lahir"],
            usia=request.json["usia"],
            jenis_kelamin=jk_enum,
            no_hp=request.json["no_hp"],
            pekerjaan=request.json["pekerjaan"],
        )

        db.session.add(pasien)
        db.session.commit()

        data_pasien = single_object(pasien)
        return response.success(data_pasien, "Berhasil menambahkan data pasien")
    except Exception as e:
        print(e)
        return response.bad_request([], "Gagal menambahkan data pasien")

@jwt_required()
def index():
    try:
        current_user = get_jwt()
        role = current_user["role"]
        kecamatan_id = current_user["kecamatan_id"]
        user_id = current_user["id"]

        if role == "super_admin":
            pasien = Pasien.query.all()
        elif role == "admin_puskesmas":
            pasien = Pasien.query.filter_by(kecamatan_id=kecamatan_id).all()
        else:  # role == "user"
            pasien = Pasien.query.filter_by(user_id=user_id).all()

        data = format_array(pasien)
        return response.success(data, "Berhasil mengambil data pasien")

    except Exception as e:
        print(e)
        return response.bad_request([], "Gagal mengambil data pasien")
    
def get_by_id(id):  
    try:
        pasien = Pasien.query.filter_by(id=id).first()
        if not pasien:
            return response.bad_request([], "Pasien tidak ditemukan")
        data = single_object(pasien)
        return response.success(data, "Berhasil mengambil data pasien")

    except Exception as e:
        print(e)
        return response.bad_request([], "Gagal mengambil data pasien")
    
@jwt_required()    
def edit_pasien(id):
    try:
        pasien = Pasien.query.filter_by(id=id).first()
        if not pasien:
            return response.bad_request([], "Pasien tidak ditemukan")
        
        data = request.get_json()

        pasien.nama = request.json['nama']
        pasien.nik = request.json['nik']
        pasien.alamat = request.json['alamat']
        pasien.tanggal_lahir = request.json['tanggal_lahir']
        pasien.usia = request.json['usia']
        pasien.jenis_kelamin = request.json['jenis_kelamin']
        pasien.no_hp = request.json['no_hp']
        pasien.pekerjaan = request.json['pekerjaan']

        db.session.commit()

        data = single_object(pasien)
        return response.success(data, "Berhasil mengedit data pasien")

    except Exception as e:
        print(e)
        return response.bad_request([], "Gagal mengedit data pasien")
    
def get_pasien_by_kecamatan(kecamatan_id):
    try:
        pasien = Pasien.query.filter_by(kecamatan_id=kecamatan_id).all()
        data = format_array(pasien)
        return response.success(data, "Berhasil mengambil data pasien berdasarkan kecamatan")
    except Exception as e:
        print(e)
        return response.bad_request([], "Gagal mengambil data pasien berdasarkan kecamatan")

@jwt_required()
def delete_pasien(id):
    try:
        pasien = Pasien.query.filter_by(id=id).first()
        if pasien is None:
            return response.bad_request([], "Pasien tidak ditemukan")
        db.session.delete(pasien)
        db.session.commit()
        return response.success([], "Berhasil menghapus data pasien")
    except Exception as e:
        print(e)
        return response.bad_request([], "Gagal menghapus data pasien")


def format_array(datas):
    array = []
    for data_table in datas:
        array.append(single_object(data_table))

    return array

def single_object(data_pasien):
    data_dict = {
        "id": data_pasien.id,
        "user_id": data_pasien.user_id,
        "kecamatan_id": data_pasien.kecamatan_id,
        "nama": data_pasien.nama,
        "nik": data_pasien.nik,
        "alamat": data_pasien.alamat,
        "tanggal_lahir": data_pasien.tanggal_lahir.isoformat(),
        "usia": data_pasien.usia,
        "jenis_kelamin": data_pasien.jenis_kelamin.value,
        "no_hp": data_pasien.no_hp,
        "pekerjaan": data_pasien.pekerjaan,
    }

    #Tampilkan nama kecamatan, kabupaten, dan provinsi
    if data_pasien.kecamatan:
        data_dict["nama_kecamatan"] = data_pasien.kecamatan.nama_kecamatan
        data_dict["nama_kabupaten"] = data_pasien.kecamatan.kabupaten.nama_kabupaten
        data_dict["nama_provinsi"] = data_pasien.kecamatan.kabupaten.provinsi.nama_provinsi

    return data_dict

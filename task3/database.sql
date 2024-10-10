CREATE DATABASE IF NOT EXISTS quan_ly_tram_xang;
USE quan_ly_tram_xang;

CREATE TABLE IF NOT EXISTS tram_xang (
    id_tram_xang int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ten_tram_xang varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS hang_hoa (
   id_hang_hoa int NOT NULL PRIMARY KEY AUTO_INCREMENT,
   ten_hang_hoa varchar(255) NOT NULL,
   don_gia double NOT NULL
);

CREATE TABLE IF NOT EXISTS tru_bom (
	id_tru_bom int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ten_tru_bom varchar(255) NOT NULL,
    id_hang_hoa int NULL,
    id_tram_xang int NOT NULL,
    FOREIGN KEY(id_hang_hoa) REFERENCES hang_hoa(id_hang_hoa),
	FOREIGN KEY(id_tram_xang) REFERENCES tram_xang(id_tram_xang)
);

CREATE TABLE IF NOT EXISTS giao_dich (
	id_giao_dich int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    thoi_gian datetime,
    so_luong double NOT NULL,
    trang_thai_thanh_toan varchar(255) NOT NULL,    
    id_tru_bom int NOT NULL,
    FOREIGN KEY(id_tru_bom) REFERENCES tru_bom(id_tru_bom)
);

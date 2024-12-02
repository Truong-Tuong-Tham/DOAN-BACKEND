CREATE DATABASE quan_ly_viec_lam;
USE quan_ly_viec_lam;
CREATE TABLE NguoiDung (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    phone VARCHAR(20),
    birth_day DATE,
    gender VARCHAR(10),
    role VARCHAR(50),
    skill VARCHAR(200),
    certification VARCHAR(200)
);
INSERT INTO NguoiDung (name, email, password, phone, birth_day, gender, role, skill, certification) 
VALUES
('Nguyen Van A', 'nguyenvana@example.com', 'password123', '0987654321', '1990-01-01', 'male', 'admin', 'JavaScript, HTML, CSS', 'Certified Web Developer'),
('Tran Thi B', 'tranthib@example.com', 'securepass456', '0912345678', '1992-02-15', 'female', 'user', 'Python, Data Analysis', 'Data Science Expert'),
('Le Van C', 'levanc@example.com', 'mypassword789', '0934567890', '1988-03-20', 'male', 'user', 'React, Redux, Node.js', 'Full-Stack Developer'),
('Pham Thi D', 'phamthid@example.com', '123securepass', '0976543210', '1995-04-10', 'female', 'user', 'UI/UX Design', 'Design Masterclass Certificate'),
('Hoang Van E', 'hoangvane@example.com', 'passcode321', '0909876543', '1985-05-25', 'male', 'admin', 'Java, Spring Boot', 'Certified Java Developer'),
('Do Thi F', 'dothif@example.com', 'mypassword123', '0961234567', '1993-06-18', 'female', 'user', 'C++, Embedded Systems', 'IoT Specialist Certificate'),
('Nguyen Van G', 'nguyenvang@example.com', 'securekey456', '0943216789', '1991-07-12', 'male', 'user', 'PHP, Laravel', 'Advanced PHP Certification'),
('Le Thi H', 'lethih@example.com', 'password321', '0923456789', '1990-08-22', 'female', 'user', 'SEO, Content Writing', 'SEO Expert Certificate'),
('Pham Van I', 'phamvani@example.com', 'pass123secure', '0912345670', '1987-09-30', 'male', 'user', 'Ruby on Rails', 'Ruby Developer Certification'),
('Tran Van J', 'tranvanj@example.com', 'secure123pass', '0934567012', '1994-10-15', 'male', 'user', 'Angular, TypeScript', 'Front-End Specialist Certificate');
CREATE TABLE LoaiCongViec (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_loai_cong_viec VARCHAR(200)
);
CREATE TABLE ChiTietLoaiCongViec (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_chi_tiet VARCHAR(200),
    hinh_anh VARCHAR(200),
    ma_loai_cong_viec INT,
    FOREIGN KEY (ma_loai_cong_viec) REFERENCES LoaiCongViec(id)
);
CREATE TABLE CongViec (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_cong_viec VARCHAR(200),
    danh_gia INT,
    gia_tien INT,
    hinh_anh VARCHAR(200),
    mo_ta TEXT,
    mo_ta_ngan VARCHAR(200),
    sao_cong_viec INT,
    ma_chi_tiet_loai INT,
    nguoi_tao INT,
    FOREIGN KEY (ma_chi_tiet_loai) REFERENCES ChiTietLoaiCongViec(id),
    FOREIGN KEY (nguoi_tao) REFERENCES NguoiDung(id)
);
-- Thêm dữ liệu vào bảng LoaiCongViec
INSERT INTO LoaiCongViec (ten_loai_cong_viec) 
VALUES 
('Lập trình web'),
('Thiết kế đồ họa'),
('Phát triển phần mềm'),
('Marketing online'),
('Dịch thuật');

-- Thêm dữ liệu vào bảng ChiTietLoaiCongViec
INSERT INTO ChiTietLoaiCongViec (ten_chi_tiet, hinh_anh, ma_loai_cong_viec)
VALUES
('Frontend Developer', 'frontend.jpg', 1),
('Backend Developer', 'backend.jpg', 1),
('UI Designer', 'ui-designer.jpg', 2),
('Logo Designer', 'logo-designer.jpg', 2),
('Mobile App Developer', 'mobile-app.jpg', 3),
('SEO Specialist', 'seo.jpg', 4),
('Content Writer', 'content-writer.jpg', 4),
('English Translator', 'translator.jpg', 5),
('Chinese Translator', 'chinese-translator.jpg', 5),
('Social Media Marketer', 'social-media.jpg', 4);

-- Thêm dữ liệu vào bảng CongViec
INSERT INTO CongViec (ten_cong_viec, danh_gia, gia_tien, hinh_anh, mo_ta, mo_ta_ngan, sao_cong_viec, ma_chi_tiet_loai, nguoi_tao)
VALUES
('Website Development', 5, 1000000, 'website-development.jpg', 'Phát triển website chuyên nghiệp', 'Phát triển website', 5, 1, 1),
('Backend API Development', 4, 1200000, 'api-development.jpg', 'Xây dựng API cho ứng dụng web', 'Xây dựng API', 4, 2, 2),
('UI Design for Mobile App', 5, 800000, 'ui-design.jpg', 'Thiết kế giao diện người dùng cho ứng dụng di động', 'Thiết kế giao diện', 5, 3, 3),
('Logo Design', 4, 500000, 'logo-design.jpg', 'Thiết kế logo độc đáo và chuyên nghiệp', 'Thiết kế logo', 4, 4, 4),
('Mobile App Development', 5, 1500000, 'mobile-app-development.jpg', 'Phát triển ứng dụng di động đa nền tảng', 'Ứng dụng di động', 5, 5, 5),
('SEO Optimization', 4, 600000, 'seo-optimization.jpg', 'Tối ưu hóa công cụ tìm kiếm', 'Tối ưu hóa SEO', 4, 6, 6),
('Content Writing for Blog', 5, 400000, 'content-writing.jpg', 'Viết nội dung chất lượng cao cho blog', 'Viết blog', 5, 7, 7),
('English to Vietnamese Translation', 4, 300000, 'translation.jpg', 'Dịch tài liệu từ tiếng Anh sang tiếng Việt', 'Dịch thuật', 4, 8, 8),
('Chinese Document Translation', 4, 350000, 'chinese-translation.jpg', 'Dịch tài liệu tiếng Trung', 'Dịch tiếng Trung', 4, 9, 9),
('Social Media Advertising', 5, 700000, 'social-media-advertising.jpg', 'Quảng cáo trên mạng xã hội', 'Quảng cáo MXH', 5, 10, 10);

CREATE TABLE BinhLuan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    noi_dung TEXT,
    sao_binh_luan INT,
    ngay_binh_luan DATETIME,
    ma_nguoi_binh_luan INT,
    ma_cong_viec INT,
    FOREIGN KEY (ma_nguoi_binh_luan) REFERENCES NguoiDung(id),
    FOREIGN KEY (ma_cong_viec) REFERENCES CongViec(id)
);
CREATE TABLE ThueCongViec (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_cong_viec INT,
    ma_nguoi_thue INT,
    ngay_thue DATETIME,
    hoan_thanh BOOLEAN,
    FOREIGN KEY (ma_cong_viec) REFERENCES CongViec(id),
    FOREIGN KEY (ma_nguoi_thue) REFERENCES NguoiDung(id)
);
INSERT INTO ThueCongViec (ma_cong_viec, ma_nguoi_thue, ngay_thue, hoan_thanh)
VALUES 
(1, 10, '2024-12-01 10:00:00', FALSE),
(2, 9, '2024-12-02 11:30:00', TRUE),
(3, 8, '2024-12-03 14:00:00', FALSE),
(4, 7, '2024-12-04 15:45:00', TRUE),
(5, 6, '2024-12-05 09:00:00', FALSE),
(6, 5, '2024-12-06 13:15:00', TRUE),
(7, 4, '2024-12-07 16:30:00', FALSE),
(8, 3, '2024-12-08 12:00:00', TRUE),
(9, 2, '2024-12-09 17:00:00', FALSE),
(10, 1, '2024-12-10 10:30:00', TRUE);
CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
INSERT INTO skills (name) VALUES
('JavaScript'),
('Python'),
('Java'),
('PHP'),
('C#'),
('Ruby'),
('HTML'),
('CSS'),
('React'),
('Node.js'),
('SQL'),
('MongoDB'),
('Git'),
('Docker'),
('AWS');


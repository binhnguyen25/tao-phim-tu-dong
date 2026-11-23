# Tạo Phim Tự Động — Phim Chó, Mèo, Em Bé

Web app tạo phim hoạt hình tự động, giao diện tiếng Việt, chạy hoàn toàn trong trình duyệt, không cần API trả phí.

## Cách dùng

1. Mở trang web, ở **Bước 1** chọn chủ đề phim (Chó / Mèo / Em bé), khổ video (9:16 dọc cho Reels/TikTok hoặc 16:9 ngang cho YouTube), thời lượng (30 giây / 1 phút / 3 phút).
2. Ở **Bước 2** xem 4 nhân vật của chủ đề đã chọn — ảnh và giọng đọc khóa cố định để mọi cảnh đồng nhất. Bấm **Đổi Ảnh** để tải ảnh riêng lên, **Sửa Tên** để đổi tên.
3. Ở **Bước 3** chọn một tập phim, sửa lời thoại từng cảnh nếu muốn, bấm **Duyệt kịch bản** rồi **Xem trước** (có giọng đọc máy) hoặc **Render video** để tải file `.webm` về.

## Nhân vật

| Chủ đề | Nhân vật |
|---|---|
| Phim Chó | Vàng, Mực, Bông, Xu |
| Phim Mèo | Mướp, Mun, Kem, Bánh |
| Phim Em Bé | Bo, Mít, Sữa, Tôm |

Mỗi nhân vật có ảnh chân dung riêng (phong cách Pixar 3D) và giọng đọc riêng (cao độ + tốc độ riêng, đọc bằng giọng máy tiếng Việt trong trình duyệt).

## Kịch bản mẫu

9 tập, mỗi tập 12 cảnh: 3 tập Chó (Vàng đi chợ giúp bà, Bông về quê chơi, Xu lạc đường), 3 tập Mèo (Mướp bắt chuột, Kem đi học, Bánh làm bánh), 3 tập Em Bé (Bo học đi xe đạp, Mít trồng rau, Sữa đi siêu thị).

- 30 giây: dùng 6 cảnh đầu.
- 1 phút: dùng đủ 12 cảnh.
- 3 phút: dùng 12 cảnh với thời lượng dài hơn mỗi cảnh.

## Render

Video render ngay trong trình duyệt bằng canvas + MediaRecorder, xuất file `.webm` (khổ 1080x1920 hoặc 1920x1080). Video xuất ra chưa có tiếng — lời dẫn chỉ phát khi xem trước. Đổi sang `.mp4` bằng CloudConvert hoặc HandBrake.

## Khác với app gốc

App gốc dùng AI tạo hình và giọng đọc trả phí. Bản này dùng ảnh nhân vật vẽ sẵn bằng AI và giọng đọc máy miễn phí trong trình duyệt, nên không tốn phí nhưng hình và giọng đơn giản hơn.

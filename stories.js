// Kịch bản mẫu — Tạo Phim Tự Động
// Mỗi tập 12 cảnh. 30 giây dùng 6 cảnh đầu, 1 phút dùng đủ 12 cảnh, 3 phút dùng 12 cảnh với thời lượng dài hơn.
// bg: que | pho | nha | cho | vuon | song
const EPISODES = [
  // ============ PHIM CHÓ ============
  {
    id: "cho-di-cho",
    topic: "cho",
    title: "Vàng đi chợ giúp bà",
    desc: "Vàng mang giỏ đi chợ quê mua rau giúp bà, gặp đủ chuyện dở khóc dở cười.",
    scenes: [
      { char: "vang", line: "Bà ơi, hôm nay để Vàng đi chợ cho bà nhé!", bg: "nha", action: "vay-tay" },
      { char: "vang", line: "Giỏ đây, tiền đây, Vàng nhớ mua rau muống với cà chua.", bg: "nha", action: "nhan-gio" },
      { char: "vang", line: "Chợ quê sáng nay đông quá, mùi bánh rán thơm ơi là thơm!", bg: "cho", action: "nguoi-thom" },
      { char: "muc", line: "Vàng ơi, Mực giữ chỗ cho cậu rồi này, hàng rau bà Tư tươi lắm!", bg: "cho", action: "vay-tay" },
      { char: "vang", line: "Bà Tư ơi, cho cháu một bó rau muống, hai quả cà chua ạ!", bg: "cho", action: "noi-chuyen" },
      { char: "muc", line: "Cẩn thận, cái giỏ nặng lắm, để Mực xách phụ cho!", bg: "cho", action: "xach-gio" },
      { char: "vang", line: "Ơ, tiền lẻ của mình rơi đâu mất rồi? Mực có thấy không?", bg: "cho", action: "tim-do" },
      { char: "muc", line: "Đây này, nó kẹt dưới chân giỏ, may mà chưa ai nhặt mất!", bg: "cho", action: "nhat-tien" },
      { char: "vang", line: "Mua xong rồi, mình về thôi, bà đang chờ nấu cơm trưa.", bg: "que", action: "di-ve" },
      { char: "vang", line: "Bà ơi, Vàng về rồi, rau tươi lắm, bà xem này!", bg: "nha", action: "khoe" },
      { char: "muc", line: "Bà nấu cơm ngon quá, Mực ở lại ăn cùng nhé bà?", bg: "nha", action: "cuoi" },
      { char: "vang", line: "Đi chợ giúp bà vui thật đấy, mai Vàng lại đi nữa!", bg: "nha", action: "vay-tay" }
    ]
  },
  {
    id: "cho-bong-ve-que",
    topic: "cho",
    title: "Bông về quê chơi",
    desc: "Bông từ thành phố về quê, lần đầu thấy ruộng lúa và gà vịt.",
    scenes: [
      { char: "bong", line: "Lần đầu Bông về quê, sao ở đây xanh mướt thế này!", bg: "que", action: "ngac-nhien" },
      { char: "vang", line: "Bông ơi, đây là ruộng lúa nhà tớ, lúa đang trổ bông đấy!", bg: "que", action: "gioi-thieu" },
      { char: "bong", line: "Áo vest của Bông mà lấm bùn thì sao? Bông sợ bẩn lắm!", bg: "que", action: "lo-lang" },
      { char: "muc", line: "Đừng lo, bùn quê mát lắm, cứ bước xuống thử đi!", bg: "que", action: "dong-vien" },
      { char: "bong", line: "Ôi, mát thật này, bùn mềm như kem vậy!", bg: "que", action: "vui-ve" },
      { char: "xu", line: "Bông ơi, ra vườn hái ổi với Xu đi, ổi chín thơm lắm!", bg: "vuon", action: "vay-tay" },
      { char: "bong", line: "Ổi quê ngọt thật, ngon hơn bánh ở phố nhiều!", bg: "vuon", action: "an-oi" },
      { char: "vang", line: "Chiều nay mình ra bờ sông thả diều nhé, gió to lắm!", bg: "song", action: "vay-tay" },
      { char: "bong", line: "Diều bay cao quá, Bông chưa bao giờ thả diều cả!", bg: "song", action: "ngac-nhien" },
      { char: "muc", line: "Bông giữ dây chắc vào, gió đang lên đấy!", bg: "song", action: "tha-dieu" },
      { char: "xu", line: "Tối nay cả nhà ăn cơm quê, Bông ở lại nhé!", bg: "nha", action: "moi" },
      { char: "bong", line: "Quê vui quá, mai Bông lại xin về quê chơi nữa!", bg: "nha", action: "vui-ve" }
    ]
  },
  {
    id: "cho-xu-lac-duong",
    topic: "cho",
    title: "Xu lạc đường",
    desc: "Xu mải chơi nên lạc đường, cả nhóm cùng nhau tìm đường về.",
    scenes: [
      { char: "xu", line: "Hôm nay phố đông vui quá, Xu đi xem hết hàng này đến hàng khác!", bg: "pho", action: "di-choi" },
      { char: "xu", line: "Ơ, đây là đâu? Sao Xu không thấy nhà mình đâu nữa?", bg: "pho", action: "lo-lang" },
      { char: "xu", line: "Bình tĩnh nào, Xu phải nhớ đường về, nhà mình gần cây đa to.", bg: "pho", action: "suy-nghi" },
      { char: "muc", line: "Xu ơi, cậu ở đâu? Tớ nghe thấy tiếng cậu rồi!", bg: "pho", action: "tim-kiem" },
      { char: "xu", line: "Mực ơi, Xu ở đây, cứu Xu với!", bg: "pho", action: "vay-tay" },
      { char: "muc", line: "Đừng sợ, Mực nhớ đường mà, cứ đi theo tớ!", bg: "pho", action: "dong-vien" },
      { char: "vang", line: "Mực ơi, Vàng cũng đến rồi, Xu có sao không?", bg: "pho", action: "chay-den" },
      { char: "xu", line: "Xu không sao, chỉ sợ thôi, may mà các cậu đến kịp!", bg: "pho", action: "tho-phao" },
      { char: "bong", line: "Lần sau đi chơi phải đi cùng nhau, không được tách nhóm nhé!", bg: "pho", action: "nhac-nho" },
      { char: "xu", line: "Xu nhớ rồi, Xu xin lỗi cả nhà, làm mọi người lo lắng.", bg: "pho", action: "xin-loi" },
      { char: "vang", line: "Về nhà thôi, bà đang đợi, hôm nay bà nấu chè đậu xanh đấy!", bg: "que", action: "vay-tay" },
      { char: "xu", line: "Bạn bè tốt là khi lạc đường vẫn có nhau, Xu yêu các bạn lắm!", bg: "nha", action: "vui-ve" }
    ]
  },

  // ============ PHIM MÈO ============
  {
    id: "meo-muop-bat-chuot",
    topic: "meo",
    title: "Mướp bắt chuột",
    desc: "Mướp lập kế hoạch bắt chuột trong kho thóc, ai ngờ chuột cũng lém lỉnh không kém.",
    scenes: [
      { char: "muop", line: "Kho thóc nhà mình có chuột, Mướp phải ra tay thôi!", bg: "nha", action: "quyet-tam" },
      { char: "mun", line: "Chuột nhanh lắm đấy, cậu phải nhẹ chân như mèo mới được!", bg: "nha", action: "nhac-nho" },
      { char: "muop", line: "Mướp sẽ nấp sau bao thóc, đợi chuột ra là vồ ngay!", bg: "nha", action: "nup" },
      { char: "kem", line: "Kem sẽ canh ở cửa sau, không cho chuột chạy thoát!", bg: "nha", action: "canh-cua" },
      { char: "muop", line: "Suỵt, nghe thấy tiếng gì không? Chuột đang gặm thóc kìa!", bg: "nha", action: "lang-nghe" },
      { char: "banh", line: "Bánh nghe thấy rồi, nó ở góc trái, nhẹ nhàng thôi!", bg: "nha", action: "chi-duong" },
      { char: "muop", line: "Một, hai, ba, vồ! Ơ, nó chạy mất rồi!", bg: "nha", action: "vo-hut" },
      { char: "mun", line: "Đừng vội, chuột sẽ quay lại, mình đặt bẫy phô mai nhé!", bg: "nha", action: "dat-bay" },
      { char: "kem", line: "Miếng phô mai thơm quá, đến Kem còn muốn ăn nữa là!", bg: "nha", action: "cuoi" },
      { char: "muop", line: "Nó ra rồi, nó đang ăn phô mai, lần này chắc chắn bắt được!", bg: "nha", action: "vay-tay" },
      { char: "muop", line: "Bắt được rồi! Kho thóc từ nay an toàn nhé!", bg: "nha", action: "vui-ve" },
      { char: "banh", line: "Mướp giỏi quá, tối nay cả nhà được ăn cá khô thưởng!", bg: "nha", action: "khen" }
    ]
  },
  {
    id: "meo-kem-di-hoc",
    topic: "meo",
    title: "Kem đi học",
    desc: "Ngày đầu Kem đến lớp học của các bạn mèo, học đếm và học hát.",
    scenes: [
      { char: "kem", line: "Hôm nay Kem đi học, hồi hộp quá, không biết lớp có vui không!", bg: "nha", action: "hoi-hop" },
      { char: "muop", line: "Đi học vui lắm, Kem đừng lo, Mướp đi cùng cậu!", bg: "nha", action: "dong-vien" },
      { char: "kem", line: "Cô giáo ơi, Kem đến lớp rồi ạ, Kem ngồi đâu ạ?", bg: "nha", action: "chao-hoi" },
      { char: "mun", line: "Ngồi cạnh tớ này, tớ giữ chỗ cho cậu rồi!", bg: "nha", action: "vay-tay" },
      { char: "kem", line: "Một cộng một bằng hai, Kem đếm đúng rồi này!", bg: "nha", action: "vui-ve" },
      { char: "banh", line: "Giờ hát nào, cả lớp hát bài Mèo con đi học nhé!", bg: "nha", action: "hat" },
      { char: "kem", line: "Meo meo meo, Kem hát hay không cả lớp ơi?", bg: "nha", action: "hat" },
      { char: "muop", line: "Hay lắm, Kem hát to và rõ nhất lớp đấy!", bg: "nha", action: "khen" },
      { char: "kem", line: "Giờ ra chơi, mình chơi đuổi bắt ở sân trường nhé!", bg: "vuon", action: "vay-tay" },
      { char: "mun", line: "Kem chạy nhanh thế, tớ đuổi không kịp luôn!", bg: "vuon", action: "chay" },
      { char: "banh", line: "Tan học rồi, hôm nay ai cũng ngoan, cô khen cả lớp!", bg: "nha", action: "vui-ve" },
      { char: "kem", line: "Đi học vui thật, mai Kem lại đến lớp nữa!", bg: "nha", action: "vay-tay" }
    ]
  },
  {
    id: "meo-banh-lam-banh",
    topic: "meo",
    title: "Bánh làm bánh",
    desc: "Bánh trổ tài làm bánh kem tặng sinh nhật Mướp, cả nhóm cùng vào bếp.",
    scenes: [
      { char: "banh", line: "Hôm nay sinh nhật Mướp, Bánh sẽ làm bánh kem thật ngon!", bg: "nha", action: "quyet-tam" },
      { char: "muop", line: "Thật không? Mướp thích bánh dâu lắm đấy nhé!", bg: "nha", action: "vui-ve" },
      { char: "banh", line: "Đầu tiên, mình đánh trứng với đường cho bông lên!", bg: "nha", action: "lam-banh" },
      { char: "kem", line: "Kem phụ khuấy bột nhé, bột mịn lắm rồi này!", bg: "nha", action: "khuay-bot" },
      { char: "mun", line: "Mun lo phần dâu, rửa sạch rồi cắt lát mỏng thôi!", bg: "nha", action: "cat-dau" },
      { char: "banh", line: "Cho bánh vào lò nào, đợi hai mươi phút là chín!", bg: "nha", action: "nuong-banh" },
      { char: "muop", line: "Thơm quá, cả nhà ai cũng ngửi thấy mùi bánh rồi!", bg: "nha", action: "nguoi-thom" },
      { char: "banh", line: "Phết kem lên, xếp dâu thành hình trái tim nhé!", bg: "nha", action: "trang-tri" },
      { char: "kem", line: "Đẹp quá, chiếc bánh này như trong tiệm vậy!", bg: "nha", action: "khen" },
      { char: "mun", line: "Thắp nến lên, cả nhà cùng hát chúc mừng sinh nhật!", bg: "nha", action: "hat" },
      { char: "muop", line: "Mướp ước rồi, thổi nến thôi, cảm ơn cả nhà nhiều lắm!", bg: "nha", action: "thoi-nen" },
      { char: "banh", line: "Bánh ngon nhất là bánh làm cùng bạn bè, phải không nào?", bg: "nha", action: "vui-ve" }
    ]
  },

  // ============ PHIM EM BÉ ============
  {
    id: "be-bo-xe-dap",
    topic: "em-be",
    title: "Bo học đi xe đạp",
    desc: "Bo tập đi xe đạp hai bánh, ngã mấy lần nhưng không bỏ cuộc.",
    scenes: [
      { char: "bo", line: "Hôm nay Bo sẽ tập đi xe đạp hai bánh như anh lớn!", bg: "vuon", action: "quyet-tam" },
      { char: "mit", line: "Bo cố lên, Mít đứng đây cổ vũ cho Bo này!", bg: "vuon", action: "vay-tay" },
      { char: "bo", line: "Đạp nào, đạp nào, xe chạy rồi, Bo chạy được rồi!", bg: "vuon", action: "dap-xe" },
      { char: "bo", line: "Ôi, xe nghiêng quá, Bo ngã rồi, đau quá!", bg: "vuon", action: "nga" },
      { char: "sua", line: "Bo đừng khóc, ngã là chuyện thường, đứng lên đi tiếp nào!", bg: "vuon", action: "dong-vien" },
      { char: "bo", line: "Bo không khóc đâu, Bo đứng lên tập tiếp đây!", bg: "vuon", action: "dung-len" },
      { char: "tom", line: "Bo giữ tay lái chắc vào, mắt nhìn thẳng phía trước nhé!", bg: "vuon", action: "nhac-nho" },
      { char: "bo", line: "Bo đạp được ba vòng rồi, không ngã nữa này!", bg: "vuon", action: "vui-ve" },
      { char: "mit", line: "Bo giỏi quá, Mít vỗ tay cho Bo này, cố lên!", bg: "vuon", action: "vo-tay" },
      { char: "bo", line: "Bo đi được một vòng sân rồi, nhanh như gió luôn!", bg: "vuon", action: "dap-xe" },
      { char: "sua", line: "Mai Sữa cũng tập xe đạp, Bo dạy Sữa nhé!", bg: "vuon", action: "vay-tay" },
      { char: "bo", line: "Ngã rồi đứng lên, đó mới là người dũng cảm, phải không nào?", bg: "vuon", action: "vui-ve" }
    ]
  },
  {
    id: "be-mit-trong-rau",
    topic: "em-be",
    title: "Mít trồng rau",
    desc: "Mít gieo hạt, tưới nước mỗi ngày và chờ rau lớn lên.",
    scenes: [
      { char: "mit", line: "Hôm nay Mít sẽ trồng rau, hạt giống đây rồi!", bg: "vuon", action: "vay-tay" },
      { char: "bo", line: "Bo đào đất giúp Mít nhé, đất mềm lắm này!", bg: "vuon", action: "dao-dat" },
      { char: "mit", line: "Gieo hạt xuống, lấp đất lại, rồi tưới nước nhẹ nhàng.", bg: "vuon", action: "gieo-hat" },
      { char: "tom", line: "Tưới nước mỗi ngày thì hạt mới nảy mầm được đấy!", bg: "vuon", action: "tuoi-nuoc" },
      { char: "mit", line: "Ngày mai mầm có lên chưa nhỉ? Mít hồi hộp quá!", bg: "vuon", action: "hoi-hop" },
      { char: "bo", line: "Kìa, mầm xanh nhú lên rồi, nhỏ xíu mà dễ thương quá!", bg: "vuon", action: "ngac-nhien" },
      { char: "sua", line: "Sữa tưới nước cho rau này, rau uống no nê nhé!", bg: "vuon", action: "tuoi-nuoc" },
      { char: "mit", line: "Rau lớn nhanh quá, lá xanh mơn mởn luôn!", bg: "vuon", action: "vui-ve" },
      { char: "tom", line: "Nhớ bắt sâu cho rau nhé, sâu ăn lá thì rau đau lắm!", bg: "vuon", action: "nhac-nho" },
      { char: "mit", line: "Thu hoạch thôi, rau mình trồng ngon và sạch nhất!", bg: "vuon", action: "thu-hoach" },
      { char: "bo", line: "Bữa cơm có rau Mít trồng, ai ăn cũng khen ngon!", bg: "nha", action: "vui-ve" },
      { char: "mit", line: "Trồng rau vui thật, mai Mít gieo thêm hạt cà chua nữa!", bg: "vuon", action: "vay-tay" }
    ]
  },
  {
    id: "be-sua-sieu-thi",
    topic: "em-be",
    title: "Sữa đi siêu thị",
    desc: "Sữa cùng mẹ đi siêu thị, học cách chọn đồ và xếp hàng thanh toán.",
    scenes: [
      { char: "sua", line: "Hôm nay Sữa được đi siêu thị với mẹ, thích quá!", bg: "nha", action: "vui-ve" },
      { char: "bo", line: "Nhớ cầm tay mẹ, siêu thị đông lắm đấy Sữa ơi!", bg: "pho", action: "nhac-nho" },
      { char: "sua", line: "Xe đẩy to quá, Sữa ngồi lên xe được không mẹ?", bg: "pho", action: "hoi" },
      { char: "mit", line: "Mình mua sữa trước nhé, sữa để uống cho cao lớn!", bg: "pho", action: "chon-do" },
      { char: "sua", line: "Quả táo đỏ này ngon này, Sữa chọn táo nhé!", bg: "pho", action: "chon-do" },
      { char: "tom", line: "Đừng lấy kẹo nhiều quá, ăn ngọt sâu răng đấy!", bg: "pho", action: "nhac-nho" },
      { char: "sua", line: "Sữa chỉ lấy một gói thôi, Sữa nhớ lời Tôm dặn mà!", bg: "pho", action: "vui-ve" },
      { char: "bo", line: "Đến quầy thanh toán rồi, mình xếp hàng chờ đến lượt nhé!", bg: "pho", action: "xep-hang" },
      { char: "sua", line: "Sữa đưa tiền cho cô thu ngân này, cảm ơn cô ạ!", bg: "pho", action: "tra-tien" },
      { char: "mit", line: "Mua xong rồi, mình xách đồ về nhà thôi!", bg: "pho", action: "vay-tay" },
      { char: "sua", line: "Về nhà Sữa phụ mẹ xếp đồ vào tủ lạnh nhé!", bg: "nha", action: "vui-ve" },
      { char: "tom", line: "Đi siêu thị học được bao nhiêu điều hay, mai mình lại đi nhé!", bg: "nha", action: "vay-tay" }
    ]
  }
];

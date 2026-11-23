// Tạo Phim Tự Động v1.0 — logic chính
const state = {
  topic: 'cho',
  format: '9:16',
  duration: 60,
  characters: [],
  charImages: {},
  episode: null,
  approved: false,
  playing: false,
  raf: null,
  recorder: null,
  chunks: []
};

const TOPIC_META = {
  cho: { title: '🐶 Phim Chó — Quê & Phố', desc: 'Bốn chú chó Vàng, Mực, Bông, Xu với những câu chuyện quê và phố đầy tiếng cười.' },
  meo: { title: '🐱 Phim Mèo — Quê & Phố', desc: 'Bốn chú mèo Mướp, Mun, Kem, Bánh — tinh nghịch, đáng yêu, học được nhiều điều hay.' },
  'em-be': { title: '👶 Phim Em Bé — Gia Đình Linh Mít', desc: 'Bốn em bé Bo, Mít, Sữa, Tôm — những bài học đầu đời thật vui và ấm áp.' }
};

// Dự phòng khi fetch JSON không chạy được (mở file trực tiếp)
const FALLBACK_CHARS = {
  cho: [
    { id: 'vang', name: 'Vàng', file: 'cho-vang.png', voice: { pitch: 0.9, rate: 0.95 }, desc: 'Chó quê Việt Nam, lông vàng nâu, hiền lành, hay giúp bà đi chợ.' },
    { id: 'muc', name: 'Mực', file: 'cho-muc.png', voice: { pitch: 1.1, rate: 1.05 }, desc: 'Chó mực đen tuyền, mắt sáng, lanh lợi, bạn thân của Vàng.' },
    { id: 'bong', name: 'Bông', file: 'cho-bong.png', voice: { pitch: 1.3, rate: 1.0 }, desc: 'Poodle lông kem, mặc áo vest xanh, từ phố thị về quê chơi.' },
    { id: 'xu', name: 'Xu', file: 'cho-xu.png', voice: { pitch: 1.5, rate: 1.05 }, desc: 'Chó cái nhỏ lông trắng pha nâu, điệu đà, sang chảnh.' }
  ],
  meo: [
    { id: 'muop', name: 'Mướp', file: 'meo-muop.png', voice: { pitch: 1.2, rate: 1.05 }, desc: 'Mèo tam thể quê, tinh nghịch, chuyên gia bắt chuột.' },
    { id: 'mun', name: 'Mun', file: 'meo-mun.png', voice: { pitch: 0.9, rate: 0.95 }, desc: 'Mèo đen tuyền, mắt vàng to, bí ẩn nhưng rất hiền.' },
    { id: 'kem', name: 'Kem', file: 'meo-kem.png', voice: { pitch: 1.0, rate: 0.9 }, desc: 'Mèo Anh lông ngắn màu kem, mặt tròn, điềm đạm, ham học.' },
    { id: 'banh', name: 'Bánh', file: 'meo-banh.png', voice: { pitch: 1.5, rate: 1.05 }, desc: 'Mèo Ba Tư lông dài trắng, khéo tay, làm bánh ngon nhất xóm.' }
  ],
  'em-be': [
    { id: 'bo', name: 'Bo', file: 'be-bo.png', voice: { pitch: 1.6, rate: 1.05 }, desc: 'Bé trai 2 tuổi, tóc chỏm, mặc áo bà ba, dũng cảm, không sợ ngã.' },
    { id: 'mit', name: 'Mít', file: 'be-mit.png', voice: { pitch: 1.7, rate: 1.0 }, desc: 'Bé gái 2 tuổi, tóc tết, mặc áo dài nhỏ, ngoan ngoãn, thích trồng rau.' },
    { id: 'sua', name: 'Sữa', file: 'be-sua.png', voice: { pitch: 1.5, rate: 0.95 }, desc: 'Bé trai bụ bẫm, áo phông vàng, má phúng phính, ham ăn.' },
    { id: 'tom', name: 'Tôm', file: 'be-tom.png', voice: { pitch: 1.7, rate: 1.1 }, desc: 'Bé gái tóc ngắn, váy hoa, lém lỉnh, hay nhắc bạn.' }
  ]
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// ---------- Tabs ----------
$$('#tabs .tab').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('#tabs .tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    $('#panel-studio').classList.toggle('hidden', tab !== 'studio');
    $('#panel-topic').classList.toggle('hidden', !(tab === 'cho' || tab === 'meo' || tab === 'em-be'));
    $('#panel-thuvien').classList.toggle('hidden', tab !== 'thuvien');
    if (tab === 'cho' || tab === 'meo' || tab === 'em-be') showTopicTab(tab);
  });
});

function showTopicTab(topic) {
  $('#topicTitle').textContent = TOPIC_META[topic].title;
  $('#topicDesc').textContent = TOPIC_META[topic].desc;
  const grid = $('#topicEpGrid');
  grid.innerHTML = '';
  EPISODES.filter(e => e.topic === topic).forEach(ep => {
    grid.appendChild(episodeCard(ep, () => {
      selectTopic(topic);
      selectEpisode(ep.id);
      $('#tabs .tab[data-tab="studio"]').click();
      document.querySelector('.card:nth-child(3)')?.scrollIntoView({ behavior: 'smooth' });
    }));
  });
}

// ---------- Bước 1: chọn chủ đề / định dạng / thời lượng ----------
function bindPick(rowId, key, cb) {
  $(rowId).addEventListener('click', (e) => {
    const btn = e.target.closest('.pick');
    if (!btn) return;
    $(rowId).querySelectorAll('.pick').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const val = btn.dataset[key];
    state[key] = key === 'duration' ? parseInt(val, 10) : val;
    if (cb) cb();
  });
}
bindPick('#topicRow', 'topic', () => { state.episode = null; state.approved = false; loadCharacters(); renderEpisodes(); hideScript(); });
bindPick('#formatRow', 'format', null);
bindPick('#durationRow', 'duration', () => { if (state.episode) renderScript(); });

function selectTopic(topic) {
  state.topic = topic;
  $$('#topicRow .pick').forEach(b => b.classList.toggle('selected', b.dataset.topic === topic));
  state.episode = null; state.approved = false;
  loadCharacters(); renderEpisodes(); hideScript();
}

// ---------- Bước 2: nhân vật ----------
async function loadCharacters() {
  const topic = state.topic;
  let chars = null;
  try {
    const res = await fetch(`assets/characters/${topic}/characters.json`);
    if (res.ok) chars = await res.json();
  } catch (e) { /* dùng dự phòng */ }
  if (!chars || !chars.length) chars = FALLBACK_CHARS[topic];
  state.characters = chars;
  state.charImages = {};
  chars.forEach(c => {
    const img = new Image();
    img.src = `assets/characters/${topic}/${c.file}`;
    state.charImages[c.id] = img;
  });
  renderCharacters();
}

function renderCharacters() {
  const grid = $('#charGrid');
  grid.innerHTML = '';
  state.characters.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'char-card';
    card.innerHTML = `
      <img src="assets/characters/${state.topic}/${c.file}" alt="${c.name}" onerror="this.style.display='none'">
      <div class="char-body">
        <h4>${c.name}</h4>
        <span class="voice-tag">🎙️ Giọng C${i + 1} • Khóa 100%</span>
        <p>${c.desc}</p>
        <div class="char-actions">
          <button class="mini-btn" data-act="rename" data-id="${c.id}">✏️ Sửa Tên</button>
          <button class="mini-btn" data-act="replace" data-id="${c.id}">📷 Đổi Ảnh</button>
          <input type="file" accept="image/*" class="hidden" data-file="${c.id}">
        </div>
      </div>`;
    grid.appendChild(card);
  });
  grid.querySelectorAll('[data-act="rename"]').forEach(b => b.addEventListener('click', () => {
    const c = state.characters.find(x => x.id === b.dataset.id);
    const name = prompt('Tên mới cho nhân vật:', c.name);
    if (name && name.trim()) { c.name = name.trim(); renderCharacters(); if (state.episode) renderScript(); }
  }));
  grid.querySelectorAll('[data-act="replace"]').forEach(b => b.addEventListener('click', () => {
    grid.querySelector(`input[data-file="${b.dataset.id}"]`).click();
  }));
  grid.querySelectorAll('input[type="file"]').forEach(inp => inp.addEventListener('change', () => {
    const file = inp.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const c = state.characters.find(x => x.id === inp.dataset.file);
    const img = new Image();
    img.src = url;
    state.charImages[c.id] = img;
    const cardImg = inp.closest('.char-card').querySelector('img');
    cardImg.src = url; cardImg.style.display = 'block';
  }));
}

// ---------- Bước 3: tập phim & kịch bản ----------
function episodeCard(ep, onClick) {
  const b = document.createElement('button');
  b.className = 'ep-card' + (state.episode && state.episode.id === ep.id ? ' selected' : '');
  b.innerHTML = `<h4>${ep.title}</h4><p>${ep.desc}</p><span class="eps">12 phân cảnh • Có lời dẫn</span>`;
  b.addEventListener('click', onClick);
  return b;
}
function renderEpisodes() {
  const grid = $('#epGrid');
  grid.innerHTML = '';
  EPISODES.filter(e => e.topic === state.topic).forEach(ep => {
    grid.appendChild(episodeCard(ep, () => selectEpisode(ep.id)));
  });
}
function sceneCount() { return state.duration === 30 ? 6 : 12; }
function activeScenes() {
  return state.episode.scenes.slice(0, sceneCount());
}
function selectEpisode(id) {
  state.episode = EPISODES.find(e => e.id === id);
  state.approved = false;
  renderEpisodes();
  renderScript();
  $('#previewBtn').disabled = true;
  $('#renderBtn').disabled = true;
  $('#approveBtn').disabled = false;
  $('#renderNote').textContent = '';
}
function hideScript() { $('#scriptBox').classList.add('hidden'); }
function renderScript() {
  const box = $('#scriptBox');
  box.classList.remove('hidden');
  $('#scriptTitle').textContent = `📝 Kịch bản: ${state.episode.title} (${sceneCount()} cảnh — ${state.duration >= 60 ? state.duration / 60 + ' phút' : state.duration + ' giây'})`;
  const list = $('#scriptList');
  list.innerHTML = '';
  activeScenes().forEach((s, i) => {
    const li = document.createElement('li');
    const who = state.characters.find(c => c.id === s.char);
    li.innerHTML = `<span class="scene-num">${i + 1}</span><span class="scene-who">${who ? who.name : s.char}</span>`;
    const ta = document.createElement('textarea');
    ta.className = 'scene-line';
    ta.value = s.line;
    ta.rows = 2;
    ta.addEventListener('input', () => { s.line = ta.value; });
    li.appendChild(ta);
    list.appendChild(li);
  });
}

$('#approveBtn').addEventListener('click', () => {
  state.approved = true;
  $('#previewBtn').disabled = false;
  $('#renderBtn').disabled = false;
  $('#approveBtn').disabled = true;
  $('#renderNote').textContent = 'Đã duyệt kịch bản. Bạn có thể xem trước hoặc render video ngay.';
});

// ---------- Bối cảnh vẽ bằng canvas ----------
const BG = {
  que:   { sky: ['#bae6fd', '#fef9c3'], ground: '#86efac', sun: true },
  pho:   { sky: ['#c7d2fe', '#fbcfe8'], ground: '#94a3b8', sun: false },
  nha:   { sky: ['#fde68a', '#fed7aa'], ground: '#d97706', sun: false },
  cho:   { sky: ['#bfdbfe', '#fef3c7'], ground: '#fca5a5', sun: true },
  vuon:  { sky: ['#bbf7d0', '#fef9c3'], ground: '#4ade80', sun: true },
  song:  { sky: ['#fdba74', '#fde68a'], ground: '#38bdf8', sun: true }
};
function drawBackground(ctx, W, H, bgKey, t) {
  const bg = BG[bgKey] || BG.que;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, bg.sky[0]); g.addColorStop(0.62, bg.sky[1]); g.addColorStop(0.62, bg.ground); g.addColorStop(1, bg.ground);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (bg.sun) {
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(W * 0.82, H * 0.14, W * 0.07, 0, Math.PI * 2); ctx.fill();
  }
  // mây trôi
  ctx.fillStyle = 'rgba(255,255,255,.85)';
  const cx = ((t * 20) % (W + 300)) - 150;
  [0.1, 0.22].forEach((y, i) => {
    const x = (cx + i * 260) % (W + 200) - 100;
    ctx.beginPath(); ctx.ellipse(x, H * y, W * 0.09, H * 0.02, 0, 0, Math.PI * 2); ctx.fill();
  });
  // chi tiết theo bối cảnh
  ctx.fillStyle = '#166534';
  if (bgKey === 'que' || bgKey === 'vuon') {
    [[0.12, 0.52], [0.3, 0.55], [0.88, 0.5]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(W * x, H * y, W * 0.06, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#92400e'; ctx.fillRect(W * x - 4, H * y, 8, H * 0.06); ctx.fillStyle = '#166534';
    });
    // nhà quê
    ctx.fillStyle = '#b45309'; ctx.fillRect(W * 0.62, H * 0.46, W * 0.2, H * 0.1);
    ctx.fillStyle = '#7c2d12';
    ctx.beginPath(); ctx.moveTo(W * 0.6, H * 0.46); ctx.lineTo(W * 0.72, H * 0.4); ctx.lineTo(W * 0.84, H * 0.46); ctx.fill();
  }
  if (bgKey === 'pho') {
    for (let i = 0; i < 5; i++) {
      const bw = W * 0.16, bh = H * (0.2 + (i % 3) * 0.07);
      ctx.fillStyle = ['#475569', '#334155', '#64748b'][i % 3];
      ctx.fillRect(W * (0.02 + i * 0.19), H * 0.62 - bh, bw, bh);
      ctx.fillStyle = '#fde68a';
      for (let wy = 0; wy < 3; wy++) for (let wx = 0; wx < 2; wx++)
        ctx.fillRect(W * (0.05 + i * 0.19 + wx * 0.07), H * 0.62 - bh + 12 + wy * 26, 14, 16);
    }
    ctx.fillStyle = '#1e293b'; ctx.fillRect(0, H * 0.62, W, H * 0.05);
    ctx.fillStyle = '#facc15';
    for (let x = 0; x < W; x += 90) ctx.fillRect(x, H * 0.645, 44, 6);
  }
  if (bgKey === 'nha') {
    ctx.fillStyle = '#fff7ed'; ctx.fillRect(W * 0.08, H * 0.1, W * 0.3, H * 0.3);
    ctx.fillStyle = '#bae6fd'; ctx.fillRect(W * 0.11, H * 0.13, W * 0.24, H * 0.24);
    ctx.fillStyle = '#78350f'; ctx.fillRect(W * 0.6, H * 0.5, W * 0.32, H * 0.05);
  }
  if (bgKey === 'cho') {
    for (let i = 0; i < 3; i++) {
      const x = W * (0.06 + i * 0.32);
      ctx.fillStyle = ['#ef4444', '#f59e0b', '#10b981'][i];
      ctx.beginPath(); ctx.moveTo(x, H * 0.42); ctx.lineTo(x + W * 0.1, H * 0.36); ctx.lineTo(x + W * 0.2, H * 0.42); ctx.fill();
      ctx.fillStyle = '#92400e'; ctx.fillRect(x + 8, H * 0.42, W * 0.18, H * 0.1);
    }
  }
  if (bgKey === 'song') {
    ctx.fillStyle = '#0ea5e9'; ctx.fillRect(0, H * 0.62, W, H * 0.38);
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.moveTo(W * 0.3, H * 0.6); ctx.lineTo(W * 0.42, H * 0.66); ctx.lineTo(W * 0.7, H * 0.66); ctx.lineTo(W * 0.62, H * 0.6); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(W * 0.5, H * 0.68, 8, 0, Math.PI * 2); ctx.fill();
  }
}

// ---------- Vẽ cảnh ----------
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.closePath();
}
function wrapText(ctx, text, maxW) {
  const words = text.split(' ');
  const lines = []; let line = '';
  words.forEach(w => {
    const t = line ? line + ' ' + w : w;
    if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; }
    else line = t;
  });
  if (line) lines.push(line);
  return lines;
}

function drawScene(ctx, W, H, scene, idx, total, elapsedInScene, sceneDur, opts) {
  const bgKey = $('#bgSelect').value === 'auto' ? scene.bg : $('#bgSelect').value;
  const t = performance.now() / 1000;
  drawBackground(ctx, W, H, bgKey, t);
  const who = state.characters.find(c => c.id === scene.char);
  const img = who ? state.charImages[who.id] : null;
  const bob = Math.sin(t * 3) * H * 0.008;
  const cx = W / 2, cy = H * 0.42 + bob;
  const R = Math.min(W, H) * 0.26;
  // khung tròn nhân vật
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
  if (img && img.complete && img.naturalWidth) {
    ctx.drawImage(img, cx - R, cy - R, R * 2, R * 2);
  } else {
    ctx.fillStyle = '#fde68a'; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    ctx.fillStyle = '#4338ca'; ctx.font = `900 ${R}px Nunito, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText((who ? who.name : '?')[0], cx, cy);
  }
  ctx.restore();
  ctx.lineWidth = Math.max(6, W * 0.008); ctx.strokeStyle = '#fff';
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  // tên nhân vật
  ctx.fillStyle = 'rgba(15,23,42,.85)';
  roundRect(ctx, cx - W * 0.16, cy + R + 10, W * 0.32, H * 0.045, 20); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = `800 ${Math.round(H * 0.028)}px Nunito, sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(who ? who.name : '', cx, cy + R + 10 + H * 0.023);
  // bong bóng thoại
  const bw = W * 0.86, bx = (W - bw) / 2, by = H * 0.68;
  ctx.font = `700 ${Math.round(H * 0.026)}px Nunito, sans-serif`;
  const lines = wrapText(ctx, scene.line, bw - 48);
  const bh = lines.length * H * 0.036 + 36;
  ctx.fillStyle = 'rgba(255,255,255,.96)';
  roundRect(ctx, bx, by, bw, bh, 22); ctx.fill();
  ctx.strokeStyle = '#c7d2fe'; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = '#1e293b'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  lines.forEach((ln, i) => ctx.fillText(ln, bx + 24, by + 18 + i * H * 0.036));
  // tiêu đề tập ở 2 giây đầu cảnh 1
  if (idx === 0 && elapsedInScene < 2) {
    ctx.fillStyle = 'rgba(15,23,42,.55)'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
    ctx.font = `900 ${Math.round(H * 0.055)}px Nunito, sans-serif`;
    wrapText(ctx, state.episode.title.toUpperCase(), W * 0.8).forEach((ln, i) =>
      ctx.fillText(ln, W / 2, H * 0.42 + i * H * 0.06));
    ctx.font = `700 ${Math.round(H * 0.024)}px Nunito, sans-serif`;
    ctx.fillText('TẠO PHIM TỰ ĐỘNG', W / 2, H * 0.34);
  }
  // thẻ kết ở 2 giây cuối cảnh cuối
  if (idx === total - 1 && elapsedInScene > sceneDur - 2) {
    ctx.fillStyle = 'rgba(15,23,42,.6)'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
    ctx.font = `900 ${Math.round(H * 0.045)}px Nunito, sans-serif`;
    ctx.fillText('HẾT PHIM', W / 2, H * 0.46);
    ctx.font = `700 ${Math.round(H * 0.024)}px Nunito, sans-serif`;
    ctx.fillText('Cảm ơn bạn đã xem • Tạo Phim Tự Động', W / 2, H * 0.52);
  }
  // thanh tiến trình
  const prog = (idx + elapsedInScene / sceneDur) / total;
  ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(0, H - 14, W, 14);
  ctx.fillStyle = '#f59e0b'; ctx.fillRect(0, H - 14, W * prog, 14);
  ctx.fillStyle = 'rgba(15,23,42,.7)';
  ctx.font = `700 ${Math.round(H * 0.02)}px Nunito, sans-serif`; ctx.textAlign = 'right';
  ctx.fillText(`Cảnh ${idx + 1}/${total}`, W - 20, H - 28);
}

// ---------- Giọng đọc ----------
function speakLine(scene) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const who = state.characters.find(c => c.id === scene.char);
  const u = new SpeechSynthesisUtterance(scene.line);
  u.lang = 'vi-VN';
  const v = speechSynthesis.getVoices().find(x => x.lang && x.lang.toLowerCase().startsWith('vi'));
  if (v) u.voice = v;
  if (who) { u.pitch = who.voice.pitch; u.rate = who.voice.rate; }
  speechSynthesis.speak(u);
}

// ---------- Xem trước & render ----------
function canvasSize() {
  return state.format === '9:16' ? { w: 1080, h: 1920 } : { w: 1920, h: 1080 };
}
function stopPlayback() {
  state.playing = false;
  if (state.raf) cancelAnimationFrame(state.raf);
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (state.recorder && state.recorder.state !== 'inactive') { try { state.recorder.stop(); } catch (e) {} }
  $('#renderNote').textContent = '';
}
$('#stopBtn').addEventListener('click', stopPlayback);

function playEpisode(record) {
  if (!state.episode || !state.approved) return;
  stopPlayback();
  const { w, h } = canvasSize();
  const canvas = $('#stage');
  canvas.width = w; canvas.height = h;
  $('#playerCard').classList.remove('hidden');
  $('#downloadLink').classList.add('hidden');
  $('#playerCard').scrollIntoView({ behavior: 'smooth' });
  const ctx = canvas.getContext('2d');
  const scenes = activeScenes();
  const total = state.duration;
  const sceneDur = total / scenes.length;
  let lastScene = -1;
  state.playing = true;
  let recorder = null;
  if (record) {
    const stream = canvas.captureStream(30);
    state.chunks = [];
    recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    state.recorder = recorder;
    recorder.ondataavailable = (e) => { if (e.data.size) state.chunks.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(state.chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = $('#downloadLink');
      a.href = url;
      a.download = `${state.episode.id}-${state.format.replace(':', 'x')}-${state.duration}s.webm`;
      a.classList.remove('hidden');
      addToLibrary(state.episode.title, url, a.download);
      $('#renderNote').textContent = 'Render xong! Bấm "Tải video .webm" để lưu về máy.';
    };
    recorder.start();
    $('#renderNote').textContent = 'Đang render video, vui lòng chờ đủ thời lượng...';
  }
  const t0 = performance.now();
  function frame(now) {
    if (!state.playing) return;
    const elapsed = (now - t0) / 1000;
    if (elapsed >= total) {
      state.playing = false;
      if (recorder && recorder.state !== 'inactive') recorder.stop();
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      if (!record) $('#renderNote').textContent = 'Xem trước xong.';
      return;
    }
    const idx = Math.min(scenes.length - 1, Math.floor(elapsed / sceneDur));
    const inScene = elapsed - idx * sceneDur;
    if (idx !== lastScene) {
      lastScene = idx;
      if (!record) speakLine(scenes[idx]);
    }
    drawScene(ctx, w, h, scenes[idx], idx, scenes.length, inScene, sceneDur);
    state.raf = requestAnimationFrame(frame);
  }
  state.raf = requestAnimationFrame(frame);
}
$('#previewBtn').addEventListener('click', () => playEpisode(false));
$('#renderBtn').addEventListener('click', () => playEpisode(true));

function addToLibrary(title, url, filename) {
  const list = $('#libraryList');
  if (list.querySelector('li') && list.children.length === 1 && list.textContent.includes('Chưa có video')) list.innerHTML = '';
  const li = document.createElement('li');
  const time = new Date().toLocaleString('vi-VN');
  li.innerHTML = `🎬 ${title} — ${time} — <a href="${url}" download="${filename}">Tải lại</a>`;
  list.prepend(li);
}

// ---------- Khởi động ----------
loadCharacters();
renderEpisodes();
if ('speechSynthesis' in window) speechSynthesis.getVoices();

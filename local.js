
/* ---------- 生成 uuid v4 ---------- */
function uuid4() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

/* ---------- 主逻辑 ---------- */
const KEY = 'local_id';      // localStorage 键名
let localId = localStorage.getItem(KEY);

if (!localId) {              // 首次访问：生成并保存
  localId = uuid4();
  localStorage.setItem(KEY, localId);
}

/* ---------- 演示：把值写到页面 ---------- */
// document.getElementById('show').textContent = localId;
// console.log('当前 local_id =', localId);
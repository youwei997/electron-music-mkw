exports.$id = (id) => {
  return document.getElementById(id);
};

// exports.convertDurations = (time) => {
//   // 计算分钟 单位数返回 01 ，多位数返回 010
//   const minutes = "0" + Math.floor(time / 60);
//   // 计算秒 单位数返回 02 ，多位数返回 020
//   const seconds = "0" + Math.floor(time - minutes / 60);
//   return minutes.substr(-2) + ":" + seconds.substr(-2);
// };

exports.convertDurations = (time) => {
  let m = Math.floor(time / 60);
  let s = Math.floor(time - m * 60);
  m = m <= 9 ? "0" + m : m;
  s = s <= 9 ? "0" + s : s;
  console.log(m + ":" + s);
  return m + ":" + s;
};

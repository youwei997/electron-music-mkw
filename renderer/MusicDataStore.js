const Store = require("electron-store");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
class DataStore extends Store {
  constructor(settings) {
    super(settings);
    // 所有音乐的信息
    this.tracks = this.getTracks() || [];
  }
  //保存音乐信息
  saveTracks() {
    this.set("tracks", this.tracks);
    return this;
  }
  //获取音乐信息
  getTracks() {
    return this.get("tracks") || [];
  }
  // 添加音乐信息
  addTracks(tracks) {
    const tracksWithProps = track
      .map((track) => {
        return {
          id: uuidv4(),
          path: track,
          fileName: path.basename(track),
        };
      })
      .filter((track) => {
        const currentTrackPath = this.getTracks().map((track) => track.path);
        return currentTrackPath.indexOf(track.path) < 0;
        // return !currentTrackPath.includes(track.path);
      });
    // 旧的和新的合并
    this.tracks = [...this.tracks, ...tracksWithProps];
    this.saveTracks();
  }
}

module.exports = DataStore;

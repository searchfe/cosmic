export default class RingGroup {
  /** angle size of each piece */
  private pieceAngle = 0;
  public selected = -1;
  public length = 0;
  public setPieceLength(length: number) {
    this.length = length;
    this.pieceAngle = 360 / this.length;
  }
  public setPieceAngle(pieceAngle: number) {
    this.pieceAngle = pieceAngle;
  }
  /** return if updated */
  public update(currentOffsetAngle: number) {
    let selected = Math.floor(currentOffsetAngle / this.pieceAngle + 0.5);
    if (selected == this.length) selected = 0;
    if (this.selected !== selected) {
      this.selected = selected;
      return true;
    }
    return false;
  }
  public reset() {
    this.selected = -1;
  }
}

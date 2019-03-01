export class Str {
  private constructor() {
  }

  public static contains(str: string, strs: string[]): boolean {
    for (let i = 0; i < strs.length; ++i) {
      if (!str.includes(strs[i])) {
        return false
      }
    }
    return true
  }
}

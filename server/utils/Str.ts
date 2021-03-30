export class Str {
  private constructor() {
  }

  public static containsAll(str: string, strs: string[]): boolean {
    for (let i = 0; i < strs.length; ++i) {
      if (!str.toLowerCase().includes(strs[i].toLowerCase())) {
        return false
      }
    }
    return true
  }
  public static containsOne(str: string, strs: string[]): boolean {
    if (!strs.some(v => str.includes(v))) {
        return false
    }
    return true
  }
}

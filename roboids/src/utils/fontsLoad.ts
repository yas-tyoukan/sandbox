// fontの読み込みを待つ（タイムアウトした場合もresolveする）
export function fontsLoad(args: string[]) {
  return new Promise((resolve) => {
    const promises = args.map((font) => document.fonts.load(font));
    const timer = setTimeout(resolve, 2000);
    Promise.all(promises)
      .then(() => {
        resolve(null);
      })
      .catch((e) => resolve(e))
      .finally(() => {
        clearTimeout(timer);
      });
  });
}

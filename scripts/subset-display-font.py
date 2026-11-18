"""Cut the Chinese display serif down to the characters the website's examples use.

The website shows official-site titles in Noto Serif SC (the Google build of Source Han Serif, SIL OFL 1.1).
The full font is about 12 MB, so the site ships a WOFF2 subset of the CJK characters that appear in the
live examples. Latin stays in the system serif (New York), which comes first in --font-display.

Run by hand after adding Chinese text to an example, with fontTools and brotli installed:

    python scripts/subset-display-font.py path/to/NotoSerifSC-SemiBold.otf

Source font: https://github.com/notofonts/noto-cjk (Serif/SubsetOTF/SC). Writes
apps/website/assets/fonts/noto-serif-sc-600.woff2 and noto-serif-sc-600.txt (the characters it covers,
checked by npm test).
"""
import pathlib
import re
import sys

from fontTools import subset

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCES = [*sorted((ROOT / 'skills/deernova-page/references/pages').glob('*.md')), ROOT / 'skills/deernova-style/references/examples.md']
OUT = ROOT / 'apps/website/assets/fonts/noto-serif-sc-600'
CJK = re.compile(r'[　-〿㐀-䶿一-鿿＀-￯]')


def example_text():
    chars = set()
    for path in SOURCES:
        for block in re.findall(r'```html\n(.*?)```', path.read_text(encoding='utf-8'), re.S):
            chars.update(CJK.findall(block))
    return ''.join(sorted(chars))


def main(font_path):
    text = example_text()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']
    options.name_IDs = ['*']
    font = subset.load_font(font_path, options)
    subsetter = subset.Subsetter(options)
    subsetter.populate(text=text)
    subsetter.subset(font)
    subset.save_font(font, f'{OUT}.woff2', options)
    pathlib.Path(f'{OUT}.txt').write_text(text + '\n', encoding='utf-8')
    print(f'{len(text)} characters, {pathlib.Path(f"{OUT}.woff2").stat().st_size // 1024} KB')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])

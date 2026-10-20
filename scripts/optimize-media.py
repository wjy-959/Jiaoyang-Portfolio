"""Create separate display images; preserve every uploaded original and media key."""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib
import json
import sys

root = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[1]
manifest = root / 'public/published/site.json'
state = json.loads(manifest.read_text(encoding='utf-8-sig'))
output = root / 'public/images/optimized'
output.mkdir(parents=True, exist_ok=True)
previews, fingerprints, report = {}, {}, []
for key, url in state['media'].items():
    if not url.startswith('/images/') or key == 'contact-wechat-qr':
        continue
    original = (root / 'public' / url.lstrip('/')).resolve()
    if not original.is_relative_to((root / 'public').resolve()):
        raise ValueError('Invalid media path')
    raw = original.read_bytes()
    if len(raw) < 150_000:
        continue
    digest = hashlib.sha256(raw).hexdigest()
    limit = 2560 if key == 'background' else 1200 if key == 'portrait' or key.startswith(('slide-', 'project-')) else 1800
    name = f'{digest}-{limit}-q90.webp'
    target = output / name
    with Image.open(original) as source:
        if getattr(source, 'is_animated', False):
            continue
        image = ImageOps.exif_transpose(source)
        image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
        image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
        if not target.exists():
            image.save(target, 'WEBP', quality=90, method=6)
        size = target.stat().st_size
        if size >= len(raw) * .85:
            continue
        previews[key] = '/images/optimized/' + name
        fingerprints[key] = digest
        report.append({'key': key, 'originalBytes': len(raw), 'displayBytes': size, 'displaySize': list(image.size)})
state['previews'] = previews
state['fingerprints'] = fingerprints
temporary = manifest.with_suffix('.json.tmp')
temporary.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding='utf-8')
temporary.replace(manifest)
report_path = root / '.history/media-optimization.json'
report_path.parent.mkdir(parents=True, exist_ok=True)
report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'optimized': len(report), 'originalBytes': sum(x['originalBytes'] for x in report), 'displayBytes': sum(x['displayBytes'] for x in report)}))

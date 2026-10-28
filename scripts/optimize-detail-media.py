"""Generate detail display copies without changing originals, keys or layout."""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib
import json
import sys

root = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[1]
public = root / 'public'
manifest = public / 'published/site.json'
state = json.loads(manifest.read_text(encoding='utf-8-sig'))
text = (root / 'src/project-catalog.js').read_text(encoding='utf-8')
projects = json.loads(text.split('const rawData =', 1)[1].split(';', 1)[0])
output = public / 'images/optimized'
output.mkdir(parents=True, exist_ok=True)
mapping, report = {}, []
for project in projects:
    images = [image for field in ('listing', 'aplus', 'products', 'posters') for image in project.get(field, [])]
    images += [dict(image, src=state['media'][image['key']]) for image in state['uploaded'] if image['projectSlug'] == project['slug']]
    for image in images:
        key = image['key']
        original_url = state['media'].get(key) or image['src']
        previous_url = state.get('previews', {}).get(key) or state['media'].get(key) or image.get('preview') or image['src']
        original = public / original_url.lstrip('/')
        previous = public / previous_url.lstrip('/')
        raw = original.read_bytes()
        digest = hashlib.sha256(raw).hexdigest()
        limit = 1600 if image.get('type') in ('aplus', 'posters') else 1400
        with Image.open(original) as source:
            if getattr(source, 'is_animated', False):
                continue
            display = ImageOps.exif_transpose(source)
            # Width controls readability of long artwork; never crop or stretch.
            if display.width > limit:
                display = display.resize((limit, round(display.height * limit / display.width)), Image.Resampling.LANCZOS)
            display = display.convert('RGBA' if 'A' in display.getbands() else 'RGB')
            name = f'{digest}-{limit}-q82.webp'
            target = output / name
            if not target.exists():
                display.save(target, 'WEBP', quality=82, method=6)
        before = previous.stat().st_size
        after = target.stat().st_size
        if after >= before:
            continue
        url = '/images/optimized/' + name
        if key in state['media']:
            state.setdefault('previews', {})[key] = url
            state.setdefault('fingerprints', {})[key] = digest
        else:
            mapping[key] = url
        report.append(dict(key=key, project=project['slug'], before=before, after=after, hidden=bool(state['hidden'].get(key)), url=url))
(root / 'src/detail-previews.json').write_text(json.dumps(mapping, indent=2), encoding='utf-8')
manifest.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding='utf-8')
(root / '.history/detail-compression.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
visible = [row for row in report if not row['hidden']]
print(json.dumps(dict(optimized=len(visible), before=sum(x['before'] for x in visible), after=sum(x['after'] for x in visible))))

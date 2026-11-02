"""Create compatible display copies, leaving the user's AVIF files unchanged."""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib
import json

root = Path(__file__).resolve().parents[1]
mapping = json.loads((root / 'src/avif-replacements.json').read_text(encoding='utf-8'))
result = {}
for key, item in mapping.items():
    source = root / 'public' / item['src'].lstrip('/')
    if item['src'] in result:
        continue
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert('RGB')
        if key != 'contact-wechat-qr' and image.width > 1600:
            image = image.resize((1600, round(image.height * 1600 / image.width)), Image.Resampling.LANCZOS)
        from io import BytesIO
        data = BytesIO()
        extension = 'png' if key == 'contact-wechat-qr' else 'webp'
        image.save(data, 'PNG' if extension == 'png' else 'WEBP', **({} if extension == 'png' else {'quality':85, 'method':4}))
    content = data.getvalue()
    filename = hashlib.sha256(content).hexdigest() + '.' + extension
    destination = root / 'public/images/published' / filename
    destination.write_bytes(content)
    result[item['src']] = '/images/published/' + filename
(root / 'src/avif-fallbacks.json').write_text(json.dumps(result, indent=2), encoding='utf-8')
print('AVIF fallbacks generated:', len(result))

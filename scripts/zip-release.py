from pathlib import Path
import sys
import zipfile

root = Path(sys.argv[1]).resolve()
for name in ('github-source', 'static-site'):
    folder = root / name
    zip_name = 'Jiaoyang-Portfolio.zip' if name == 'github-source' else 'Jiaoyang-Portfolio-static.zip'
    with zipfile.ZipFile(root / zip_name, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
        for file in sorted(folder.rglob('*')):
            if file.is_file():
                archive.write(file, file.relative_to(folder))

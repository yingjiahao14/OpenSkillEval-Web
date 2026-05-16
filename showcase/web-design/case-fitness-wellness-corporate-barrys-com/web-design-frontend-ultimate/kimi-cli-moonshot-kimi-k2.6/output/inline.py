import re

with open('bundle.html', 'r') as f:
    content = f.read()

imports = re.findall(r'import\(`\.\/([^`]+)`\)', content)
print('Found imports:', imports)

for imp in imports:
    filepath = f'dist/assets/{imp}'
    try:
        with open(filepath, 'r') as f:
            file_content = f.read()
        old_import = f'import(`./{imp}`)'
        new_code = 'Promise.resolve("' + file_content.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n') + '")'
        content = content.replace(old_import, new_code)
        print(f'Inlined: {imp}')
    except Exception as e:
        print(f'Error with {imp}: {e}')

with open('bundle.html', 'w') as f:
    f.write(content)

print('Done!')

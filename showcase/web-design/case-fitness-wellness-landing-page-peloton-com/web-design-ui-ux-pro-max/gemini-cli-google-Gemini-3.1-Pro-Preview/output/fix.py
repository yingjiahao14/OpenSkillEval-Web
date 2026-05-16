import os

with open("/app/output/generate_site.py", "r") as f:
    content = f.read()

# I will just keep the first half until the second `# index.html`
idx = content.find("# index.html\nhtml_index = f\"\"\"<!DOCTYPE html>", content.find("# index.html\nhtml_index = f\"\"\"<!DOCTYPE html>") + 1)
if idx != -1:
    content = content[:idx] + "print(\"Generated all files successfully in /app/output\")\n"
    with open("/app/output/generate_site.py", "w") as f:
        f.write(content)

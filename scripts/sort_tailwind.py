import re
from pathlib import Path

root = Path("src")
files = list(root.rglob("*.tsx")) + list(root.rglob("*.ts"))

# Sort space-separated classes in a Tailwind class string. Keep original if empty.
def sort_classes(s):
    parts = s.strip().split()
    if not parts:
        return s
    return " ".join(sorted(parts, key=lambda x: x.lower()))

class_name_pattern = re.compile(r'(className\s*=\s*)(?:\{\s*)?(["\'])([^"\']*?)\2')

# Process a single file text and return the updated content.
def process_file(text):
    text = class_name_pattern.sub(lambda m: f"{m.group(1)}{m.group(2)}{sort_classes(m.group(3))}{m.group(2)}", text)

    res = []
    i = 0
    while True:
        m = text.find('cn(', i)
        if m == -1:
            res.append(text[i:])
            break
        res.append(text[i:m+3])
        j = m + 3
        depth = 1
        in_quote = None
        escaped = False
        while j < len(text) and depth:
            ch = text[j]
            if in_quote:
                if escaped:
                    escaped = False
                elif ch == '\\':
                    escaped = True
                elif ch == in_quote:
                    in_quote = None
            else:
                if ch in '"\'':
                    in_quote = ch
                elif ch == '(':
                    depth += 1
                elif ch == ')':
                    depth -= 1
            j += 1
        chunk = text[m+3:j-1]

        def repl_cn_string(match):
            quote = match.group(1)
            content = match.group(2)
            return quote + sort_classes(content) + quote

        chunk = re.sub(r'(["\'])([^"\']*?)\1', repl_cn_string, chunk)
        res.append(chunk)
        res.append(')')
        i = j

    return ''.join(res)

updated = 0
for path in files:
    text = path.read_text(encoding="utf-8")
    new_text = process_file(text)
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        print(f"Updated {path}")
        updated += 1

print(f"Processed {len(files)} files, updated {updated} files.")

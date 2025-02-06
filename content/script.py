#!/usr/bin/env python3

import os
import re

# Regex to match a line that starts with "socialImage:" (possibly with spaces around it)
# and captures the quoted value. For example, it matches:
# socialImage: "xyz.png"
# capturing group 2 will be xyz.png
pattern = re.compile(r'^(socialImage\s*:\s*)(\S.*)$')

def update_social_image_in_file(filepath):
    """Reads a file line-by-line, updating the socialImage value if present."""
    changed = False
    new_lines = []

    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    for line in lines:
        # Attempt to match the pattern for socialImage property
        match = pattern.match(line)
        if match:
            # group(2) is the original value inside quotes
            original_value = match.group(2)
            # Only update if it doesn't already start with "my_images/"
            if not original_value.startswith('my_images/'):
                new_value = "my_images/" + original_value
                # Construct new line
                line = f'{match.group(1)}{new_value}\n'
                changed = True
        new_lines.append(line)

    # Write back only if changes were made
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f'Updated socialImage in: {filepath}')
    else:
        # Optionally let the user know no changes were needed
        # print(f'No update needed in: {filepath}')
        pass

def main():
    # Root directory to start from; change '.' to another path if needed
    start_path = '.'
    for root, dirs, files in os.walk(start_path):
        for filename in files:
            if filename.endswith('.md'):
                fullpath = os.path.join(root, filename)
                update_social_image_in_file(fullpath)

if __name__ == "__main__":
    main()

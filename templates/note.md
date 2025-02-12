<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
title = await tp.system.prompt("Title");
}
await tp.file.rename(title)
-%>
---
socialImage: my_images/
tags:
aliases:
---
## Ingrédients

- 

## Préparation

1. 
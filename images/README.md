# Portfolio Images

Place project screenshot images in this directory.

## Naming convention

Use descriptive, lowercase filenames with hyphens:

```
riverfront-coffee-co.jpg
three-rivers-animal-rescue.jpg
summit-fitness-fw.jpg
parkview-dental-arts.jpg
steel-city-brewing.jpg
hoosier-home-repairs.jpg
```

## Recommended specs

- **Format:** JPEG or WebP (WebP preferred for smaller file size)
- **Dimensions:** 1200 × 720px minimum (16:10 or 3:2 aspect ratio works well)
- **File size:** Aim for under 200 KB per image (use tools like Squoosh or TinyJPG)

## How to add an image to a project card

Open `index.html` and find the portfolio section. Replace the `.project-placeholder` div with an `<img>` tag:

```html
<!-- Before (placeholder) -->
<div class="project-placeholder color-1" aria-label="Riverfront Coffee Co. website screenshot">
  Riverfront Coffee Co.
</div>

<!-- After (real image) -->
<img
  src="images/riverfront-coffee-co.jpg"
  alt="Screenshot of the Riverfront Coffee Co. website"
  width="600"
  height="360"
  loading="lazy"
>
```

Also update the `aria-label` on the `.project-image` container to match.

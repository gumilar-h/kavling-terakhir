# Burial site images

Drop image files into each site folder using the paths referenced in `src/data/burial-sites.json`.

## Folder layout

```
public/images/
  {site-id}/
    thumbnail.jpg       → list card thumbnail
    gallery-1.jpg       → detail modal gallery (slot 1)
    gallery-2.jpg       → detail modal gallery (slot 2)
    gallery-3.jpg       → detail modal gallery (slot 3)
    gallery-4.jpg       → detail modal gallery (slot 4)
    plots/
      single.jpg        → Single plot card
      double.jpg        → Double plot card (if offered)
      family.jpg        → Family plot card (if offered)
```

## Site folders

| Folder | Location |
|--------|----------|
| `al-azhar-memorial-garden` | Al Azhar Memorial Garden |
| `san-diego-hills-universal` | San Diego Hills Memorial Park |
| `tpu-pondok-ranggon-muslim` | TPU Pondok Ranggon |
| `tpu-tanah-kusir` | TPU Tanah Kusir |
| `graha-sentosa-memorial` | Graha Sentosa Memorial Park |
| `tpu-karet-bivak` | TPU Karet Bivak |
| `tpu-menteng-pulo-buddha` | TPU Menteng Pulo |
| `raudlatul-jannah-memorial` | Raudlatul Jannah Memorial Park |

Use JPG or PNG. Keep filenames lowercase to match the JSON paths. Missing files show a placeholder icon in the app.

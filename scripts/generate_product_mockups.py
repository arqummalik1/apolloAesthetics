from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "productImages"
OUT = ROOT / "public" / "marketing" / "generated"
OUT.mkdir(parents=True, exist_ok=True)


def rgba(hex_color: str, alpha: int = 255):
    hex_color = hex_color.lstrip("#")
    if len(hex_color) == 6:
        r, g, b = tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))
        return (r, g, b, alpha)
    raise ValueError("Expected 6-digit hex color")


def make_vertical_gradient(size, top, bottom):
    width, height = size
    base = Image.new("RGBA", size, top)
    draw = ImageDraw.Draw(base)
    for y in range(height):
        t = y / max(height - 1, 1)
        color = tuple(int(top[i] * (1 - t) + bottom[i] * t) for i in range(4))
        draw.line((0, y, width, y), fill=color)
    return base


def add_glow(canvas, bbox, color, blur_radius):
    glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    draw.ellipse(bbox, fill=color)
    canvas.alpha_composite(glow.filter(ImageFilter.GaussianBlur(blur_radius)))


def cover_crop(image, size, focus=(0.5, 0.5)):
    target_w, target_h = size
    scale = max(target_w / image.width, target_h / image.height)
    resized = image.resize((int(image.width * scale), int(image.height * scale)), Image.Resampling.LANCZOS)
    left = int((resized.width - target_w) * focus[0])
    top = int((resized.height - target_h) * focus[1])
    left = max(0, min(left, resized.width - target_w))
    top = max(0, min(top, resized.height - target_h))
    return resized.crop((left, top, left + target_w, top + target_h))


def rounded_mask(size, radius):
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


def place_panel(canvas, image, box, radius=42, shadow=28, shadow_alpha=90, border=None):
    x, y, w, h = box
    panel = cover_crop(image, (w, h))
    mask = rounded_mask((w, h), radius)
    panel.putalpha(mask)

    shadow_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_layer)
    shadow_draw.rounded_rectangle((x, y + 16, x + w, y + h + 16), radius=radius, fill=(18, 24, 38, shadow_alpha))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(shadow))
    canvas.alpha_composite(shadow_layer)
    canvas.alpha_composite(panel, (x, y))

    if border:
      border_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
      border_draw = ImageDraw.Draw(border_layer)
      border_draw.rounded_rectangle((x, y, x + w, y + h), radius=radius, outline=border, width=3)
      canvas.alpha_composite(border_layer)


def color_grade(image, saturation=1.0, contrast=1.0, brightness=1.0, sharpness=1.0):
    image = ImageEnhance.Color(image).enhance(saturation)
    image = ImageEnhance.Contrast(image).enhance(contrast)
    image = ImageEnhance.Brightness(image).enhance(brightness)
    image = ImageEnhance.Sharpness(image).enhance(sharpness)
    return image


def film_grain(size, opacity=18):
    noise = Image.effect_noise(size, 18).convert("L")
    grain = ImageOps.colorize(noise, (0, 0, 0), (255, 255, 255)).convert("RGBA")
    alpha = Image.new("L", size, opacity)
    grain.putalpha(alpha)
    return grain


front = Image.open(SRC / "IMG_2888.png").convert("RGBA")
back = Image.open(SRC / "IMG_2890.png").convert("RGBA")
close_front = Image.open(SRC / "IMG_2887.png").convert("RGBA")
close_back = Image.open(SRC / "IMG_2893.png").convert("RGBA")


def render_hero_campaign():
    size = (1600, 2000)
    canvas = make_vertical_gradient(size, rgba("#fbf7f1"), rgba("#ead9c5"))
    add_glow(canvas, (850, 40, 1500, 680), rgba("#e2b86f", 130), 120)
    add_glow(canvas, (-160, 1100, 560, 1720), rgba("#203149", 88), 120)

    bg_crop = cover_crop(color_grade(front, saturation=0.65, contrast=0.9, brightness=1.05), size, focus=(0.58, 0.32))
    bg_crop = bg_crop.filter(ImageFilter.GaussianBlur(28))
    bg_crop.putalpha(70)
    canvas.alpha_composite(bg_crop)

    main_crop = front.crop((1220, 650, 2840, 3830))
    main_crop = color_grade(main_crop, saturation=1.05, contrast=1.1, brightness=1.03, sharpness=1.12)
    place_panel(canvas, main_crop, (640, 220, 760, 1360), radius=56, border=rgba("#ffffff", 180))

    inset_crop = back.crop((1030, 250, 2220, 3600))
    inset_crop = color_grade(inset_crop, saturation=0.9, contrast=1.04, brightness=1.03, sharpness=1.1)
    place_panel(canvas, inset_crop, (170, 1010, 390, 600), radius=42, shadow=20, shadow_alpha=72, border=rgba("#d6b880", 180))

    detail_crop = close_front.crop((1140, 460, 2560, 2620))
    detail_crop = color_grade(detail_crop, saturation=0.88, contrast=1.1, brightness=1.0, sharpness=1.08)
    place_panel(canvas, detail_crop, (1030, 1380, 420, 420), radius=36, shadow=18, shadow_alpha=68, border=rgba("#ffffff", 140))

    accent = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(accent)
    draw.rounded_rectangle((100, 120, 580, 860), radius=60, outline=rgba("#ffffff", 80), width=2)
    draw.rounded_rectangle((120, 140, 560, 840), radius=50, outline=rgba("#d6b880", 80), width=2)
    canvas.alpha_composite(accent)
    canvas.alpha_composite(film_grain(size, 14))
    canvas.save(OUT / "premium-hero-campaign.png")


def render_front_mockup():
    size = (1600, 2000)
    canvas = make_vertical_gradient(size, rgba("#f8f4ee"), rgba("#efe2d2"))
    add_glow(canvas, (140, 120, 1180, 1240), rgba("#d9b56c", 120), 150)

    bg_crop = cover_crop(color_grade(close_back, saturation=0.5, contrast=0.95, brightness=1.08), size, focus=(0.63, 0.28))
    bg_crop = bg_crop.filter(ImageFilter.GaussianBlur(36))
    bg_crop.putalpha(82)
    canvas.alpha_composite(bg_crop)

    bottle_crop = front.crop((1410, 780, 2790, 3750))
    bottle_crop = color_grade(bottle_crop, saturation=1.02, contrast=1.12, brightness=1.02, sharpness=1.15)
    place_panel(canvas, bottle_crop, (370, 240, 860, 1460), radius=68, border=rgba("#ffffff", 180))

    glow_layer = Image.new("RGBA", size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    glow_draw.ellipse((260, 1320, 1180, 1780), fill=rgba("#1d2d45", 34))
    canvas.alpha_composite(glow_layer.filter(ImageFilter.GaussianBlur(70)))
    canvas.alpha_composite(film_grain(size, 16))
    canvas.save(OUT / "premium-front-showcase.png")


def render_back_mockup():
    size = (1600, 2000)
    canvas = make_vertical_gradient(size, rgba("#f4f1ed"), rgba("#d6d7db"))
    add_glow(canvas, (860, 180, 1510, 760), rgba("#d8b56d", 110), 110)

    bg_crop = cover_crop(color_grade(back, saturation=0.45, contrast=0.95, brightness=1.04), size, focus=(0.54, 0.3))
    bg_crop = bg_crop.filter(ImageFilter.GaussianBlur(30))
    bg_crop.putalpha(76)
    canvas.alpha_composite(bg_crop)

    bottle_crop = back.crop((980, 140, 2230, 3740))
    bottle_crop = color_grade(bottle_crop, saturation=0.95, contrast=1.1, brightness=1.02, sharpness=1.1)
    place_panel(canvas, bottle_crop, (430, 170, 720, 1560), radius=62, border=rgba("#ffffff", 170))

    reflection = cover_crop(bottle_crop, (480, 760))
    reflection = ImageOps.flip(reflection).filter(ImageFilter.GaussianBlur(10))
    reflection.putalpha(42)
    reflection_canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    reflection_canvas.alpha_composite(reflection, (560, 1540))
    canvas.alpha_composite(reflection_canvas)
    canvas.alpha_composite(film_grain(size, 14))
    canvas.save(OUT / "premium-back-showcase.png")


def render_dropper_mockup():
    size = (1800, 1200)
    canvas = make_vertical_gradient(size, rgba("#1e2634"), rgba("#d8c1a0"))
    add_glow(canvas, (970, 110, 1700, 820), rgba("#d7ae63", 120), 90)
    add_glow(canvas, (-240, 700, 600, 1300), rgba("#e9dfcf", 80), 120)

    bg_crop = cover_crop(color_grade(close_front, saturation=0.55, contrast=0.9, brightness=0.95), size, focus=(0.62, 0.2))
    bg_crop = bg_crop.filter(ImageFilter.GaussianBlur(24))
    bg_crop.putalpha(62)
    canvas.alpha_composite(bg_crop)

    detail_crop = close_front.crop((880, 430, 2500, 2600))
    detail_crop = color_grade(detail_crop, saturation=0.95, contrast=1.15, brightness=1.0, sharpness=1.18)
    place_panel(canvas, detail_crop, (980, 110, 620, 940), radius=52, border=rgba("#ffffff", 120))

    inset_crop = close_back.crop((1280, 650, 2650, 2850))
    inset_crop = color_grade(inset_crop, saturation=0.8, contrast=1.08, brightness=0.95, sharpness=1.08)
    place_panel(canvas, inset_crop, (180, 570, 480, 420), radius=34, shadow=18, shadow_alpha=70, border=rgba("#d6b880", 150))

    canvas.alpha_composite(film_grain(size, 14))
    canvas.save(OUT / "premium-dropper-editorial.png")


render_hero_campaign()
render_front_mockup()
render_back_mockup()
render_dropper_mockup()

print("Generated mockups in", OUT)

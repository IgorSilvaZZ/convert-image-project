from PIL import Image

image_webp = Image.open('./images/OriginalMisturadorBebidas_2.webp')

image_webp.save('OriginalMisturadorBebidas_2.png', 'PNG')
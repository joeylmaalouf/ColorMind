from PIL import Image
import numpy as np

def build_image_bar(color1, color2, filename, width=304, height=228):
	"""
		Makes an alternating bar of colors 1 and 2.
		Colors: in tuple form, (R,G,B), 0:255.
	"""
	im = Image.new("RGB", (width, height))
	pixels = im.load()
	xvals = np.linspace(0, width, 100, dtype=np.int16)
	firstColorFlag = True
	for i in range(1, len(xvals)):
		currentColor = color1 if firstColorFlag else color2
		for x in np.arange(xvals[i-1], xvals[i]):
			for y in range(height):
				pixels[x,y] = currentColor
		firstColorFlag = not (firstColorFlag)
	im.save(filename)

color_to_names_dict = 	{
						(0,0,0):"black", 
						(255,0,0):"red", 
						(0,255,0):"green", 
						(0,0,255):"blue", 
						(255,255,0):"yellow", 
						(0,255,255):"cyan", 
						(255,0,255):"magenta", 
						(255,255,255):"white"
						}
if __name__ == "__main__":
	cn_keys = color_to_names_dict.keys()
	for i in range(len(cn_keys)):
		for j in range(i+1, len(cn_keys)):
			c1 = cn_keys[i]
			c2 = cn_keys[j]
			fn = color_to_names_dict[c1] + "_" + color_to_names_dict[c2]
			filename = "test_images/" + fn + ".png"
			build_image_bar(c1, c2, filename)
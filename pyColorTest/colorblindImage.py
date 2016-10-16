#!/usr/bin/env/python
"""
Takes in an image; returns a version of it which has been "colorblinded".

"""

from PIL import Image
import numpy as np

def joe_blind(filename):
	im = Image.open(filename)
	pixels = im.load()
	for x in range(im.size[0]):
		for y in range(im.size[1]):
			rg_max = max(pixels[x,y][0],pixels[x,y][1])
			rg_avg = (pixels[x,y][0] + pixels[x,y][1]) / 2
			rg_r = pixels[x,y][0]
			rg_g = pixels[x,y][1]
			rg_g_avg = (rg_avg + rg_g)/2
			pixels[x, y] = (rg_g_avg, rg_g_avg, pixels[x,y][2])
	im.save(filename[:-4] + "_norg" + ".jpg")

def rg_mean_blind(filename):
	im = Image.open(filename)
	pixels = im.load()
	for x in range(im.size[0]):
		for y in range(im.size[1]):
			rg_max = max(pixels[x,y][0],pixels[x,y][1])
			rg_avg = (pixels[x,y][0] + pixels[x,y][1]) / 2
			rg_r = pixels[x,y][0]
			rg_g = pixels[x,y][1]
			pixels[x, y] = (rg_r, rg_r, pixels[x,y][2])
	im.save(filename[:-4] + "_rgmean" + ".png")



if __name__ == "__main__":
	joe_blind("vangogh.jpg")

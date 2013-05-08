/*
 * Scraper
 *
 *
 * Scraper is a Javascript plugin that will scour a page for all images URLs,
 * both in <img> tags and as background images to any type of element.
 *
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*globals console, document, window*/

(function (document, window, undefined) {
	"use strict";

	var Scraper = {
		images: [],
		dedupe: true,
		vars: {
			timer: 0
		},
		setup: function () {
			this.images = [];

			return this;
		},
		getImg: function () {
			var i = 0, img = document.images, l = img.length;

			for (i = 0; i < l; i += 1) {
				this.images.push(img[i].getAttribute("src"));
			}

			return this;
		},
		getBackgroundImg: function () {
			var el = document.body.getElementsByTagName("*"), i = 0,
				img = "", l = el.length;

			for (i = 0; i < l; i += 1) {
				img = el[i].style.backgroundImage;

				if (img) {
					img = this.cleanImg(img);
					this.images.push(img);
				}
			}

			return this;
		},
		cleanImg: function (src) {
			return src.replace(/(^url\()|(\))|(")/g, "");
		},
		canonicalizeImg: function () {
			var i = 0, loc = window.location,
				host = loc.hostname, http = loc.protocol, href = loc.href,
				img = this.images, l = img.length, url = [];

			for (i = 0; i < l; i += 1) {
				if (img[i].search(/^http/) === -1) {
					if (img[i][0] === "/") {
						img[i] = [http, "//", host, img[i]].join("");
					} else {
						url = href.split("/");
						url = url.splice(0, url.length - 1);
						url.push(img[i]);
						img[i] = url.join("/");
					}
				}
			}

			return this;
		},
		dedupeImg: function () {
			var i = 0, orig = this.images, unique = [], l = orig.length;

			for (i = 0; i < l; i += 1) {
				if (unique.indexOf(orig[i]) === -1) {
					unique.push(orig[i]);
				}
			}

			this.images = unique;

			return this;
		},
		init: function () {
			this.setup()
				.getImg()
				.getBackgroundImg()
				.canonicalizeImg();

			if (this.dedupe === true) {
				this.dedupeImg();
			}

			return this;
		}
	};

	window.Scraper = Scraper;
}(document, window));
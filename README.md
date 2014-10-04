#Scraper

Scraper is a Javascript plugin that will scour a page for all image URLs, both in `<img>` tags and as background images to any type of element.

##Usage

Include the following in the `<head>` of your document:

```html
<script src="scraper.js"></script>
```

To initalize the plugin, add the following to your document:

```html
<script type="text/javascript">
	window.onload = function () {
		Scraper.init();
	};
</script>
```

To access the scraped images, access the array variable directly:

```js
console.log(Scraper.images);
```

##Deduplication

This plugin offers to deduplicate (the default action) or leave the list of images unaltered. To turn off deduplication, set the `dedupe` variable to `false`:

```js
Scraper.dedupe = false;
```
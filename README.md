# fade-In-Out-Slider
Simple slider for fadeIn &amp; fadeOut slides

## Html
Include two files: Slider.js &amp; Slider.css

```html
<div id="slider">
  <div class="slide"></div>
  <div class="slide"></div>
  <div class="slide"></div>
</div>
```

## JS
```javascript
new Slider({
  id: "slider", // Element id
  dots: true, // Show slides dots
  intervalTime: 3000, // Speed of slider
  transition: null, // css transition (OPTIONAL)
  start: 0 // Start from slide number..
});
```

@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(teal, 700), // The primary color of your application
  accent: md-get-palette-color(teal, 700)) // The accent or secondary color
));

@import "~vue-material/dist/theme/all";

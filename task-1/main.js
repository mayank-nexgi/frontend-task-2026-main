const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
// NEXT BUTTON
nextBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: 340,
    behavior: "smooth",
  });
});
// PREVIOUS BUTTON
prevBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: -340,
    behavior: "smooth",
  });
});

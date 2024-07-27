function generateGraph() {
  const bar1Height = document.getElementById("bar1-height").value;
  const bar1Width = document.getElementById("bar1-width").value;
  const bar2Height = document.getElementById("bar2-height").value;
  const bar2Width = document.getElementById("bar2-width").value;
  const bar3Height = document.getElementById("bar3-height").value;
  const bar3Width = document.getElementById("bar3-width").value;
  const bar4Height = document.getElementById("bar4-height").value;
  const bar4Width = document.getElementById("bar4-width").value;

  document.getElementById("bar1").style.height = bar1Height;
  document.getElementById("bar1").style.width = bar1Width;
  document.getElementById("bar1").textContent = bar1Height;

  document.getElementById("bar2").style.height = bar2Height;
  document.getElementById("bar2").style.width = bar2Width;
  document.getElementById("bar2").textContent = bar2Height;

  document.getElementById("bar3").style.height = bar3Height;
  document.getElementById("bar3").style.width = bar3Width;
  document.getElementById("bar3").textContent = bar3Height;

  document.getElementById("bar4").style.height = bar4Height;
  document.getElementById("bar4").style.width = bar4Width;
  document.getElementById("bar4").textContent = bar4Height;
}

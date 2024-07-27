function calculateCircle(): void {
  const radiusInput: HTMLInputElement = document.getElementById(
    "radius"
  ) as HTMLInputElement;
  const radius: number = parseFloat(radiusInput.value);

  if (isNaN(radius) || radius <= 0) {
    alert("Por favor, informe um raio válido.");
    return;
  }

  const area: number = Math.PI * radius * radius;
  const circumference: number = 2 * Math.PI * radius;

  const areaOutput: HTMLElement = document.getElementById("area");
  const circumferenceOutput: HTMLElement =
    document.getElementById("circumference");

  areaOutput.textContent = area.toFixed(2);
  circumferenceOutput.textContent = circumference.toFixed(2);
}

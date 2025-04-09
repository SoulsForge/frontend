export function downloadObjectAsJson(obj: object, filename: string) {
  const objJson = JSON.stringify(obj, null, 2);
  const blob = new Blob([objJson], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename + ".json";
  link.click();

  URL.revokeObjectURL(url);
  link.remove();
}

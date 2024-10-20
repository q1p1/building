// Calculate the number of bricks required based on area, number of floors, and the area of doors and windows
export function calculateBricks(
  area: number,
  floors: number,
  doors: number,
  windows: number
): number {
  const bricksPerMeter = 47; // Each square meter requires 47 bricks

  // Calculate the area of doors and windows
  const doorArea = 2.2 * 0.9; // Area of a single door (2.20 × 0.90 meters)
  const windowArea = 1.2 * 0.9; // Area of a single window (1.20 × 0.90 meters)

  // Calculate the total area occupied by doors and windows
  const totalDoorArea = doors * doorArea;
  const totalWindowArea = windows * windowArea;

  // Calculate the total wall area (considering the square area of floors minus the area of doors and windows)
  const totalWallArea = area * floors - (totalDoorArea + totalWindowArea);

  // Calculate the number of bricks based on the remaining wall area
  return totalWallArea * bricksPerMeter;
}

// Calculate the amount of cement required based on area, number of floors, and the area of doors and windows
export function calculateCement(
  area: number,
  floors: number,
  doors: number,
  windows: number
): number {
  const cementPerMeter = 0.3; // Amount of cement required per square meter

  // Calculate the area of doors and windows
  const doorArea = 2.2 * 0.9; // Area of a single door (2.20 × 0.90 meters)
  const windowArea = 1.2 * 0.9; // Area of a single window (1.20 × 0.90 meters)

  // Calculate the total area occupied by doors and windows
  const totalDoorArea = doors * doorArea;
  const totalWindowArea = windows * windowArea;

  // Calculate the total wall area (considering the square area of floors minus the area of doors and windows)
  const totalWallArea = area * floors - (totalDoorArea + totalWindowArea);

  // Calculate the amount of cement based on the remaining wall area
  return totalWallArea * cementPerMeter;
}

// Calculate the amount of iron required based on the area and number of floors
export function calculateIron(area: number, floors: number): number {
  const ironPerMeter = 100; // Each square meter requires 100 kilograms of iron
  return area * floors * ironPerMeter;
}

// Validate the input data
export function validateData(
  floors: number,
  area: number,
  rooms: number
): string | null {
  if (floors <= 0) {
    return "The number of floors must be greater than zero";
  }
  if (area <= 0) {
    return "The area must be greater than zero";
  }
  if (rooms < 0) {
    return "The number of rooms must be non-negative";
  }
  return null; // If the data is valid
}

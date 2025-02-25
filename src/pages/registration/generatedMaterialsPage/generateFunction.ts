/**
 * Generates combinations of variant codes and names.
 * @param materialName - The name of the material (e.g., "Book").
 * @param materialCode - The code of the material (e.g., "BOO").
 * @param variants - Array of variants where each contains a name and its possible values.
 * @returns An array of objects with `code` and `name`.
 */
export const generateVariantCombinations = (
    materialName: string,
    materialCode: string,
    variants: { variant: string; values: string[] }[]
  ) => {
    // Helper function to generate cartesian product of arrays
    const cartesianProduct = (arrays: string[][]): string[][] =>
      arrays.reduce(
        (acc, array) => 
          acc.flatMap((accItem) =>
            array.map((item) => [...accItem, item])
          ),
        [[]] as string[][]
      );
  
    // Extract all variant values
    const variantValues = variants.map((variant) => variant.values);
  
    // Generate all combinations using the cartesian product
    const combinations = cartesianProduct(variantValues);
  
    // Map combinations to variant codes and names
    return combinations.map((combination) => {
      const code = `${materialCode}${combination
        .map((value) => value.substring(0, 2).toUpperCase())
        .join('')}`; // Shortened code
      const name = `${materialName}-${combination.join('-')}`; // Extended name
      return { code, name };
    });
  };
  
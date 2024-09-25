export interface CreateRawMaterial{
    materialName: string;
    materialCode: string;
    category: string;
    unitOfMeasure: string;
    reorderLevel: number;
    description?: string;
    hasVariants: boolean;
  }
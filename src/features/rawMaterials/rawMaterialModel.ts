export interface CreateRawMaterial{
    materialName: string;
    materialCode: string;
    category: string;
    unitOfMeasure: string;
    reorderLevel: number;
    description?: string;
    hasVariants: boolean; //boolean
  }

  export interface AddVariant {
    variant: string;
    values: string[];
  }
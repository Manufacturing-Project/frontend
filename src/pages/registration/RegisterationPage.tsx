import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useGetUnitsQuery } from "../../features/units/UnitsApiSlice";
import { useGetCategoriesQuery } from "../../features/categories/CategoryApiSlice";

import { CreateRawMaterial } from "../../features/rawMaterials/rawMaterialModel";
import Toaster, { ToasterRef } from "../../components/molecules/toaster/Toaster";
import { useCreateMaterialMutation } from "../../features/rawMaterials/rawMaterialApiSlice";
import { resetForm } from "../../features/rawMaterials/rawMaterialSlice";
import { VariantsForMaterialPage } from "./variantPage/VaranitsForMaterialPage";
import GeneratedMaterialTable from "./generatedMaterialsPage/GeneratedMaterialPage";
import { MaterialPage } from "./materialPage/MaterialPage";
import { RootState } from "../../store";
import theme from "../../components/theme";
import { generateVariantCombinations } from "./generatedMaterialsPage/generateFunction";
import { useNavigate } from "react-router-dom";

const RegisterationPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { m_name, m_code, category, unit, reorderlevel, description, hasVariants, variants } = useSelector((state: RootState) => state.rawMaterial);

  const [currentPage, setCurrentPage] = useState(1);
  const [createMaterial] = useCreateMaterialMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [finalMaterials, setFinalMaterials] = useState<any[]>([]);
  const toasterRef = useRef<ToasterRef>(null);

  const handleRawMaterial = async () => {
    if (!m_name || !m_code || !category || !unit || !reorderlevel || !description) {
    toasterRef.current?.showToast("Please fill in all required fields.", "warning");
    return;
  }

    const material: CreateRawMaterial = {
      materialName: m_name,
      materialCode: m_code,
      category,
      unitOfMeasure: unit,
      reorderLevel: reorderlevel,
      description,
      hasVariants: hasVariants ?? false,
    };

    try {
      // If the material has variants, move to the variants page
      if (hasVariants) {
        setCurrentPage(2);
      } else {
        // If no variants, create the material directly
        const response = await createMaterial(material).unwrap();
        console.log('Material created successfully:', response);
        dispatch(resetForm());
        toasterRef.current?.showToast('Material created successfully!', 'success');
      }
    } catch (error) {
      console.error('Failed to create material:', error);
      toasterRef.current?.showToast('Failed to create material.', 'error');
    }
  };

  const handleSaveAllMaterials = async () => {
    setIsLoading(true);
    
    try {
      if (finalMaterials.length === 0) {
        toasterRef.current?.showToast('No materials to save.', 'warning');
        setIsLoading(false);
        return;
      }

      // Create materials array for bulk creation
      const materialsToCreate: CreateRawMaterial[] = finalMaterials.map((material) => ({
        materialName: material.name,
        materialCode: material.code,
        category,
        unitOfMeasure: material.unitOfMeasure,
        reorderLevel: material.reorderLevel,
        description: material.description,
        hasVariants: false, // Individual variants don't have sub-variants
      }));

      // Save all materials - you might want to implement a bulk create API
      // For now, we'll create them one by one
      const savePromises = materialsToCreate.map((material) =>
        createMaterial(material).unwrap()
      );

      await Promise.all(savePromises);

      // Show success message
      toasterRef.current?.showToast(
        `Successfully created ${materialsToCreate.length} materials!`,
        'success'
      );
      // Reset form and redirect or close
      dispatch(resetForm());

      setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  
    } catch (error) {
      console.error('Failed to create materials:', error);
      toasterRef.current?.showToast('Failed to create some materials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <MaterialPage
            onNext={handleNext}
          />
        );
      case 2:
        return <VariantsForMaterialPage/>;
      case 3:
        return <GeneratedMaterialTable onMaterialsChange={setFinalMaterials} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      {renderPage()}
  
      {/* Render buttons based on the current page */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", 
          marginTop: "20px",
        }}
      >
        {currentPage === 1 && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "32px" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: theme.colors.primary_color_green,
                color: "#fff",
                width: "120px",
                height: "40px",
                textTransform: "capitalize",
              }}
              onClick={handleRawMaterial}
            >
              Next
            </Button>
          </Box>
        )}
        {currentPage === 2 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "16px",
              marginTop: "32px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              sx={{
                backgroundColor: theme.colors.primary_color_green,
                width: "99px",
                height: "36px",
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{
                backgroundColor: theme.colors.primary_color_green,
                width: "99px",
                height: "36px",
              }}
            >
              Next
            </Button>
          </Box>
        )}
        {currentPage === 3 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "16px",
              marginTop: "32px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              sx={{
                backgroundColor: theme.colors.primary_color_green,
                width: "99px",
                height: "36px",
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveAllMaterials}
              disabled={isLoading}
              sx={{
                backgroundColor: theme.colors.primary_color_green,
                width: "99px",
                height: "36px",
              }}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </Box>
        )}
                  <Toaster ref={toasterRef} />

      </Box>
    </Box>
  );
};

export default RegisterationPage;
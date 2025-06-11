import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useGetUnitsQuery } from "../../features/units/UnitsApiSlice";
import { useGetCategoriesQuery } from "../../features/categories/CategoryApiSlice";

import { CreateRawMaterial } from "../../features/rawMaterials/rawMaterialModel";
import { ToasterRef } from "../../utils/types/molecules/props/toasterProps";
import { useCreateMaterialMutation } from "../../features/rawMaterials/rawMaterialApiSlice";
import { resetForm } from "../../features/rawMaterials/rawMaterialSlice";
import { VariantsForMaterialPage } from "./variantPage/VaranitsForMaterialPage";
import GeneratedMaterialTable from "./generatedMaterialsPage/GeneratedMaterialPage";
import { MaterialPage } from "./materialPage/MaterialPage";
import { RootState } from "../../store";
import theme from "../../components/theme";

const RegisterationPage: React.FC = () => {
  const dispatch = useDispatch();
  const { m_name, m_code, category, unit, reorderlevel, description, hasVariants } = useSelector((state: RootState) => state.rawMaterial);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page (1 = MaterialPage, 2 = VariantsPage, 3 = GeneratedMaterialTable)
  const [createMaterial] = useCreateMaterialMutation();
  const toasterRef = useRef<ToasterRef>(null);

  const handleRawMaterial = async () => {
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
    //   const response = await createMaterial(material).unwrap();
    //   console.log('Material created successfully:', response);
    //   dispatch(resetForm());

    //   // Show success toaster message
    //   toasterRef.current?.showToast('Material created successfully!', 'success');

      // If the material has variants, move to the variants page
      if (hasVariants) {
        setCurrentPage(2); // Move to VariantsForMaterialPage
      } 
    } catch (error) {
      console.error('Failed to create material:', error);

      // Show error toaster message
      toasterRef.current?.showToast('Failed to create material.', 'error');
    }
  };

  const handleBack = () => {
    setCurrentPage(currentPage - 1); // Go to the previous page
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1); // Go to the next page
  };

  const handleSave = () => {
    // setCurrentPage(currentPage + 1); // Go to the next page
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <MaterialPage
            onNext={handleNext}
            // onRawMaterial={handleRawMaterial}
          />
        );
      case 2:
        return <VariantsForMaterialPage/>;
      case 3:
        return <GeneratedMaterialTable />;
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
          justifyContent: "flex-end", // Correct way to align buttons to the right
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
              justifyContent: "flex-end", // Correct alignment for "Back" and "Next"
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
              justifyContent: "flex-end", // Correct alignment for "Back" and "Save"
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
              onClick={handleSave}
              sx={{
                backgroundColor: theme.colors.primary_color_green,
                width: "99px",
                height: "36px",
              }}
            >
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
  
};

export default RegisterationPage;
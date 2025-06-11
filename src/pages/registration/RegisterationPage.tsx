import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToasterRef } from "../../components/molecules/toaster/Toaster";
import { useCreateMaterialMutation } from "../../features/rawMaterials/rawMaterialApiSlice";
import { VariantsForMaterialPage } from "./variantPage/VaranitsForMaterialPage";
import GeneratedMaterialTable from "./generatedMaterialsPage/GeneratedMaterialPage";
import { MaterialPage } from "./materialPage/MaterialPage";
import { RootState } from "../../store";

import {
  Container,
  ButtonsWrapper,
  ButtonsGroup,
  NextButton,
  SmallButton,
} from "./RegisterationPage.styled"

const RegisterationPage: React.FC = () => {
  const dispatch = useDispatch();
  const { m_name, m_code, category, unit, reorderlevel, description, hasVariants } = useSelector(
    (state: RootState) => state.rawMaterial
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [createMaterial] = useCreateMaterialMutation();
  const toasterRef = useRef<ToasterRef>(null);

  const handleRawMaterial = async () => {
    const material = {
      materialName: m_name,
      materialCode: m_code,
      category,
      unitOfMeasure: unit,
      reorderLevel: reorderlevel,
      description,
      hasVariants: hasVariants ?? false,
    };

    try {
      // await createMaterial(material).unwrap();
      // dispatch(resetForm());
      // toasterRef.current?.showToast("Material created successfully!", "success");

      if (hasVariants) {
        setCurrentPage(2);
      }
    } catch (error) {
      console.error("Failed to create material:", error);
      toasterRef.current?.showToast("Failed to create material.", "error");
    }
  };

  const handleBack = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleSave = () => {
    // save logic here
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <MaterialPage onNext={handleNext} />;
      case 2:
        return <VariantsForMaterialPage />;
      case 3:
        return <GeneratedMaterialTable />;
      default:
        return null;
    }
  };

  return (
    <Container>
      {renderPage()}

      <ButtonsWrapper>
        {currentPage === 1 && (
          <ButtonsGroup gap="32px">
            <NextButton onClick={handleRawMaterial}>Next</NextButton>
          </ButtonsGroup>
        )}

        {currentPage === 2 && (
          <ButtonsGroup marginTop="32px">
            <SmallButton onClick={handleBack}>Back</SmallButton>
            <SmallButton onClick={handleNext}>Next</SmallButton>
          </ButtonsGroup>
        )}

        {currentPage === 3 && (
          <ButtonsGroup marginTop="32px">
            <SmallButton onClick={handleBack}>Back</SmallButton>
            <SmallButton onClick={handleSave}>Save</SmallButton>
          </ButtonsGroup>
        )}
      </ButtonsWrapper>
    </Container>
  );
};

export default RegisterationPage;

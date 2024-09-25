import { Box } from "@mui/material";
import React from "react";
import {
  CustomButton,
  InputSelectField,
  InputTextField,
  TextareaField,
} from "../../atoms";
import {
  setMName,
  setMCode,
  setCategory,
  setUnit,
  setReorderLevel,
  setDescription,
  resetForm,
} from "../../../slices/RawMaterialSlice";
import { RootState } from "../../../slices/store/Store";
import { useDispatch, useSelector } from "react-redux";


interface Option {
  id: string;
  name: string;
}

interface Props {
  categoryoption: Option[];
  unitoption: Option[];
  onsubmit: (
    m_name: string,
    m_code: string,
    category: string,
    unit: string,
    reorderlevel: number,
    description: string
  ) => void;
}

const AddRawMaterial: React.FC<Props> = ({
  categoryoption,
  unitoption,
  onsubmit,
}) => {
  
  const dispatch = useDispatch();

  const { m_name, m_code, category, unit, reorderlevel, description } = useSelector(
    (state: RootState) => state.rawMaterial
  );

  const handleRawMaterial = () => {
    onsubmit(m_name, m_code, category, unit, reorderlevel, description);
  };

  return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            width: "1220px",
            marginLeft: "40px",
            gap: "32px",
        }}
    >
      <Box 
        sx={{
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Box
            sx={{
                marginRight: "185px",
            }}
        >
          <InputTextField
            label="Material Name"
            textPlaceholder="Enter Material Name"
            value={m_name}
            onchange={(e) => dispatch(setMName(e.target.value))}
          />
        </Box>
        <Box>
          <InputTextField
            label="Material Code"
            textPlaceholder="Enter Material Code"
            value={m_code}
            onchange={(e) => dispatch(setMCode(e.target.value))}
          />
        </Box>
      </Box>

      <Box
      sx={{
        display: "flex",
          justifyContent: "start",
      }}
      >
        <Box>
          <InputSelectField
            label="Category"
            options={categoryoption}
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          />
        </Box>
        <Box>
          <InputSelectField
            label="Unit"
            options={unitoption}
            value={unit}
            onChange={(e) => dispatch(setUnit(e.target.value))}
          />
        </Box>
      </Box>

      <Box>
        <InputTextField
          label="Re-OrderLevel"
          textPlaceholder="Enter Re-OrderLevel"
          value={reorderlevel}
          onchange={(e) => dispatch(setReorderLevel(Number(e.target.value)))}
        />
      </Box>

      <Box>
        <TextareaField
          label="Description"
          ariaLabel="Description"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
        />
      </Box>

      <Box
        sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
      >
        <Box>
          <CustomButton primary label="Save" onClick={handleRawMaterial} />
        </Box>

        <Box>
          <CustomButton primary label="Cancel" onClick={() => dispatch(resetForm())} />
        </Box>
      </Box>
    </Box>
  );
};

export { AddRawMaterial };

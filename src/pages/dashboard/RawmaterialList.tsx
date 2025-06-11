import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import {
  useGetAllMaterialsQuery,
  useDeleteMaterialMutation,
  useUpdateMaterialMutation,
} from '../../features/rawMaterials/rawMaterialApiSlice';
import EditDialogBox from '../../components/molecules/editTableDialogBox/EditTableDialogBox';
import CustomTable from '../../components/molecules/table/CustomTable';
import { CreateRawMaterial } from '../../features/rawMaterials/rawMaterialModel';

const RawMaterialList: React.FC = () => {
  const { data: materials, isLoading, isError, refetch } = useGetAllMaterialsQuery();
  const [deleteMaterial] = useDeleteMaterialMutation();
  const [updateMaterial] = useUpdateMaterialMutation();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<CreateRawMaterial & { _id?: string } | null>(null);

  const location = useLocation();

  const fields = [
    { label: 'Material Name', name: 'materialName' },
    { label: 'Material Code', name: 'materialCode' },
    { label: 'Category', name: 'category' },
    { label: 'Unit of Measure', name: 'unitOfMeasure' },
    { label: 'Reorder Level', name: 'reorderLevel' },
    { label: 'Description', name: 'description' },
  ];

  useEffect(() => {
    refetch();
  }, [location.pathname]);

  const handleEdit = (material: any) => {
    setSelectedMaterial(material);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this raw material?')) {
      await deleteMaterial(id);
      refetch();
    }
  };

  const handleSave = async (updatedData: Record<string, any>) => {
    try {
      if (selectedMaterial?._id) {
        const mergedData: CreateRawMaterial = {
          ...selectedMaterial,
          ...updatedData,
          reorderLevel: Number(updatedData.reorderLevel),
        };
        delete (mergedData as any)._id;

        await updateMaterial({ materialId: selectedMaterial._id, updateData: mergedData }).unwrap();
        setEditDialogOpen(false);
        console.log('Updated data:', updatedData);
        refetch();
      }
    } catch (err) {
      console.error('Error updating material:', err);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Raw Material List
      </Typography>

      <Paper elevation={3} sx={{ padding: 2, borderRadius: 3 }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Typography color="error">Error loading raw materials.</Typography>
        ) : (
          <CustomTable
            columns={[
              { header: 'Material Name', accessor: 'materialName' },
              { header: 'Material Code', accessor: 'materialCode', align: 'right' },
              { header: 'Category', accessor: 'category', align: 'right' },
              { header: 'Unit', accessor: 'unitOfMeasure', align: 'right' },
              { header: 'Reorder Level', accessor: 'reorderLevel', align: 'right' },
              { header: 'Description', accessor: 'description', align: 'right' },
            ]}
            rows={materials || []}
            onEdit={handleEdit}
            onDelete={(row) => handleDelete(row._id)}
          />
        )}
      </Paper>

      {selectedMaterial && (
        <EditDialogBox
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          initialData={selectedMaterial}
          fields={fields}
          title="Edit Raw Material"
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default RawMaterialList;

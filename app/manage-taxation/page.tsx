import React from 'react'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import Home from '@/components/ManageTaxation/Home'

function ManageTaxation() {
  return (
    <DashboardLayout title="Manage Taxation">
        <Home />
    </DashboardLayout>
  )
}

export default ManageTaxation
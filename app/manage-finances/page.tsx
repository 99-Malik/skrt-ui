import React from 'react'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import Home from '@/components/ManageFinances/Home'

function ManageFinances() {
  return (
    <DashboardLayout title="Manage Finances">
        <Home />
    </DashboardLayout>
  )
}
export default ManageFinances
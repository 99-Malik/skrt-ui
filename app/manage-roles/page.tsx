import React from 'react'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import Home from '@/components/ManageRoles/Home'

function ManageRoles() {
  return (
    <DashboardLayout title="Manage Roles">
        <Home />
    </DashboardLayout>
  )
}

export default ManageRoles;
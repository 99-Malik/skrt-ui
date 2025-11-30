import React from 'react'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import Home from '@/components/ManageServices/Home'

function page() {
  return (
    <DashboardLayout title="Manage Services">
        <Home />
    </DashboardLayout>
  )
}

export default page
import React from 'react'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import Home from '@/components/Settings/Home'

function Settings() {
  return (
    <DashboardLayout title="Settings">
        <Home />
    </DashboardLayout>
  )
}

export default Settings
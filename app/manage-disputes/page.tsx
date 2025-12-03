import React from 'react'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import Home from '@/components/manage-disputes/Home'

function ManageDisputes() {
  return (
    <DashboardLayout title="Manage Disputes">
      <div className="flex flex-col h-full" style={{ height: '100%', maxHeight: '100%' }}>
        <h1 className="text-2xl font-bold text-[#1F2937] mb-6 shrink-0">Manage Disputes</h1>
        <div className="flex-1 min-h-0 overflow-hidden">
          <Home />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageDisputes
import { useState } from 'react'

import CompanyDashboard from './CompanyDashboard'
import BrowseOffices from './BrowseOffices'
import MyOffices from './MyOffices'

const pages = {
  dashboard: CompanyDashboard,
  'browse-offices': BrowseOffices,
  'my-offices': MyOffices,
}

export default function CompanyLayout() {
  const [activePage, setActivePage] = useState('dashboard')

  const ActiveComponent = pages[activePage]

  return (
    <div className='min-h-screen bg-white p-6'>
      <ActiveComponent onNavigate={setActivePage} />
    </div>
  )
}

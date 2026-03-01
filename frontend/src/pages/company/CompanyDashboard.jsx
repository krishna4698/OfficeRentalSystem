import React from 'react'
import CompanySidebar from '../../components/CompanySidebar'
import CompanyNavbar from '../../components/CompanyNavbar'
import AddCompanyAnimation from '../../components/AddCompanyPanel'
import BrowseOffices from './BrowseOffices'
function Companydashboard() {
  return (
    <div>
      <CompanyNavbar/>
     <BrowseOffices/>
    </div>
  )
}

export default Companydashboard

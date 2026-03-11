import React from 'react'
import CompanySidebar from '../../components/CompanySidebar'
import CompanyNavbar from '../../components/CompanyNavbar'
import AddCompanyAnimation from '../../components/AddCompanyPanel'
import BrowseOffices from './BrowseOffices'
import { Layout } from '../../../Layout'
function Companydashboard() {
  return (
    <div>
      <Layout>
         {/* <CompanyNavbar/> */}
     <BrowseOffices/>
      </Layout>
     
    </div>
  )
}

export default Companydashboard

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>

        <Card>
            <CardHeader>
                <CardTitle>Total Sales</CardTitle>
            </CardHeader>
        </Card>
        
    </div>
  )
}

export default Dashboard
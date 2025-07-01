import { MoreHorizontal, ShoppingBag } from 'lucide-react';
import React from 'react'
 const recentAuctions = [
    { id: '#00123', title: 'Pokemon Mewtwo', status: 'Live', bids: '$45.00', timeLeft: '1h 12m', dueDate: '2020-09-28' },
    { id: '#00123', title: 'Pokemon Mewtwo', status: 'Live', bids: '$45.00', timeLeft: '1h 12m', dueDate: '2020-09-28' },
    { id: '#00123', title: 'Pokemon Mewtwo', status: 'Live', bids: '$45.00', timeLeft: '1h 12m', dueDate: '2020-09-28' },
    { id: '#00123', title: 'Pokemon Mewtwo', status: 'Live', bids: '$45.00', timeLeft: '1h 12m', dueDate: '2020-09-28' },
    { id: '#00123', title: 'Pokemon Mewtwo', status: 'Live', bids: '$45.00', timeLeft: '1h 12m', dueDate: '2020-09-28' },
  ];
const SellerRecentAuction = () => {
  return (
    <div className="bg-[#F3F3F3] rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Auction</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bids</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Left</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentAuctions.map((auction, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{auction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-gray-400" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{auction.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {auction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{auction.bids}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{auction.timeLeft}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{auction.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <button className="hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default SellerRecentAuction

import React, { useState } from 'react';
import Title from '../common/Title';
import MyDealSetting from './MyDealSetting';
import PasswordSetting from './PasswordSetting';
import BillingSetting from './BillingSetting';
import NotificationSetting from './NotificationSetting';

const TABS = [
  { label: 'My details', component: <MyDealSetting /> },
  { label: 'Password', component: <PasswordSetting /> },
  // { label: 'Billing', component: <BillingSetting /> },
  // { label: 'Notifications', component: <NotificationSetting /> },
];

const UserSetting = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="text-black bg-white p-2 sm:p-6 rounded-2xl">
      <Title level="title24" className="font-semibold text-black mb-6">
        Setting
      </Title>

      {/* Tab Navigation */}
      <div className="flex items-center sm:gap-6 gap-3 text-sm sm:text-base  border-b border-[#E5E5E5] ">
        {TABS.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-2  whitespace-nowrap font-medium transition border-b-2 ${
              activeTab === index
                ? 'text-[#4275F6] border-[#4275F6]'
                : 'text-gray-600 border-transparent hover:text-[#4275F6]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Component */}
      <div className="mt-6 ">{TABS[activeTab].component}</div>
    </div>
  );
};

export default UserSetting;

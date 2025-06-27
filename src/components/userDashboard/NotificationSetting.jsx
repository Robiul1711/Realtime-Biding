import React, { useState } from "react";
import { Switch } from "@/components/ui/switch"; // adjust path if needed

const NotificationSetting = () => {
  const [settings, setSettings] = useState({
    mention: true,
    reply: true,
    overdue: false,
    assign: true,
    statusUpdate: true,
    daily: true,
    weekly: true,
    monthly: false,
    taskSummary: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="  space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        <p className="text-sm text-gray-500">Select when and how you’ll be notified.</p>
      </div>

      {/* General Notifications */}
      <div className="border-t pt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">General notifications</h3>
        <p className="text-sm text-gray-500 mb-4">
          Select when you’ll be notified when the following changes occur.
        </p>

        <div className="divide-y border border-gray-200 rounded-md">
          {[
            { label: "I'm mentioned in a message", key: "mention" },
            { label: "Someone replies to any message", key: "reply" },
            { label: "A task is overdue", key: "overdue" },
            { label: "I'm Assign a task", key: "assign" },
            { label: "A task status is updated", key: "statusUpdate" },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-800">{label}</span>
              <Switch
                checked={settings[key]}
                onCheckedChange={() => toggle(key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Summary Notifications */}
      <div className="border-t pt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">Summary Notification</h3>
        <p className="text-sm text-gray-500 mb-4">
          Select when you’ll be notified when the following summaries or report are ready.
        </p>

        <div className="divide-y border border-gray-200 rounded-md">
          {[
            { label: "Daily summary", key: "daily" },
            { label: "Weekly summary", key: "weekly" },
            { label: "Monthly summary", key: "monthly" },
            { label: "A task status is updated", key: "taskSummary" },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-800">{label}</span>
              <Switch
                checked={settings[key]}
                onCheckedChange={() => toggle(key)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSetting;

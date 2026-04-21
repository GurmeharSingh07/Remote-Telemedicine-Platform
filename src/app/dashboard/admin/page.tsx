"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

export default function AdminDashboardPage() {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <DashboardLayout role="admin" activeItem={activeItem} onActiveItemChange={setActiveItem}>
      <AdminDashboard activeItem={activeItem} onActiveItemChange={setActiveItem} />
    </DashboardLayout>
  );
}

"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DoctorDashboard from "@/components/dashboard/DoctorDashboard";

export default function DoctorDashboardPage() {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <DashboardLayout role="doctor" activeItem={activeItem} onActiveItemChange={setActiveItem}>
      <DoctorDashboard activeItem={activeItem} onActiveItemChange={setActiveItem} />
    </DashboardLayout>
  );
}

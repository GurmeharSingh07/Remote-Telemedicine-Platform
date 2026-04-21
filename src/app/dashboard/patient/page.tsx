"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PatientDashboard from "@/components/dashboard/PatientDashboard";

export default function PatientDashboardPage() {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <DashboardLayout role="patient" activeItem={activeItem} onActiveItemChange={setActiveItem}>
      <PatientDashboard activeItem={activeItem} onActiveItemChange={setActiveItem} />
    </DashboardLayout>
  );
}

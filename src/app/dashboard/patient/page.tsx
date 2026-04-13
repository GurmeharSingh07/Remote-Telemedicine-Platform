import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PatientDashboard from "@/components/dashboard/PatientDashboard";

export default function PatientDashboardPage() {
  return (
    <DashboardLayout role="patient">
      <PatientDashboard />
    </DashboardLayout>
  );
}
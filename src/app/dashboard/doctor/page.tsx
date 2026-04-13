import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DoctorDashboard from "@/components/dashboard/DoctorDashboard";

export default function DoctorDashboardPage() {
  return (
    <DashboardLayout role="doctor">
      <DoctorDashboard />
    </DashboardLayout>
  );
}
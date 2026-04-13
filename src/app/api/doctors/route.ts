import { NextResponse } from "next/server";

// Mock doctors data
const doctors = [
  {
    id: 1,
    name: "Dr. Priya Menon",
    specialty: "Cardiologist",
    hospital: "Apollo Chennai",
    location: "Chennai, Tamil Nadu",
    rating: 4.9,
    experience: "15 years",
    distance: "2.3 km",
    available: true,
    image: "PM",
  },
  {
    id: 2,
    name: "Dr. Rahul Sharma",
    specialty: "Neurologist",
    hospital: "Fortis Mumbai",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    experience: "12 years",
    distance: "4.1 km",
    available: true,
    image: "RS",
  },
  {
    id: 3,
    name: "Dr. Sunita Devi",
    specialty: "Dermatologist",
    hospital: "Max Healthcare",
    location: "Delhi",
    rating: 4.7,
    experience: "10 years",
    distance: "5.8 km",
    available: false,
    image: "SD",
  },
  {
    id: 4,
    name: "Dr. Arjun Patel",
    specialty: "Orthopedic",
    hospital: "Medanta Gurgaon",
    location: "Gurgaon, Haryana",
    rating: 4.9,
    experience: "18 years",
    distance: "7.2 km",
    available: true,
    image: "AP",
  },
  {
    id: 5,
    name: "Dr. Kavita Singh",
    specialty: "Pediatrician",
    hospital: "Manipal Bangalore",
    location: "Bangalore, Karnataka",
    rating: 4.8,
    experience: "14 years",
    distance: "3.5 km",
    available: true,
    image: "KS",
  },
  {
    id: 6,
    name: "Dr. Vikram Reddy",
    specialty: "Gastroenterologist",
    hospital: "Yashoda Hyderabad",
    location: "Hyderabad, Telangana",
    rating: 4.6,
    experience: "11 years",
    distance: "8.9 km",
    available: true,
    image: "VR",
  },
  {
    id: 7,
    name: "Dr. Meera Nair",
    specialty: "Ophthalmologist",
    hospital: "Aravind Eye Hospital",
    location: "Madurai, Tamil Nadu",
    rating: 4.9,
    experience: "16 years",
    distance: "1.2 km",
    available: true,
    image: "MN",
  },
  {
    id: 8,
    name: "Dr. Suresh Kumar",
    specialty: "General Physician",
    hospital: "Apollo Chennai",
    location: "Chennai, Tamil Nadu",
    rating: 4.5,
    experience: "8 years",
    distance: "0.8 km",
    available: true,
    image: "SK",
  },
  // New departments
  {
    id: 9,
    name: "Dr. Rajesh Gupta",
    specialty: "Pulmonologist",
    hospital: "Max Delhi",
    location: "Delhi",
    rating: 4.7,
    experience: "13 years",
    distance: "4.5 km",
    available: true,
    image: "RG",
  },
  {
    id: 10,
    name: "Dr. Anjali Verma",
    specialty: "Radiologist",
    hospital: "Apollo Mumbai",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    experience: "10 years",
    distance: "6.2 km",
    available: true,
    image: "AV",
  },
  {
    id: 11,
    name: "Dr. Amitabh Singh",
    specialty: "Oncologist",
    hospital: "Tata Memorial",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    experience: "20 years",
    distance: "5.1 km",
    available: true,
    image: "AS",
  },
  {
    id: 12,
    name: "Dr. Pooja Sharma",
    specialty: "Nephrologist",
    hospital: "Fortis Chennai",
    location: "Chennai, Tamil Nadu",
    rating: 4.6,
    experience: "9 years",
    distance: "3.8 km",
    available: true,
    image: "PS",
  },
  {
    id: 13,
    name: "Dr. Deepak Malhotra",
    specialty: "Urologist",
    hospital: "Medanta Gurgaon",
    location: "Gurgaon, Haryana",
    rating: 4.7,
    experience: "15 years",
    distance: "8.3 km",
    available: true,
    image: "DM",
  },
  {
    id: 14,
    name: "Dr. Lakshmi Narayanan",
    specialty: "Psychiatrist",
    hospital: "NIMHANS Bangalore",
    location: "Bangalore, Karnataka",
    rating: 4.9,
    experience: "17 years",
    distance: "2.9 km",
    available: true,
    image: "LN",
  },
  {
    id: 15,
    name: "Dr. Radhika Iyer",
    specialty: "Gynecologist",
    hospital: "Cloudnine Chennai",
    location: "Chennai, Tamil Nadu",
    rating: 4.8,
    experience: "12 years",
    distance: "1.5 km",
    available: true,
    image: "RI",
  },
  {
    id: 16,
    name: "Dr. Sanjay Joshi",
    specialty: "ENT",
    hospital: "Apollo Chennai",
    location: "Chennai, Tamil Nadu",
    rating: 4.6,
    experience: "11 years",
    distance: "4.2 km",
    available: true,
    image: "SJ",
  },
  {
    id: 17,
    name: "Dr. Neha Agarwal",
    specialty: "Endocrinologist",
    hospital: "Max Healthcare",
    location: "Delhi",
    rating: 4.7,
    experience: "10 years",
    distance: "5.6 km",
    available: true,
    image: "NA",
  },
  {
    id: 18,
    name: "Dr. Kiran Rao",
    specialty: "Vascular Surgeon",
    hospital: "Fortis Mumbai",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    experience: "14 years",
    distance: "7.1 km",
    available: true,
    image: "KR",
  },
  {
    id: 19,
    name: "Dr. Manish Bansal",
    specialty: "Rheumatologist",
    hospital: "Medanta Gurgaon",
    location: "Gurgaon, Haryana",
    rating: 4.6,
    experience: "9 years",
    distance: "6.8 km",
    available: true,
    image: "MB",
  },
  {
    id: 20,
    name: "Dr. Shweta Sinha",
    specialty: "Neurologist",
    hospital: "AIIMS Delhi",
    location: "Delhi",
    rating: 4.9,
    experience: "16 years",
    distance: "3.2 km",
    available: true,
    image: "SS",
  },
];

// Mock referrals data
const referrals = [
  {
    id: 1,
    fromDoctor: "Dr. Priya Menon",
    toDoctor: "Dr. Rahul Sharma",
    patientName: "Rahul Sharma",
    reason: "Need specialized neurological consultation",
    status: "pending",
    date: "2026-04-08",
  },
  {
    id: 2,
    fromDoctor: "Dr. Sunita Devi",
    toDoctor: "Dr. Arjun Patel",
    patientName: "Priya Menon",
    reason: "Joint pain requires orthopedic evaluation",
    status: "accepted",
    date: "2026-04-07",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get("specialty");
  const location = searchParams.get("location");
  const action = searchParams.get("action");

  // Return doctors list
  if (action === "doctors") {
    let filteredDoctors = [...doctors];

    if (specialty && specialty !== "all") {
      filteredDoctors = filteredDoctors.filter(d =>
        d.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      doctors: filteredDoctors,
      total: filteredDoctors.length,
    });
  }

  // Return referrals
  if (action === "referrals") {
    return NextResponse.json({
      success: true,
      referrals: referrals,
    });
  }

  // Return single doctor by ID
  const doctorId = searchParams.get("id");
  if (doctorId) {
    const doctor = doctors.find(d => d.id === parseInt(doctorId));
    if (doctor) {
      return NextResponse.json({ success: true, doctor });
    }
    return NextResponse.json({ success: false, error: "Doctor not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    doctors: doctors,
    total: doctors.length,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action } = body;

  // Create new referral
  if (action === "createReferral") {
    const newReferral = {
      id: referrals.length + 1,
      fromDoctor: body.fromDoctor,
      toDoctor: body.toDoctor,
      patientName: body.patientName,
      reason: body.reason,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };

    return NextResponse.json({
      success: true,
      referral: newReferral,
      message: "Referral sent successfully",
    });
  }

  // Update referral status
  if (action === "updateReferral") {
    const { referralId, status } = body;

    return NextResponse.json({
      success: true,
      message: `Referral ${status} successfully`,
    });
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
}
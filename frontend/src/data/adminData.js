import {
  BarChart3,
  Bell,
  BookOpen,
  ChartColumnBig,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Cpu,
  FileCheck2,
  GraduationCap,
  LayoutGrid,
  Search,
  Settings as SettingsIcon,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Users2,
} from "lucide-react";

export const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "approvals", label: "User Approval", icon: CheckCircle2 },
  { id: "management", label: "User Management", icon: Users2 },
  { id: "students", label: "Students", icon: Users },
  { id: "teachers", label: "Teachers", icon: GraduationCap },
  { id: "analytics", label: "Analytics", icon: ChartColumnBig },
  { id: "tests", label: "Test Management", icon: ClipboardCheck },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

export const headerMeta = {
  title: "Admin Control Center",
  searchPlaceholder: "Search students, tests, or institutes",
  profileName: "Aarav Singh",
  profileRole: "Super Admin",
  profileInitials: "AS",
  notificationCount: 6,
};

export const dashboardStats = [
  {
    id: "students",
    title: "Total Students",
    value: 24800,
    suffix: "K",
    change: 12.4,
    trend: "up",
    description: "Active learners across 42 institutes",
    icon: Users,
    accent: "from-cyan-500/20 to-cyan-400/5",
  },
  {
    id: "teachers",
    title: "Total Teachers",
    value: 1320,
    suffix: "+",
    change: 8.1,
    trend: "up",
    description: "Verified educators onboarded this quarter",
    icon: GraduationCap,
    accent: "from-fuchsia-500/20 to-fuchsia-400/5",
  },
  {
    id: "approvals",
    title: "Pending Approvals",
    value: 184,
    suffix: "",
    change: -5.2,
    trend: "down",
    description: "Instructor and student requests awaiting review",
    icon: ShieldAlert,
    accent: "from-amber-500/20 to-orange-400/5",
  },
  {
    id: "tests",
    title: "Active Tests",
    value: 96,
    suffix: "",
    change: 4.8,
    trend: "up",
    description: "Live assessments scheduled for this week",
    icon: FileCheck2,
    accent: "from-emerald-500/20 to-emerald-400/5",
  },
  {
    id: "suspended",
    title: "Suspended Accounts",
    value: 27,
    suffix: "",
    change: -2.1,
    trend: "down",
    description: "Accounts under policy review or pause",
    icon: ShieldCheck,
    accent: "from-rose-500/20 to-rose-400/5",
  },
  {
    id: "performance",
    title: "Platform Performance",
    value: 98.4,
    suffix: "%",
    change: 1.2,
    trend: "up",
    description: "Service reliability across the learning stack",
    icon: Cpu,
    accent: "from-violet-500/20 to-violet-400/5",
  },
];

export const approvalRequests = [
  {
    id: 1,
    name: "Mina Patel",
    email: "mina@puneinstitute.edu",
    role: "Teacher",
    institute: "Pune Coding Institute",
    registrationDate: "2026-06-28",
    status: "Pending",
  },
  {
    id: 2,
    name: "Rohan Verma",
    email: "rohan@student.devcamp.com",
    role: "Student",
    institute: "DevCamp Academy",
    registrationDate: "2026-06-27",
    status: "Pending",
  },
  {
    id: 3,
    name: "Anika Sharma",
    email: "anika@codeverse.org",
    role: "Teacher",
    institute: "CodeVerse Labs",
    registrationDate: "2026-06-25",
    status: "Review",
  },
  {
    id: 4,
    name: "Neha Rao",
    email: "neha@student.codecraft.io",
    role: "Student",
    institute: "CodeCraft School",
    registrationDate: "2026-06-20",
    status: "Approved",
  },
];

export const userManagementUsers = [
  {
    id: 1,
    name: "Mina Patel",
    role: "Teacher",
    institute: "Pune Coding Institute",
    status: "Active",
    lastActive: "2h ago",
    initials: "MP",
  },
  {
    id: 2,
    name: "Rohan Verma",
    role: "Student",
    institute: "DevCamp Academy",
    status: "Suspended",
    lastActive: "1d ago",
    initials: "RV",
  },
  {
    id: 3,
    name: "Sanjay Rao",
    role: "Teacher",
    institute: "FutureCode University",
    status: "Active",
    lastActive: "20m ago",
    initials: "SR",
  },
  {
    id: 4,
    name: "Aditi Nair",
    role: "Student",
    institute: "BrightPath College",
    status: "Active",
    lastActive: "3h ago",
    initials: "AN",
  },
];

export const userFilters = ["All", "Teacher", "Student", "Active", "Suspended"];

export const analyticsData = {
  monthlyActiveUsers: [
    { month: "Jan", value: 12400 },
    { month: "Feb", value: 13800 },
    { month: "Mar", value: 14900 },
    { month: "Apr", value: 16100 },
    { month: "May", value: 17800 },
    { month: "Jun", value: 19200 },
  ],
  examStats: [
    { name: "DSA", value: 82 },
    { name: "System Design", value: 71 },
    { name: "Frontend", value: 91 },
    { name: "Backend", value: 78 },
  ],
  platformUsage: [
    { name: "Practice", value: 42 },
    { name: "Live Tests", value: 28 },
    { name: "Mentorship", value: 18 },
    { name: "Reports", value: 12 },
  ],
  studentPerformance: [
    { name: "Excellent", value: 48 },
    { name: "Good", value: 31 },
    { name: "Needs Review", value: 21 },
  ],
  teacherPerformance: [
    { month: "Jan", teachers: 42, students: 128 },
    { month: "Feb", teachers: 49, students: 146 },
    { month: "Mar", teachers: 54, students: 162 },
    { month: "Apr", teachers: 61, students: 178 },
    { month: "May", teachers: 67, students: 194 },
    { month: "Jun", teachers: 74, students: 210 },
  ],
};

export const testData = [
  {
    id: 1,
    name: "Midterm Coding Sprint",
    teacher: "Dr. Asha Reddy",
    batch: "Batch 2026-A",
    questions: 24,
    duration: "90 min",
    status: "Published",
  },
  {
    id: 2,
    name: "System Design Challenge",
    teacher: "Mina Patel",
    batch: "Batch 2026-B",
    questions: 18,
    duration: "60 min",
    status: "Scheduled",
  },
  {
    id: 3,
    name: "Frontend Debugging Lab",
    teacher: "Nikhil Jain",
    batch: "Batch 2026-C",
    questions: 32,
    duration: "120 min",
    status: "Draft",
  },
];

export const profileSettings = {
  profilePicture: "",
  fullName: "Aarav Singh",
  email: "aarav@codeguru.ai",
  phone: "+91 98765 43210",
  organization: "CodeGuru Labs",
  role: "Platform Administrator",
};

export const quickFacts = [
  { label: "Active Institutes", value: "42" },
  { label: "Monthly Active Users", value: "19.2K" },
  { label: "Exam Completion", value: "86%" },
  { label: "Avg. Satisfaction", value: "4.8/5" },
];

export const icons = {
  search: Search,
  bell: Bell,
  chevronDown: ChevronDown,
  sparkles: Sparkles,
  trending: TrendingUp,
  book: BookOpen,
  clock: Clock3,
};

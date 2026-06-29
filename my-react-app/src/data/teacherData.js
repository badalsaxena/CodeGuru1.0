export const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "create-test", label: "Create Test", icon: "PlusCircle" },
  { id: "questions", label: "Coding Questions", icon: "Code2" },
  { id: "monitoring", label: "Live Monitoring", icon: "ScanEye" },
  { id: "reports", label: "Reports", icon: "BarChart3" },
  { id: "notifications", label: "Notifications", icon: "BellRing" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

export const teacherProfile = {
  name: "Dr. Maya Chen",
  role: "Senior Instructor",
  badge: "AI Proctoring Enabled",
  searchPlaceholder: "Search students, tests, or alerts",
};

export const stats = [
  {
    id: 1,
    title: "Total Students",
    value: "2,840",
    change: "+12.4%",
    trend: "up",
    icon: "Users",
    accent: "from-emerald-500/20 to-cyan-500/10",
  },
  {
    id: 2,
    title: "Active Tests",
    value: "24",
    change: "+8.1%",
    trend: "up",
    icon: "FileCheck2",
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    id: 3,
    title: "Coding Questions",
    value: "186",
    change: "+4.2%",
    trend: "up",
    icon: "Code2",
    accent: "from-sky-500/20 to-blue-500/10",
  },
  {
    id: 4,
    title: "Today's Live Exams",
    value: "9",
    change: "-1.4%",
    trend: "down",
    icon: "PlayCircle",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    id: 5,
    title: "Pending Evaluations",
    value: "47",
    change: "+3.8%",
    trend: "up",
    icon: "Clock3",
    accent: "from-rose-500/20 to-pink-500/10",
  },
  {
    id: 6,
    title: "AI Alerts",
    value: "14",
    change: "+6.9%",
    trend: "up",
    icon: "ShieldAlert",
    accent: "from-indigo-500/20 to-cyan-500/10",
  },
];

export const createTestFields = [
  { label: "Test Title", type: "text", placeholder: "AI Interview Sprint" },
  { label: "Subject", type: "text", placeholder: "Data Structures" },
  { label: "Duration", type: "text", placeholder: "90 mins" },
  { label: "Total Marks", type: "text", placeholder: "100" },
  { label: "Start Time", type: "text", placeholder: "09:30 AM" },
  { label: "End Time", type: "text", placeholder: "11:00 AM" },
];

export const questionFormFields = [
  { label: "Problem Title", type: "text", placeholder: "Longest Subarray with Sum K" },
  { label: "Difficulty", type: "text", placeholder: "Medium" },
  { label: "Tags", type: "text", placeholder: "Arrays, Sliding Window" },
  { label: "Input Format", type: "textarea", placeholder: "First line contains n and k..." },
  { label: "Output Format", type: "textarea", placeholder: "Print the length of the longest subarray" },
  { label: "Constraints", type: "textarea", placeholder: "1 <= n <= 2e5" },
  { label: "Sample Input", type: "textarea", placeholder: "5 3\n1 2 1 0 1" },
  { label: "Sample Output", type: "textarea", placeholder: "3" },
  { label: "Hidden Test Cases", type: "textarea", placeholder: "Reserved for evaluator pipeline" },
];

export const monitorRows = [
  {
    name: "Anika Patel",
    roll: "CS-2048",
    exam: "DSA Sprint",
    time: "18:42",
    question: "Q12/24",
    progress: 54,
    status: "Active",
    integrity: 94,
  },
  {
    name: "Rahul Singh",
    roll: "CS-2021",
    exam: "Midterm Coding",
    time: "12:10",
    question: "Q08/15",
    progress: 68,
    status: "Warning",
    integrity: 76,
  },
  {
    name: "Mina Lopez",
    roll: "CS-2089",
    exam: "Mock Interview",
    time: "07:20",
    question: "Q03/20",
    progress: 19,
    status: "Idle",
    integrity: 89,
  },
  {
    name: "Arjun Rao",
    roll: "CS-2147",
    exam: "AI Assessment",
    time: "16:55",
    question: "Q14/18",
    progress: 82,
    status: "Active",
    integrity: 91,
  },
];

export const cheatAlerts = [
  {
    title: "Tab Switching",
    detail: "Detected 6 tab switches in 2 mins",
    severity: "medium",
    icon: "MonitorUp",
  },
  {
    title: "Multiple Face Detection",
    detail: "Two faces detected during proctoring",
    severity: "high",
    icon: "ScanLine",
  },
  {
    title: "No Face Detected",
    detail: "Camera feed lost for 40 seconds",
    severity: "critical",
    icon: "EyeOff",
  },
  {
    title: "Mobile Phone Detected",
    detail: "Device flagged outside the camera frame",
    severity: "high",
    icon: "Smartphone",
  },
];

export const performanceSummary = {
  averageScore: "84.2%",
  highestScore: "96.8%",
  lowestScore: "61.4%",
  studentsAppeared: "1,248",
  passPercentage: "91.3%",
  averageCompletionTime: "42 mins",
};

export const performanceSeries = [
  { week: "Mon", score: 78, attendance: 88 },
  { week: "Tue", score: 82, attendance: 91 },
  { week: "Wed", score: 79, attendance: 86 },
  { week: "Thu", score: 88, attendance: 94 },
  { week: "Fri", score: 91, attendance: 97 },
  { week: "Sat", score: 86, attendance: 92 },
];

export const performanceBreakdown = [
  { name: "Passed", value: 91, color: "#34d399" },
  { name: "Pending", value: 6, color: "#f59e0b" },
  { name: "Flagged", value: 3, color: "#f43f5e" },
];

export const recentActivity = [
  { time: "09:30", title: "Test Created", detail: "AI Interview Sprint published to 12 batches" },
  { time: "10:15", title: "Student Joined", detail: "42 new learners entered the live exam room" },
  { time: "11:05", title: "Exam Submitted", detail: "3 students completed and submitted their solutions" },
  { time: "11:22", title: "Cheat Alert Generated", detail: "Multiple face detection flag raised for one candidate" },
  { time: "12:00", title: "Report Published", detail: "Performance insights shared with faculty" },
];

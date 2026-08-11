export const teacherStats = [
  {
    title: "Total Students",
    value: "1,248",
    change: "+12.4%",
    description: "Students enrolled this term",
    icon: "Users",
    accent: "from-emerald-500/25 to-emerald-400/10",
  },
  {
    title: "Live Exams",
    value: "24",
    change: "+8.1%",
    description: "Active assessments right now",
    icon: "MonitorPlay",
    accent: "from-cyan-500/25 to-cyan-400/10",
  },
  {
    title: "Pending Evaluations",
    value: "186",
    change: "-4.2%",
    description: "Submissions awaiting review",
    icon: "ClipboardList",
    accent: "from-violet-500/25 to-violet-400/10",
  },
  {
    title: "Total Coding Questions",
    value: "342",
    change: "+19.7%",
    description: "Questions in your bank",
    icon: "Code2",
    accent: "from-amber-500/25 to-amber-400/10",
  },
  {
    title: "Active AI Alerts",
    value: "17",
    change: "+3.8%",
    description: "Integrity events flagged today",
    icon: "ShieldAlert",
    accent: "from-rose-500/25 to-rose-400/10",
  },
  {
    title: "Teacher Performance Score",
    value: "94.8%",
    change: "+1.2%",
    description: "Average classroom engagement",
    icon: "Sparkles",
    accent: "from-sky-500/25 to-sky-400/10",
  },
];

export const codingQuestionsSeed = [
  {
    id: 1,
    title: "Two Sum",
    description: "Return indices of two numbers that add up to target.",
    difficulty: "Easy",
    tags: ["Array", "Hash Map"],
    constraints: "1 <= nums.length <= 10^5",
    inputFormat: "First line: n, second line: array, third line: target",
    outputFormat: "Indices of the two numbers",
    sampleInput: "4\n2 7 11 15\n9",
    sampleOutput: "0 1",
    hiddenTests: "3 hidden edge cases",
    status: "Published",
  },
  {
    id: 2,
    title: "Binary Tree Traversal",
    description: "Implement preorder, inorder, and postorder traversal.",
    difficulty: "Medium",
    tags: ["Tree", "DFS"],
    constraints: "The tree contains at most 10^4 nodes",
    inputFormat: "Root values of the binary tree",
    outputFormat: "Traversal order",
    sampleInput: "1 2 3 4 5",
    sampleOutput: "1 2 4 5 3",
    hiddenTests: "Balanced and skewed tree cases",
    status: "Draft",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    description: "Find the longest substring with unique characters.",
    difficulty: "Hard",
    tags: ["Sliding Window", "String"],
    constraints: "String length is between 0 and 10^5",
    inputFormat: "A single string",
    outputFormat: "Length of the longest substring",
    sampleInput: "abcabcbb",
    sampleOutput: "3",
    hiddenTests: "Repeated and empty input cases",
    status: "Published",
  },
];

export const monitoringStudents = [
  {
    name: "Arjun Patel",
    rollNumber: "CS-1042",
    currentExam: "Midterm Assessment",
    remainingTime: "18:32",
    currentQuestion: "Implement BFS",
    progress: 74,
    status: "Active",
    integrityScore: 92,
  },
  {
    name: "Neha Sharma",
    rollNumber: "CS-1079",
    currentExam: "Debugging Sprint",
    remainingTime: "06:14",
    currentQuestion: "Optimize Complexity",
    progress: 41,
    status: "Warning",
    integrityScore: 78,
  },
  {
    name: "Rohan Mehta",
    rollNumber: "CS-1128",
    currentExam: "Algorithms Quiz",
    remainingTime: "22:00",
    currentQuestion: "Greedy Approach",
    progress: 88,
    status: "Idle",
    integrityScore: 96,
  },
];

export const aiAlerts = [
  {
    id: 1,
    studentName: "Mina Joshi",
    time: "09:12 AM",
    severity: "High",
    title: "Tab switching detected",
  },
  {
    id: 2,
    studentName: "Karan Verma",
    time: "09:28 AM",
    severity: "Medium",
    title: "Copy paste attempt",
  },
  {
    id: 3,
    studentName: "Sia Rao",
    time: "09:41 AM",
    severity: "Critical",
    title: "Multiple face detection",
  },
];

export const performanceSeries = [
  { name: "Week 1", averageScore: 74, highestScore: 92, lowestScore: 58, students: 112 },
  { name: "Week 2", averageScore: 79, highestScore: 95, lowestScore: 61, students: 118 },
  { name: "Week 3", averageScore: 82, highestScore: 97, lowestScore: 63, students: 126 },
  { name: "Week 4", averageScore: 86, highestScore: 99, lowestScore: 67, students: 135 },
];

export const performanceBreakdown = [
  { name: "Passed", value: 78 },
  { name: "Needs Review", value: 14 },
  { name: "Retake", value: 8 },
];

export const teacherProfile = {
  fullName: "Dr. Maya Chen",
  email: "maya.chen@codeguru.io",
  phone: "+1 555 0148",
  department: "Computer Science",
  experience: "8 years",
  bio: "AI-assisted teaching specialist focused on coding excellence and live assessment workflows.",
};

export const navItems = [
  { id: "dashboard",  label: "Dashboard",    icon: "LayoutGrid"  },
  { id: "questions",  label: "Question Bank", icon: "Code2"       },
  { id: "assessments", label: "Assessments", icon: "ClipboardList" },
  { id: "monitoring", label: "Live Monitoring", icon: "MonitorPlay" },
  { id: "settings",   label: "Profile",      icon: "UserCircle"  },
];

export const exams = [
  { name: 'TNPSC', questions: 12000, tests: 80, difficulty: 'Medium', success: '92%', color: 'from-blue-500 to-indigo-600', emoji: '🏛️', desc: 'Tamil Nadu Public Service Commission', subjects: ['GK', 'Tamil', 'Aptitude', 'Polity'] },
  { name: 'UPSC', questions: 25000, tests: 120, difficulty: 'Hard', success: '88%', color: 'from-purple-500 to-pink-600', emoji: '📚', desc: 'Union Public Service Commission', subjects: ['History', 'Geography', 'Polity', 'Economy', 'Science'] },
  { name: 'SSC', questions: 18000, tests: 90, difficulty: 'Medium', success: '91%', color: 'from-green-500 to-teal-600', emoji: '📋', desc: 'Staff Selection Commission', subjects: ['Aptitude', 'Reasoning', 'English', 'GK'] },
  { name: 'Banking', questions: 15000, tests: 100, difficulty: 'Medium', success: '89%', color: 'from-yellow-500 to-orange-500', emoji: '🏦', desc: 'IBPS, SBI, RBI Exams', subjects: ['Aptitude', 'Reasoning', 'English', 'Banking GK'] },
  { name: 'RRB Railway', questions: 10000, tests: 70, difficulty: 'Easy', success: '93%', color: 'from-red-500 to-rose-600', emoji: '🚂', desc: 'Railway Recruitment Board', subjects: ['Aptitude', 'Reasoning', 'GS', 'Technical'] },
  { name: 'Police (TNUSRB)', questions: 8000, tests: 60, difficulty: 'Medium', success: '90%', color: 'from-cyan-500 to-blue-600', emoji: '🚓', desc: 'Tamil Nadu Uniformed Services', subjects: ['GK', 'Tamil', 'Aptitude', 'Reasoning'] },
  { name: 'TET', questions: 7000, tests: 50, difficulty: 'Medium', success: '87%', color: 'from-emerald-500 to-green-600', emoji: '📝', desc: 'Teacher Eligibility Test', subjects: ['Pedagogy', 'Tamil', 'Child Development', 'Maths', 'Science'] },
  { name: 'TRB', questions: 9000, tests: 55, difficulty: 'Hard', success: '85%', color: 'from-violet-500 to-purple-600', emoji: '🎓', desc: 'Teacher Recruitment Board', subjects: ['Subject Knowledge', 'Pedagogy', 'GK'] },
  { name: 'Defence', questions: 11000, tests: 65, difficulty: 'Hard', success: '86%', color: 'from-slate-500 to-gray-700', emoji: '🛡️', desc: 'NDA, CDS, AFCAT Exams', subjects: ['Maths', 'English', 'GK', 'Physics'] },
  { name: 'LIC', questions: 6000, tests: 45, difficulty: 'Medium', success: '88%', color: 'from-amber-500 to-yellow-600', emoji: '💼', desc: 'Life Insurance Corporation', subjects: ['Aptitude', 'Reasoning', 'English', 'Insurance GK'] },
  { name: 'Insurance', questions: 5000, tests: 40, difficulty: 'Easy', success: '91%', color: 'from-pink-500 to-rose-500', emoji: '📊', desc: 'NIACL, UIIC, Oriental', subjects: ['Aptitude', 'English', 'GK', 'Insurance'] },
  { name: 'State PSC', questions: 14000, tests: 75, difficulty: 'Medium', success: '89%', color: 'from-teal-500 to-cyan-600', emoji: '🏢', desc: 'State Level PSC Exams', subjects: ['GK', 'Aptitude', 'State GK', 'English'] },
];

export const subjects = [
  {
    name: 'Quantitative Aptitude', icon: '🧮', topics: 12, questions: 5000, color: 'bg-blue-50 border-blue-200',
    topicList: ['Percentage', 'Ratio & Proportion', 'Profit & Loss', 'Time & Work', 'Simple Interest', 'Compound Interest', 'Average', 'Speed & Distance', 'Probability', 'Permutation', 'Number System', 'Simplification']
  },
  {
    name: 'Logical Reasoning', icon: '🧠', topics: 11, questions: 4500, color: 'bg-purple-50 border-purple-200',
    topicList: ['Blood Relations', 'Coding-Decoding', 'Alphabet Series', 'Number Series', 'Puzzle', 'Direction Sense', 'Clock', 'Calendar', 'Seating Arrangement', 'Syllogism', 'Analogy']
  },
  {
    name: 'General Knowledge', icon: '🌍', topics: 10, questions: 6000, color: 'bg-green-50 border-green-200',
    topicList: ['Indian History', 'World History', 'Geography', 'Indian Economy', 'Indian Constitution', 'Science', 'Sports', 'Awards', 'Books & Authors', 'Current Affairs']
  },
  {
    name: 'English', icon: '📖', topics: 9, questions: 3500, color: 'bg-yellow-50 border-yellow-200',
    topicList: ['Grammar', 'Vocabulary', 'Sentence Correction', 'Synonyms', 'Antonyms', 'Idioms', 'Reading Comprehension', 'One Word Substitution', 'Error Spotting']
  },
  {
    name: 'Tamil', icon: '🌺', topics: 6, questions: 3000, color: 'bg-orange-50 border-orange-200',
    topicList: ['Tamil Grammar', 'Tamil Literature', 'Vocabulary', 'Proverbs', 'Poets', 'Tamil Nadu History']
  },
  {
    name: 'Computer Awareness', icon: '💻', topics: 7, questions: 2500, color: 'bg-cyan-50 border-cyan-200',
    topicList: ['Computer Basics', 'Internet', 'MS Office', 'Operating System', 'Networking', 'Cyber Security', 'Artificial Intelligence']
  },
  {
    name: 'Indian Polity', icon: '⚖️', topics: 8, questions: 4000, color: 'bg-red-50 border-red-200',
    topicList: ['Fundamental Rights', 'Directive Principles', 'Parliament', 'President', 'Prime Minister', 'Governor', 'Judiciary', 'Election Commission']
  },
  {
    name: 'Science', icon: '🔬', topics: 4, questions: 3500, color: 'bg-teal-50 border-teal-200',
    topicList: ['Physics', 'Chemistry', 'Biology', 'Environment']
  },
  {
    name: 'Current Affairs', icon: '📰', topics: 9, questions: 5500, color: 'bg-indigo-50 border-indigo-200',
    topicList: ['Daily Quiz', 'Weekly Quiz', 'Monthly Current Affairs', 'National News', 'International News', 'Economy', 'Science & Technology', 'Sports', 'Awards']
  },
  {
    name: 'Previous Year Papers', icon: '📂', topics: 7, questions: 8000, color: 'bg-pink-50 border-pink-200',
    topicList: ['TNPSC Papers', 'UPSC Papers', 'SSC Papers', 'Banking Papers', 'RRB Papers', 'Police Papers', 'TET Papers']
  },
];

export const mockQuestions = [
  { id: 1, question: 'Who is known as the "Father of the Indian Constitution"?', options: ['Jawaharlal Nehru', 'Mahatma Gandhi', 'B.R. Ambedkar', 'Sardar Patel'], answer: 2, explanation: 'Dr. B.R. Ambedkar was the Chairman of the Drafting Committee and is regarded as the Father of the Indian Constitution.' },
  { id: 2, question: 'Which river is called the "Ganga of the South"?', options: ['Krishna', 'Godavari', 'Kaveri', 'Tungabhadra'], answer: 2, explanation: 'The Godavari river is called the "Ganga of the South" due to its religious significance and importance.' },
  { id: 3, question: 'If 20% of a number is 60, what is 35% of the same number?', options: ['90', '100', '105', '110'], answer: 2, explanation: '20% = 60, so 100% = 300. 35% of 300 = 105.' },
  { id: 4, question: 'A train travels 360 km in 4 hours. What is its speed in km/hr?', options: ['80', '85', '90', '95'], answer: 2, explanation: 'Speed = Distance/Time = 360/4 = 90 km/hr.' },
  { id: 5, question: 'Which is the largest planet in our Solar System?', options: ['Saturn', 'Jupiter', 'Neptune', 'Uranus'], answer: 1, explanation: 'Jupiter is the largest planet in the Solar System.' },
  { id: 6, question: 'The First Battle of Panipat was fought in the year:', options: ['1526', '1556', '1761', '1192'], answer: 0, explanation: 'The First Battle of Panipat was fought in 1526 between Babur and Ibrahim Lodi.' },
  { id: 7, question: 'Which Article of the Indian Constitution abolishes untouchability?', options: ['Article 14', 'Article 15', 'Article 17', 'Article 19'], answer: 2, explanation: 'Article 17 of the Indian Constitution abolishes untouchability.' },
  { id: 8, question: 'A shopkeeper buys an item for Rs. 800 and sells it for Rs. 1000. What is the profit percentage?', options: ['20%', '25%', '15%', '30%'], answer: 1, explanation: 'Profit = 200, Profit% = (200/800) × 100 = 25%.' },
  { id: 9, question: 'The chemical formula of water is:', options: ['H2O2', 'HO', 'H2O', 'H3O'], answer: 2, explanation: 'Water has the chemical formula H2O, consisting of 2 hydrogen atoms and 1 oxygen atom.' },
  { id: 10, question: 'Who was the first Prime Minister of India?', options: ['Sardar Patel', 'Jawaharlal Nehru', 'Rajendra Prasad', 'Lal Bahadur Shastri'], answer: 1, explanation: 'Jawaharlal Nehru was the first Prime Minister of India, serving from 1947 to 1964.' },
  { id: 11, question: 'The speed of light is approximately:', options: ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'], answer: 1, explanation: 'The speed of light in vacuum is approximately 3 × 10⁸ m/s or 300,000 km/s.' },
  { id: 12, question: 'Which Mughal Emperor built the Taj Mahal?', options: ['Akbar', 'Humayun', 'Aurangzeb', 'Shah Jahan'], answer: 3, explanation: 'Shah Jahan built the Taj Mahal in memory of his wife Mumtaz Mahal.' },
  { id: 13, question: 'If A can do a work in 10 days and B can do it in 15 days, how many days will they take together?', options: ['5 days', '6 days', '7 days', '8 days'], answer: 1, explanation: '1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6. So together they take 6 days.' },
  { id: 14, question: 'The Headquarters of RBI is located in:', options: ['New Delhi', 'Kolkata', 'Mumbai', 'Chennai'], answer: 2, explanation: 'The Reserve Bank of India\'s headquarters is located in Mumbai, Maharashtra.' },
  { id: 15, question: 'World Environment Day is celebrated on:', options: ['April 22', 'June 5', 'March 22', 'September 16'], answer: 1, explanation: 'World Environment Day is celebrated every year on June 5.' },
  { id: 16, question: 'In a class of 40 students, 25% play cricket. How many students play cricket?', options: ['8', '10', '12', '15'], answer: 1, explanation: '25% of 40 = (25/100) × 40 = 10 students.' },
  { id: 17, question: 'Which planet is known as the "Red Planet"?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], answer: 2, explanation: 'Mars is known as the Red Planet due to iron oxide on its surface.' },
  { id: 18, question: 'The process by which plants make food is called:', options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Osmosis'], answer: 2, explanation: 'Photosynthesis is the process where plants convert sunlight, CO2, and water into glucose and oxygen.' },
  { id: 19, question: 'Who is the current Governor of Tamil Nadu? (as of 2025)', options: ['R.N. Ravi', 'Banwarilal Purohit', 'C.V. Ananda Bose', 'R.N. Ravi'], answer: 1, explanation: 'Banwarilal Purohit serves as the Governor of Tamil Nadu.' },
  { id: 20, question: 'Find the odd one out: 2, 3, 5, 7, 11, 12, 13', options: ['3', '7', '12', '13'], answer: 2, explanation: '12 is the only composite number in the list. All others are prime numbers.' },
];

export const leaderboardData = [
  { rank: 1, name: 'Arunachalam K.', state: 'Tamil Nadu', score: '98.5%', exam: 'TNPSC', streak: 45, medal: '🥇', tests: 124 },
  { rank: 2, name: 'Priya Sharma', state: 'Delhi', score: '97.2%', exam: 'UPSC', streak: 38, medal: '🥈', tests: 98 },
  { rank: 3, name: 'Ravi Kumar', state: 'Karnataka', score: '96.8%', exam: 'SSC CGL', streak: 31, medal: '🥉', tests: 87 },
  { rank: 4, name: 'Meena Devi', state: 'Tamil Nadu', score: '95.5%', exam: 'TNPSC', streak: 28, medal: '4️⃣', tests: 75 },
  { rank: 5, name: 'Suresh Babu', state: 'Andhra Pradesh', score: '94.9%', exam: 'Banking', streak: 25, medal: '5️⃣', tests: 68 },
  { rank: 6, name: 'Kavitha R.', state: 'Tamil Nadu', score: '94.3%', exam: 'TET', streak: 22, medal: '6️⃣', tests: 62 },
  { rank: 7, name: 'Mohan Raj', state: 'Kerala', score: '93.8%', exam: 'UPSC', streak: 19, medal: '7️⃣', tests: 54 },
  { rank: 8, name: 'Divya Priya', state: 'Tamil Nadu', score: '93.1%', exam: 'TNPSC', streak: 17, medal: '8️⃣', tests: 48 },
  { rank: 9, name: 'Karthik S.', state: 'Telangana', score: '92.7%', exam: 'SSC', streak: 15, medal: '9️⃣', tests: 43 },
  { rank: 10, name: 'Anitha M.', state: 'Tamil Nadu', score: '92.1%', exam: 'Police', streak: 13, medal: '🔟', tests: 38 },
];

export const weeklyProgress = [
  { day: 'Mon', questions: 45, score: 72 },
  { day: 'Tue', questions: 60, score: 78 },
  { day: 'Wed', questions: 38, score: 68 },
  { day: 'Thu', questions: 72, score: 85 },
  { day: 'Fri', questions: 55, score: 80 },
  { day: 'Sat', questions: 90, score: 88 },
  { day: 'Sun', questions: 65, score: 83 },
];
